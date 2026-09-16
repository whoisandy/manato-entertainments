import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
  pixelBasedPreset,
  render,
} from "react-email";

/**
 * Notification email for contact-form enquiries (DESIGN.md §5, FormField →
 * Notification email). Rendered to inline-styled table HTML by the
 * `renderEnquiryNotification()` helper at send time — email clients strip
 * <style> blocks, so the <Tailwind> wrapper compiles classes to
 * per-element styles, which is why the palette lives in a JS config here
 * instead of @theme tokens.
 *
 * Design (2026-09-16, stakeholder request): ultra-minimal LIGHT template —
 * whites and greys only (no navy, no gold), everything left-aligned.
 * Georgia/Arial stand in for Fraunces/Geist: web fonts are unreliable in
 * email clients.
 */
const config = {
  presets: [pixelBasedPreset],
  theme: {
    extend: {
      colors: {
        faint: "#9A9A9A",
        hairline: "#E5E5E5",
        ink: "#141414",
        muted: "#5F5F5F",
      },
      fontFamily: {
        sans: ["Arial", "Helvetica", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"],
      },
    },
  },
};

export interface EnquiryNotificationProps {
  email: string;
  message: string;
  name: string;
  receivedAt: string;
}

/** Field row — faint overline label, then the value as a sibling. The
 *  value must NOT sit inside the label's <p>: Text renders <p>, and a
 *  block (<Section>) inside it is invalid email HTML — parsers auto-close
 *  the <p>, which the preview's HTML parser reports as an unexpected
 *  </p> (and Outlook may misrender). Value styling lives at each call site. */
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <Section className="mt-7">
    <Text className="text-faint m-0 text-[11px] tracking-[0.18em] uppercase">
      {label}
    </Text>
    {children}
  </Section>
);

export const EnquiryNotification = ({
  email,
  message,
  name,
  receivedAt,
}: EnquiryNotificationProps) => {
  /** Inbox preview text (after the subject) — a message excerpt reads
   *  better than repeating the subject's "New enquiry". */
  const preview = message.split("\n").join(" ").slice(0, 110).trimEnd();

  return (
    <Html lang="en">
      <Preview>{preview}…</Preview>
      <Tailwind config={config}>
        {/* Head lives INSIDE <Tailwind>: variant classes that cannot be
          inlined are compiled into a <style> block here. */}
        <Head>
          <meta name="color-scheme" content="light" />
          <meta name="supported-color-schemes" content="light" />
        </Head>
        <Body className="m-0 bg-white p-0 font-sans">
          <Container className="mx-auto max-w-150 px-6 py-10">
            <Heading
              as="h2"
              className="text-ink m-0 font-serif text-[24px] leading-tight font-normal"
            >
              New enquiry
            </Heading>
            <Text className="text-faint m-0 mt-2 text-[12px] tracking-[0.08em]">
              Received {receivedAt}
            </Text>

            <Hr className="border-hairline mt-8 border border-solid" />

            <div className="mt-8">
              <Field label="From">
                <Text className="text-ink m-0 mt-2 text-[15px] leading-[1.6]">
                  {name}
                </Text>
              </Field>
              <Field label="Email">
                <Text className="text-ink m-0 mt-2 text-[15px] leading-[1.6]">
                  <Link
                    className="text-ink underline underline-offset-4"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </Link>
                </Text>
              </Field>
              <Field label="Message">
                <Text className="text-ink m-0 mt-2 text-[15px] leading-[1.65] whitespace-pre-line">
                  {message}
                </Text>
              </Field>
            </div>

            <Hr className="border-hairline mt-10 border border-solid" />

            <Text className="text-faint m-0 mt-6 text-[12px] leading-[1.6]">
              Sent from the contact form on manatoentertainments.com — hit reply
              to answer {name} directly.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EnquiryNotification;

/** Sample data for the react-email preview (`bun run email`) — the preview
 *  renders the component bare, so sample content lives here. */
EnquiryNotification.PreviewProps = {
  email: "rjn143@gmail.com",
  message:
    "We are planning a corporate awards evening for around 300 guests in Hyderabad this December.\n\nCould we discuss staging, AV and a live act?",
  name: "Aarav Mehta",
  receivedAt: "16 September 2026 at 12:30 pm",
} satisfies EnquiryNotificationProps;

export interface EnquiryEmailBody {
  html: string;
  text: string;
}

/** The action stays JSX-free (.ts), so this module owns rendering: full
 *  inline-styled HTML plus a generated plain-text twin for the same send. */
export const renderEnquiryNotification = async (
  props: EnquiryNotificationProps
): Promise<EnquiryEmailBody> => ({
  html: await render(<EnquiryNotification {...props} />),
  text: await render(<EnquiryNotification {...props} />, { plainText: true }),
});
