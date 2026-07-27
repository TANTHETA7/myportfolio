/**
 * Contact Form API
 *
 * Sends incoming contact-form messages to the site owner's inbox via
 * Resend (https://resend.com).
 *
 * Requires one env var:
 *   RESEND_API_KEY — from https://resend.com/api-keys (free tier is plenty
 *   for a portfolio contact form)
 *
 * Optional:
 *   RESEND_FROM_EMAIL — the "from" address. Defaults to Resend's shared
 *   sandbox sender (onboarding@resend.dev), which works out of the box and
 *   can deliver to the email address your Resend account is registered
 *   with — no domain verification needed. Once you verify your own domain
 *   in Resend, set this to an address on that domain to send from it and
 *   to any recipient.
 *
 * Without RESEND_API_KEY set, the route returns 503 so the frontend can
 * fall back to a "email service not configured" message instead of
 * silently failing.
 */

import { NextResponse } from "next/server";
import { z } from "zod";
import { siteConfig } from "@/config/site";

const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(20).max(5000),
});

const RESEND_ENDPOINT = "https://api.resend.com/emails";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid form data", issues: parsed.error.issues },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = parsed.data;
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `${siteConfig.fullName} — Portfolio <${fromEmail}>`,
        to: [siteConfig.email],
        reply_to: email,
        subject: `[Portfolio Contact] ${subject}`,
        text: `From: ${name} <${email}>\n\n${message}`,
        html: `
          <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
        `,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok) {
      console.error("[/api/contact] Resend rejected submission:", data);
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
