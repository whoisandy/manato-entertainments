"use client";

import { ArrowRightIcon } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import type { FormEvent } from "react";

import { sendContactEnquiry } from "@/app/actions/contact";
import type { ContactFormState } from "@/app/actions/contact";
import { Stagger, StaggerItem } from "@/components/reveal";
import { notify } from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { EnquiryField } from "@/lib/validation";
import {
  ENQUIRY_LIMITS,
  hasErrors,
  readEnquiryValues,
  validateEnquiry,
} from "@/lib/validation";

/**
 * Contact form (DESIGN.md §5 FormField). Validation runs client-side first
 * (noValidate suppresses the native bubbles; the red per-field messages are
 * ours) and is re-checked server-side in the action, which stays the source of
 * truth. Each completed run raises one toast — success or failure.
 */

const FIELD_CLASS =
  "h-11 border-hairline bg-panel px-4 py-3 text-base text-bone placeholder:text-dust focus-visible:border-crest-500";

const FIELD_IDS: Record<EnquiryField, string> = {
  email: "contact-email",
  message: "contact-message",
  name: "contact-name",
};

const FIELD_ORDER: EnquiryField[] = ["name", "email", "message"];

type FieldErrors = Record<EnquiryField, string | null>;

const NO_ERRORS: FieldErrors = { email: null, message: null, name: null };

const initialState: ContactFormState = {
  fieldErrors: {},
  message: "",
  status: "idle",
  token: 0,
};

const FieldErrorMessage = ({
  id,
  message,
}: {
  id: string;
  message: string;
}) => (
  <p className="text-error mt-2 text-sm" id={id}>
    {message}
  </p>
);

export const ContactForm = () => {
  const [state, formAction, pending] = useActionState(
    sendContactEnquiry,
    initialState
  );
  const [errors, setErrors] = useState<FieldErrors>(NO_ERRORS);

  // Server-side validation results become the visible field errors.
  useEffect(() => {
    if (state.token === 0) {
      return;
    }
    setErrors({ ...NO_ERRORS, ...state.fieldErrors });
  }, [state.token, state.fieldErrors]);

  // One toast per completed submission.
  useEffect(() => {
    if (state.token === 0 || state.status === "idle") {
      return;
    }
    notify({
      description: state.message,
      timeout: state.status === "success" ? 6000 : 8000,
      title: state.status === "success" ? "Enquiry sent" : "Enquiry not sent",
      type: state.status,
    });
  }, [state.status, state.message, state.token]);

  const clearError = (field: EnquiryField) => {
    setErrors((prev) => (prev[field] ? { ...prev, [field]: null } : prev));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const fieldErrors = validateEnquiry(
      readEnquiryValues(new FormData(event.currentTarget))
    );

    if (hasErrors(fieldErrors)) {
      // A prevented submit means React never dispatches the Server Action —
      // invalid input is caught here, not on the wire.
      event.preventDefault();
      setErrors({ ...NO_ERRORS, ...fieldErrors });
      const firstInvalid = FIELD_ORDER.find((field) => fieldErrors[field]);
      if (firstInvalid) {
        document
          .querySelector<HTMLInputElement>(`#${FIELD_IDS[firstInvalid]}`)
          ?.focus();
      }
      return;
    }

    setErrors(NO_ERRORS);
  };

  return (
    <form
      id="contact-form"
      action={formAction}
      noValidate
      onSubmit={handleSubmit}
    >
      <Stagger className="space-y-6">
        <StaggerItem index={0}>
          <Label htmlFor="contact-name" className="text-bone text-sm">
            Name
          </Label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            maxLength={ENQUIRY_LIMITS.name}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            onChange={() => clearError("name")}
            className={`mt-2 ${FIELD_CLASS}`}
          />
          {errors.name ? (
            <FieldErrorMessage id="contact-name-error" message={errors.name} />
          ) : null}
        </StaggerItem>
        <StaggerItem index={1}>
          <Label htmlFor="contact-email" className="text-bone text-sm">
            Email
          </Label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            maxLength={ENQUIRY_LIMITS.email}
            placeholder="Your email address"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            onChange={() => clearError("email")}
            className={`mt-2 ${FIELD_CLASS}`}
          />
          {errors.email ? (
            <FieldErrorMessage
              id="contact-email-error"
              message={errors.email}
            />
          ) : null}
        </StaggerItem>
        <StaggerItem index={2}>
          <Label htmlFor="contact-message" className="text-bone text-sm">
            Tell Us About Your Enquiry
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            maxLength={ENQUIRY_LIMITS.message}
            placeholder="Tell us about your event, partnership or collaboration. For an event, include the occasion, preferred date, city and expected number of guests."
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            onChange={() => clearError("message")}
            className="border-hairline bg-panel text-bone placeholder:text-dust focus-visible:border-crest-500 mt-2 min-h-32 resize-none px-4 py-3 text-base"
          />
          {errors.message ? (
            <FieldErrorMessage
              id="contact-message-error"
              message={errors.message}
            />
          ) : null}
        </StaggerItem>
        <StaggerItem index={3}>
          <Button type="submit" disabled={pending} className="w-full sm:w-auto">
            {pending ? "Sending…" : "Start a Conversation"}
            <ArrowRightIcon aria-hidden="true" className="size-4" />
          </Button>
        </StaggerItem>
      </Stagger>
    </form>
  );
};
