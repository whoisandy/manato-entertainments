import { cn } from "cn";

import { buttonVariants } from "@/components/ui/button";

const BUTTON_VARIANT_MAP = {
  ghost: "outline",
  primary: "default",
} as const;

export type ButtonVariantName = keyof typeof BUTTON_VARIANT_MAP;

/** Zero-JS anchor/button styling derived from the shadcn button variants. */
export const buttonClass = (variant: ButtonVariantName): string =>
  cn(
    buttonVariants({ size: "lg", variant: BUTTON_VARIANT_MAP[variant] }),
    variant === "primary" && "btn-shine"
  );
