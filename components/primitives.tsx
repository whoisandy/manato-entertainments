import type { ReactNode } from "react";

import { WordReveal } from "@/components/word-reveal";

export const Kicker = ({
  children,
  index,
}: {
  children: ReactNode;
  index?: string;
}) => (
  <p className="text-crest-400 flex items-center gap-3 text-[11px] font-semibold tracking-[0.22em] uppercase">
    <span aria-hidden="true" className="bg-crest-500 h-px w-6" />
    {index ? (
      <span className="text-crest-400 text-[13px] tracking-[0.05em]">
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
  /** Accent tail of the heading, set in italic crest gold (hero signature). */
  accent?: string;
  lead?: string;
  /** Skip the bottom margin when the heading lives inside a split layout. */
  compact?: boolean;
}

export const SectionHeading = ({
  id,
  kicker,
  title,
  accent,
  lead,
  compact = false,
}: SectionHeadingProps) => (
  <div className={compact ? "" : "mb-12 md:mb-16"}>
    <Kicker>{kicker}</Kicker>
    <h2
      id={id}
      className="font-display text-bone mt-4 text-[clamp(2rem,4vw,3rem)] leading-[1.12] tracking-[-0.015em]"
    >
      <WordReveal text={title} />
      {accent ? (
        <>
          {/* Spacer between the base title and the italic accent tail. */}
          <span aria-hidden="true"> </span>
          <WordReveal
            className="text-crest-300 italic"
            delayChildren={0.45}
            text={accent}
          />
        </>
      ) : null}
    </h2>
    {lead ? (
      <p className="text-ash mt-6 max-w-2xl text-lg leading-relaxed">{lead}</p>
    ) : null}
  </div>
);
