import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const exhibitorSchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required."),
  contactName: z.string().trim().min(1, "Contact name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(1, "Phone number is required."),
  country: z.string().trim().min(1, "Country is required."),
  website: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),
  sector: z.string().trim().min(1, "Sector is required."),
  editionInterest: z.string().trim().min(1, "Please select an edition."),
  boothPreference: z.string().trim().min(1, "Please select a booth preference."),
  message: z.string().trim().min(1, "Please include a short message."),
});

const editionLabels: Record<string, string> = {
  kigali: "Kigali Edition",
  perth: "Perth Edition",
  both: "Both Editions",
};

const boothLabels: Record<string, string> = {
  "small-booth": "Small Booth",
  "standard-booth": "Standard Booth",
  "premium-booth": "Premium Booth",
  "custom-space": "Custom Space",
  unsure: "Not Sure Yet",
};

const sectorLabels: Record<string, string> = {
  "renewable-energy": "Renewable Energy",
  "ev-battery": "EV / Battery Technology",
  "critical-minerals": "Critical Minerals",
  "epc-engineering": "EPC / Engineering",
  "storage-grid-hydrogen": "Storage / Smart Grid / Hydrogen",
  "esg-sustainability": "ESG / Sustainability / Climate Solutions",
  "research-startup": "Research / University / Startup",
  other: "Other",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = exhibitorSchema.safeParse(body);

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
      subject: `New Exhibitor Interest - ${data.companyName}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">New Exhibitor Interest Submission</h2>
          <table cellpadding="8" cellspacing="0" border="0" style="border-collapse: collapse;">
            <tr>
              <td><strong>Company Name:</strong></td>
              <td>${escapeHtml(data.companyName)}</td>
            </tr>
            <tr>
              <td><strong>Contact Name:</strong></td>
              <td>${escapeHtml(data.contactName)}</td>
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
              <td><strong>Country:</strong></td>
              <td>${escapeHtml(data.country)}</td>
            </tr>
            <tr>
              <td><strong>Website:</strong></td>
              <td>${escapeHtml(data.website || "Not provided")}</td>
            </tr>
            <tr>
              <td><strong>Sector:</strong></td>
              <td>${escapeHtml(sectorLabels[data.sector] || data.sector)}</td>
            </tr>
            <tr>
              <td><strong>Edition Interest:</strong></td>
              <td>${escapeHtml(
                editionLabels[data.editionInterest] || data.editionInterest
              )}</td>
            </tr>
            <tr>
              <td><strong>Booth Preference:</strong></td>
              <td>${escapeHtml(
                boothLabels[data.boothPreference] || data.boothPreference
              )}</td>
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
          message: "Failed to send exhibitor interest email.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Exhibitor interest submitted successfully.",
    });
  } catch (error) {
    console.error("Exhibitor interest route error:", error);

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