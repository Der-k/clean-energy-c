import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const sponsorshipSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required."),
  secondName: z.string().trim().min(1, "Second name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(1, "Phone number is required."),
  organization: z.string().trim().min(1, "Organization is required."),
  jobTitle: z.string().trim().min(1, "Job title is required."),
  interest: z.enum([
    "title",
    "platinum",
    "gold",
    "silver",
    "bronze",
    "exhibition",
    "custom",
  ]),
  eventChoice: z.enum(["kigali", "perth", "both"]),
  message: z.string().trim().min(1, "Please include a short message."),
});

const interestLabels = {
  title: "Title Sponsor",
  platinum: "Platinum Sponsor",
  gold: "Gold Sponsor",
  silver: "Silver Sponsor",
  bronze: "Bronze Sponsor",
  exhibition: "Exhibition Sponsor",
  custom: "Custom Package",
} as const;

const eventLabels = {
  kigali: "Kigali Edition",
  perth: "Perth Edition",
  both: "Both Editions",
} as const;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = sponsorshipSchema.safeParse(body);

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
      subject: `New Sponsorship Enquiry - ${data.organization}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">New Sponsorship Enquiry</h2>
          <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td><strong>First Name:</strong></td>
              <td>${escapeHtml(data.firstName)}</td>
            </tr>
            <tr>
              <td><strong>Second Name:</strong></td>
              <td>${escapeHtml(data.secondName)}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${escapeHtml(data.email)}</td>
            </tr>
            <tr>
              <td><strong>Phone:</strong></td>
              <td>${escapeHtml(data.phone)}</td>
            </tr>
            <tr>
              <td><strong>Organization:</strong></td>
              <td>${escapeHtml(data.organization)}</td>
            </tr>
            <tr>
              <td><strong>Job Title:</strong></td>
              <td>${escapeHtml(data.jobTitle)}</td>
            </tr>
            <tr>
              <td><strong>Sponsorship Interest:</strong></td>
              <td>${escapeHtml(interestLabels[data.interest])}</td>
            </tr>
            <tr>
              <td><strong>Preferred Edition:</strong></td>
              <td>${escapeHtml(eventLabels[data.eventChoice])}</td>
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
          message: "Failed to send sponsorship enquiry email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Sponsorship enquiry submitted successfully.",
    });
  } catch (error) {
    console.error("Sponsorship request route error:", error);

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