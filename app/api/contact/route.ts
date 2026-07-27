/**
 * Contact Form API
 *
 * Sends incoming contact-form messages straight to the site owner's Gmail
 * via Gmail's SMTP relay (Nodemailer). Requires two env vars:
 *
 *   GMAIL_USER          — the sending Gmail address (e.g. tanmaynew25@gmail.com)
 *   GMAIL_APP_PASSWORD  — a 16-character Google "App Password" (NOT the normal
 *                          account password). Generate one at:
 *                          Google Account → Security → 2-Step Verification
 *                          (must be enabled) → App Passwords → "Mail"
 *
 * Without these set, the route returns 503 so the frontend can fall back
 * to a "email service not configured" message instead of silently failing.
 */

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";
import { siteConfig } from "@/config/site";

const contactSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  subject: z.string().min(3).max(200),
  message: z.string().min(20).max(5000),
});

export async function POST(request: Request) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: gmailUser, pass: gmailAppPassword },
    });

    await transporter.sendMail({
      from: `"${siteConfig.fullName} — Portfolio" <${gmailUser}>`,
      to: siteConfig.email,
      replyTo: email,
      subject: `[Portfolio Contact] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      `,
    });

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
