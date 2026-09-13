"use client";

import type { ToastManagerAddOptions } from "@base-ui/react/toast";
import { CircleCheckIcon, OctagonXIcon } from "lucide-react";
import type { ReactNode } from "react";

import {
  Toast,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastPortal,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  createToastManager,
  useToastManager,
} from "@/components/ui/toast";

/**
 * MANATO toast layer (DESIGN.md §5 Toast): the shadcn/Base UI toast primitives
 * carry the machinery (stacking, swipe, timers, aria-live) while this wrapper
 * applies the site's surface language — sharp 0-radius panel, hairline border,
 * no shadow, and a 2px left rule that reads crest-gold on success and status
 * red on error. Mounted once in app/layout.tsx; `notify()` is callable from
 * anywhere because the manager lives outside React.
 */

export const toastManager = createToastManager();

export interface NotifyOptions {
  description?: ReactNode;
  timeout?: number;
  title: ReactNode;
  type?: "error" | "success";
}

export const notify = ({ description, timeout, title, type }: NotifyOptions) =>
  toastManager.add({
    description,
    timeout,
    title,
    type: type ?? "success",
  } satisfies ToastManagerAddOptions<object>);

const ToastIcon = ({ type }: { type: string | undefined }) => {
  if (type !== "success" && type !== "error") {
    return null;
  }

  const Icon = type === "success" ? CircleCheckIcon : OctagonXIcon;

  return (
    <span
      className={
        type === "success" ? "text-crest-400 shrink-0" : "text-error shrink-0"
      }
    >
      <Icon aria-hidden="true" className="size-4" />
    </span>
  );
};

const ToastList = () => {
  const { toasts } = useToastManager();

  return toasts.map((item) => (
    <Toast
      key={item.id}
      toast={item}
      className={[
        "rounded-none border-hairline-strong bg-panel text-bone border-l-2 shadow-none",
        "data-[type=success]:border-l-crest-400 data-[type=error]:border-l-error",
        "motion-reduce:[transition:none]",
      ].join(" ")}
    >
      <ToastContent className="gap-3 p-4">
        <ToastIcon type={item.type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle className="text-bone text-sm font-medium" />
          <ToastDescription className="text-ash text-sm leading-relaxed" />
        </div>
        <ToastClose className="text-dust hover:text-bone" />
      </ToastContent>
    </Toast>
  ));
};

export const Toaster = () => (
  <ToastProvider toastManager={toastManager}>
    <ToastPortal>
      <ToastViewport className="z-[100]">
        <ToastList />
      </ToastViewport>
    </ToastPortal>
  </ToastProvider>
);
