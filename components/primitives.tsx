import { cn } from "cn";
import type { ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";

const BUTTON_VARIANT_MAP = {
  ghost: "outline",
  primary: "default",
} as const;

export type ButtonVariantName = keyof typeof BUTTON_VARIANT_MAP;

/** Zero-JS anchor/button styling derived from the shadcn button variants. */
export const buttonClass = (variant: ButtonVariantName): string =>
  cn(buttonVariants({ size: "lg", variant: BUTTON_VARIANT_MAP[variant] }));

export const Kicker = ({
  children,
  index,
}: {
  children: ReactNode;
  index?: string;
}) => (
  <p className="text-gold-400 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase">
    <span aria-hidden="true" className="bg-gold-500 h-px w-6" />
    {index ? (
      <span className="text-gold-400 font-mono text-[13px] tracking-[0.05em]">
        {index}
      </span>
    ) : null}
    <span>{children}</span>
  </p>
);

interface SectionHeadingProps {
  id: string;
  kicker: string;
  title: string;
  lead?: string;
}

export const SectionHeading = ({
  id,
  kicker,
  title,
  lead,
}: SectionHeadingProps) => (
  <div className="mb-12 md:mb-16">
    <Kicker>{kicker}</Kicker>
    <h2
      id={id}
      className="font-display text-bone mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.12] tracking-[-0.015em]"
    >
      {title}
    </h2>
    {lead ? (
      <p className="text-ash mt-6 max-w-2xl text-lg leading-relaxed">{lead}</p>
    ) : null}
  </div>
);
