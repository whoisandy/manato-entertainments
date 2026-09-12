"use client";

import { ArrowRightIcon } from "lucide-react";
import type { FormEvent } from "react";

import { Stagger, StaggerItem } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/content";

const FIELD_CLASS =
  "h-11 border-hairline bg-panel px-4 py-3 text-base text-bone placeholder:text-dust focus-visible:border-crest-500";

const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const name = String(data.get("name") ?? "");
  const email = String(data.get("email") ?? "");
  const message = String(data.get("message") ?? "");
  const subject = encodeURIComponent(`Website enquiry — MANATO Entertainments`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nEnquiry:\n${message}`
  );
  window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
};

export const ContactForm = () => (
  <form id="contact-form" onSubmit={handleSubmit}>
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
          placeholder="Your name"
          className={`mt-2 ${FIELD_CLASS}`}
        />
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
          placeholder="Your email address"
          className={`mt-2 ${FIELD_CLASS}`}
        />
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
          placeholder="Tell us about your event, partnership or collaboration. For an event, include the occasion, preferred date, city and expected number of guests."
          className="border-hairline bg-panel text-bone placeholder:text-dust focus-visible:border-crest-500 mt-2 min-h-32 resize-none px-4 py-3 text-base"
        />
      </StaggerItem>
      <StaggerItem index={3}>
        <Button type="submit" className="w-full sm:w-auto">
          Start a Conversation
          <ArrowRightIcon aria-hidden="true" className="size-4" />
        </Button>
      </StaggerItem>
    </Stagger>
    <p className="text-dust mt-4 text-sm">
      This opens your email app with your enquiry filled in. Review it and
      select Send to contact us.
    </p>
  </form>
);
