/**
 * Contact Form API
 *
 * Sends incoming contact-form messages to the site owner's inbox via
 * Web3Forms (https://web3forms.com) — a free service that emails form
 * submissions straight to whatever address the access key was created for.
 * No SMTP credentials, no 2FA setup.
 *
 * Requires one env var:
 *   WEB3FORMS_ACCESS_KEY — get one instantly at https://web3forms.com
 *   (enter your email, they send you a free access key, no signup/2FA)
 *
 * Without it set, the route returns 503 so the frontend can fall back
 * to a "email service not configured" message instead of silently failing.
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

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
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

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Portfolio Contact] ${subject}`,
        from_name: name,
        email,
        replyto: email,
        to: siteConfig.email,
        message: `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`,
      }),
    });

    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.success) {
      console.error("[/api/contact] Web3Forms rejected submission:", data);
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact]", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
