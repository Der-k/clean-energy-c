import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().optional().or(z.literal("")),
  subject: z.string().trim().min(1, "Subject is required."),
  enquiryType: z.enum([
    "general",
    "speaker",
    "partnership",
    "media",
    "delegate",
    "venue",
  ]),
  message: z.string().trim().min(1, "Message is required."),
});

const enquiryLabels = {
  general: "General Enquiry",
  speaker: "Speaker Enquiry",
  partnership: "Sponsorship / Partnership",
  media: "Media / Press",
  delegate: "Delegate / Exhibition",
  venue: "Venue / Logistics",
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          message: "Validation failed.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = parsed.data;

    const to = process.env.PROGRAMME_FORM_TO;
    const from = process.env.PROGRAMME_FORM_FROM;

    if (!process.env.RESEND_API_KEY || !to || !from) {
      return NextResponse.json(
        {
          ok: false,
          message: "Server environment variables are missing.",
        },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: data.email,
      subject: `New Contact Enquiry - ${data.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">New Contact Enquiry</h2>
          <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td><strong>Full Name:</strong></td>
              <td>${escapeHtml(data.fullName)}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${escapeHtml(data.email)}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td>${escapeHtml(data.phone || "Not provided")}</td>
            </tr>
            <tr>
              <td><strong>Subject:</strong></td>
              <td>${escapeHtml(data.subject)}</td>
            </tr>
            <tr>
              <td><strong>Enquiry Type:</strong></td>
              <td>${escapeHtml(enquiryLabels[data.enquiryType])}</td>
            </tr>
            <tr>
              <td><strong>Message:</strong></td>
              <td>${escapeHtml(data.message)}</td>
            </tr>
          </table>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          ok: false,
          message: "Failed to send contact enquiry email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Contact enquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Contact enquiry route error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong while submitting the form.",
      },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}