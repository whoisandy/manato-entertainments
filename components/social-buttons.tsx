import type { ComponentProps } from "react";

/**
 * Brand icons for the placeholder social links (Instagram, X, Facebook,
 * YouTube). Lucide ships the first three and YouTube; the X logo is inlined
 * because lucide no longer carries brand marks. Links are placeholders
 * (href="#") until the stakeholder supplies verified profile URLs.
 */
export const InstagramIcon = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect height="18" rx="5" width="18" x="3" y="3" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" fill="currentColor" r="0.9" stroke="none" />
  </svg>
);

export const XIcon = (props: ComponentProps<"svg">) => (
  <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
    <path d="M17.7 3h2.9l-6.4 7.3L21.7 21h-5.9l-4.6-6-5.3 6H3l6.9-7.8L2.6 3h6.1l4.2 5.5L17.7 3Zm-1 16.2h1.6L7.8 4.7H6L16.7 19.2Z" />
  </svg>
);

export const FacebookIcon = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const YoutubeIcon = (props: ComponentProps<"svg">) => (
  <svg
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    aria-hidden="true"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const SOCIAL_ICONS = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  X: XIcon,
  YouTube: YoutubeIcon,
} as const;

export interface SocialLink {
  label: keyof typeof SOCIAL_ICONS;
  href: string;
}

/** Placeholder links — swap hrefs once verified profile URLs arrive. */
export const socialLinks: SocialLink[] = [
  { href: "#", label: "Instagram" },
  { href: "#", label: "X" },
  { href: "#", label: "Facebook" },
  { href: "#", label: "YouTube" },
];

export const SocialButtons = () => (
  <ul className="flex gap-3">
    {socialLinks.map((social) => {
      const Icon = SOCIAL_ICONS[social.label];
      return (
        <li key={social.label}>
          <a
            aria-label={`Manato Entertainments on ${social.label}`}
            className="border-hairline text-ash hover:border-hairline-strong hover:text-bone flex h-10 w-10 items-center justify-center border transition-colors duration-200"
            href={social.href}
            rel="noopener noreferrer"
            target="_blank"
          >
            <Icon className="size-5" />
          </a>
        </li>
      );
    })}
  </ul>
);
