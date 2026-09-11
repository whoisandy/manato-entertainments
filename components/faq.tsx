"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/content";

export const Faq = () => (
  <Accordion className="border-hairline border-t" defaultValue={[0]}>
    {faqs.map((faq, index) => (
      <AccordionItem
        key={faq.question}
        value={index}
        className="border-hairline border-b"
      >
        <AccordionTrigger className="font-display text-bone py-6 text-lg leading-snug md:text-xl">
          {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-ash max-w-2xl pb-6 text-base leading-relaxed">
          {faq.answer}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);
