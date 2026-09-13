"use server";

import { Resend } from "resend";

import { site } from "@/lib/content";
import type { EnquiryFieldErrors } from "@/lib/validation";
import {
  hasErrors,
  readEnquiryValues,
  validateEnquiry,
} from "@/lib/validation";

export interface ContactFormState {
  /** Per-field messages rendered under the inputs (client re-checks first). */
  fieldErrors: EnquiryFieldErrors;
  message: string;
  status: "error" | "idle" | "success";
  /** Changes on every completed run so the client can fire one toast per submit. */
  token: number;
}

const renderBody = (name: string, email: string, message: string) => ({
  html: `<p><strong>${name}</strong> (${email}) wrote:</p><p>${message
    .split("\n")
    .map((line) => `${line}<br/>`)
    .join("")}</p>`,
  text: `${name} (${email}) wrote:\n\n${message}`,
});

const fail = (
  message: string,
  fieldErrors: EnquiryFieldErrors = {}
): ContactFormState => ({
  fieldErrors,
  message,
  status: "error",
  token: Date.now(),
});

export const sendContactEnquiry = async (
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> => {
  const values = readEnquiryValues(formData);
  const fieldErrors = validateEnquiry(values);

  if (hasErrors(fieldErrors)) {
    return fail("Please check the highlighted fields.", fieldErrors);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return fail(
      `Email delivery isn't configured yet. Please reach us directly at ${site.email} while we finish setting it up.`
    );
  }

  const from = process.env.MAIL_FROM ?? "onboarding@resend.dev";
  const body = renderBody(values.name, values.email, values.message);

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      html: body.html,
      replyTo: values.email,
      subject: `Website enquiry — ${values.name}`,
      text: body.text,
      to: site.email,
    });

    if (error) {
      console.error("Resend rejected the enquiry:", error);
      return fail(
        `We couldn't send your enquiry just now. Please try again, or email us directly at ${site.email}.`
      );
    }

    return {
      fieldErrors: {},
      message: `Thanks — your enquiry is on its way. We'll get back to you at ${values.email} shortly.`,
      status: "success",
      token: Date.now(),
    };
  } catch (error) {
    console.error("Contact form send failed:", error);
    return fail(
      `We couldn't reach the mail service just now. Please try again, or email us directly at ${
        site.email
      }.`
    );
  }
};
