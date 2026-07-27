"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Github, Linkedin, MessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { GlassCard } from "@/components/common/GlassCard";
import { SectionHeader } from "@/components/common/SectionHeader";
import { MagneticButton } from "@/components/common/MagneticButton";
import { IndiaLocationMap } from "@/components/common/IndiaLocationMap";
import { siteConfig } from "@/config/site";
import { staggerContainer, fadeInLeft, fadeInRight } from "@/utils/animations";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const initialValues: ContactForm = { name: "", email: "", subject: "", message: "" };

const contactMethods = [
  {
    icon: Mail,
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: "#8b5cf6",
  },
  {
    icon: Github,
    label: "GitHub",
    value: `@${siteConfig.github.username}`,
    href: siteConfig.github.url,
    color: "#f0f0ff",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: siteConfig.linkedin.username,
    href: siteConfig.linkedin.url,
    color: "#0A66C2",
  },
];

interface BaseFieldProps {
  label: string;
  id: string;
  error?: string;
  className?: string;
}

type InputFieldProps = BaseFieldProps & { multiline?: false } & Omit<React.InputHTMLAttributes<HTMLInputElement>, "id">;
type TextareaFieldProps = BaseFieldProps & { multiline: true } & Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

function InputField(props: InputFieldProps | TextareaFieldProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { label, id, error, multiline, className: _className, ...rest } = props;

  const inputClass = cn(
    "w-full bg-white/[0.04] border rounded-xl px-4 py-3",
    "text-sm text-white/80 placeholder-white/20",
    "focus:outline-none focus:ring-1",
    "transition-all duration-200",
    "backdrop-blur-sm",
    error
      ? "border-red-500/40 focus:ring-red-500/40 focus:border-red-500/40"
      : "border-white/[0.07] focus:ring-violet-500/40 focus:border-violet-500/30",
    multiline && "resize-none min-h-[120px]"
  );

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-xs font-mono tracking-widest uppercase text-white/30">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          className={inputClass}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={inputClass}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && <p className="text-xs text-red-400/80">{error}</p>}
    </div>
  );
}

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactForm>(initialValues);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [sending, setSending] = useState(false);

  const validate = (): boolean => {
    const result = contactSchema.safeParse(values);
    if (result.success) {
      setErrors({});
      return true;
    }
    const fieldErrors: Partial<ContactForm> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof ContactForm;
      fieldErrors[field] = issue.message;
    });
    setErrors(fieldErrors);
    return false;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof ContactForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.status === 503) {
        toast.error("Email service not configured yet", {
          description: "Please email me directly at " + siteConfig.email,
        });
        return;
      }

      if (!res.ok) throw new Error("Request failed");

      toast.success("Message sent!", {
        description: "Thanks for reaching out. I'll respond within 24 hours.",
      });
      setValues(initialValues);
    } catch {
      toast.error("Failed to send message", {
        description: "Please try emailing me directly at " + siteConfig.email,
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative" aria-label="Contact">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 80%, rgba(139,92,246,0.07) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide relative z-10">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's build something "
          highlight="together"
          description="Open to research collaborations, internships, interesting projects, and just great conversations about AI."
          className="mb-12"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Left: Contact info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2 space-y-4"
          >
            <motion.div variants={fadeInLeft}>
              <p className="text-sm text-white/40 leading-relaxed mb-6">
                I&apos;m always interested in hearing about new opportunities, collaborations, or just chatting about AI and robotics. My inbox is open.
              </p>
            </motion.div>

            {contactMethods.map(({ icon: Icon, label, value, href, color }) => (
              <motion.div key={label} variants={fadeInLeft}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  onClick={
                    href.startsWith("mailto")
                      ? () => {
                          navigator.clipboard?.writeText(siteConfig.email).catch(() => {});
                          toast.success("Email copied to clipboard", { description: siteConfig.email });
                        }
                      : undefined
                  }
                >
                  <GlassCard
                    hover
                    className="p-4 flex items-center gap-3 group"
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}12`, border: `1px solid ${color}20` }}
                    >
                      <Icon className="w-4 h-4" style={{ color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono tracking-widest uppercase text-white/25">
                        {label}
                      </p>
                      <p className="text-sm text-white/60 group-hover:text-white/90 transition-colors duration-200">
                        {value}
                      </p>
                    </div>
                  </GlassCard>
                </a>
              </motion.div>
            ))}

            {/* Availability badge */}
            <motion.div variants={fadeInLeft}>
              <GlassCard className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-mono tracking-widest uppercase text-emerald-400/70">
                    Available
                  </span>
                </div>
                <p className="text-xs text-white/35">
                  Open to internship, research, and collaboration opportunities — graduating May {siteConfig.graduationYear}.
                </p>
              </GlassCard>
            </motion.div>

            {/* Location */}
            <motion.div variants={fadeInLeft}>
              <GlassCard className="p-4">
                <p className="text-[10px] font-mono tracking-widest uppercase text-white/25 mb-3 text-center">
                  My Location
                </p>
                <IndiaLocationMap />
              </GlassCard>
            </motion.div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-3"
          >
            <GlassCard variant="elevated" className="p-6 md:p-8">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-4 h-4 text-violet-400/60" />
                <span className="text-sm font-medium text-white/50">Send a message</span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Name"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <InputField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    value={values.email}
                    onChange={handleChange}
                    error={errors.email}
                    autoComplete="email"
                  />
                </div>

                <InputField
                  label="Subject"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={values.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />

                <InputField
                  label="Message"
                  id="message"
                  name="message"
                  placeholder="Tell me about your project, collaboration idea, or just say hi..."
                  value={values.message}
                  onChange={handleChange}
                  error={errors.message}
                  multiline
                />

                <MagneticButton
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={sending}
                  className="w-full"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </MagneticButton>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
