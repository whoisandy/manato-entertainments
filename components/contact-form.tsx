"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/content";

const FIELD_CLASS =
  "h-11 border-hairline bg-panel px-4 py-3 text-base text-bone placeholder:text-dust focus-visible:border-gold-500";

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") ?? "");
  const email = String(data.get("email") ?? "");
  const message = String(data.get("message") ?? "");
  const subject = encodeURIComponent(`[Website] Message from ${name}`);
  const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
};

export const ContactForm = () => (
  <form onSubmit={handleSubmit}>
    <div className="space-y-6">
      <div>
        <Label htmlFor="contact-name" className="text-bone text-sm">
          Name
        </Label>
        <Input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>
      <div>
        <Label htmlFor="contact-email" className="text-bone text-sm">
          Email
        </Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={`mt-2 ${FIELD_CLASS}`}
        />
      </div>
      <div>
        <Label htmlFor="contact-message" className="text-bone text-sm">
          Message
        </Label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="A private evening, a corporate night, or a question about the next edition…"
          className="border-hairline bg-panel text-bone placeholder:text-dust focus-visible:border-gold-500 mt-2 min-h-32 resize-y px-4 py-3 text-base"
        />
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        Send message
      </Button>
      <p className="text-dust text-sm">
        This opens your email app with the message prefilled — we answer within
        a day.
      </p>
    </div>
  </form>
);
