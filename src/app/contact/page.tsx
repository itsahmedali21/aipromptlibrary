import type { Metadata } from "next";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Promptfolio team — support, partnerships, or general questions.",
  alternates: { canonical: "/contact" },
};

const info = [
  { icon: Mail, label: "Email", value: "hello@promptfolio.example" },
  { icon: MessageSquare, label: "Support", value: "Usually replies within a day" },
  { icon: Clock, label: "Hours", value: "Mon–Fri, 9am–6pm ET" },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-[1100px] px-5 pb-24 pt-14 sm:px-8 sm:pt-20">
      <SectionHeading
        eyebrow="Get in touch"
        title="We'd like to hear from you"
        description="A partnership idea, a prompt suggestion, or just feedback on the library — send it our way."
        className="mb-14"
      />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[320px_1fr]">
        <div className="flex flex-col gap-5">
          {info.map((i) => (
            <div key={i.label} className="flex items-start gap-3 rounded-[var(--radius-lg)] border border-border bg-surface p-5">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-2 text-accent">
                <i.icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.08em] text-text-tertiary">{i.label}</p>
                <p className="mt-1 text-sm text-text-primary">{i.value}</p>
              </div>
            </div>
          ))}
        </div>
        <ContactForm />
      </div>
    </div>
  );
}
