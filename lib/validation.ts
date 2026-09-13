/**
 * Contact-enquiry validation, shared by the client form (instant, red
 * per-field messages) and the Server Action (untrusted-entry re-check).
 * Keep messages user-facing and specific — they render verbatim.
 */

export type EnquiryField = "email" | "message" | "name";

export type EnquiryFieldErrors = Partial<Record<EnquiryField, string>>;

export interface EnquiryValues {
  email: string;
  message: string;
  name: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

export const ENQUIRY_LIMITS = {
  email: 254,
  message: 2000,
  name: 80,
} as const;

export const readEnquiryValues = (formData: FormData): EnquiryValues => ({
  email: String(formData.get("email") ?? "").trim(),
  message: String(formData.get("message") ?? "").trim(),
  name: String(formData.get("name") ?? "").trim(),
});

export const validateEnquiry = (values: EnquiryValues): EnquiryFieldErrors => {
  const errors: EnquiryFieldErrors = {};

  if (values.name.length === 0) {
    errors.name = "Please enter your name.";
  } else if (values.name.length < 2) {
    errors.name = "Your name needs at least 2 characters.";
  }

  if (values.email.length === 0) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email)) {
    errors.email = "Enter a valid email address, like name@company.com.";
  }

  if (values.message.length === 0) {
    errors.message = "Please tell us about your enquiry.";
  } else if (values.message.length < 10) {
    errors.message =
      "Please add a little more detail (at least 10 characters).";
  }

  return errors;
};

export const hasErrors = (errors: EnquiryFieldErrors): boolean =>
  Object.keys(errors).length > 0;
