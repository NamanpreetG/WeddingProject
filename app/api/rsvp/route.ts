import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface RSVPPayload {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests?: string;
  dietary?: string;
  message?: string;
}

function buildEmailHtml(data: RSVPPayload): string {
  const attendingLabel =
    data.attending === "yes" ? "✅ Joyfully Accepts" : "❌ Regretfully Declines";

  const guestsSection =
    data.attending === "yes"
      ? `
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3;">
          <strong style="color: #C9A84C; font-family: Georgia, serif;">Guests:</strong>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3; color: #3D3D3D;">
          ${data.guests || "1"}
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3;">
          <strong style="color: #C9A84C; font-family: Georgia, serif;">Dietary:</strong>
        </td>
        <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3; color: #3D3D3D;">
          ${data.dietary || "None specified"}
        </td>
      </tr>`
      : "";

  const messageSection = data.message
    ? `
      <tr>
        <td colspan="2" style="padding: 16px 0 0;">
          <strong style="color: #C9A84C; font-family: Georgia, serif;">Message:</strong>
          <p style="margin: 8px 0 0; color: #3D3D3D; font-style: italic; line-height: 1.6; background: #FDF6F0; padding: 12px 16px; border-left: 3px solid #E8B4B8; border-radius: 2px;">
            "${data.message}"
          </p>
        </td>
      </tr>`
    : "";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #FDF6F0; font-family: Arial, sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #FDF6F0; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background: #ffffff; border: 1px solid #E8B4B8; border-top: 4px solid #C9A84C;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FDF6F0 0%, #F5D9DB 100%); padding: 40px 40px 30px; text-align: center; border-bottom: 1px solid #E8B4B8;">
              <p style="margin: 0 0 8px; font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #C9A84C;">
                Wedding RSVP Received
              </p>
              <h1 style="margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 36px; color: #3D3D3D; font-weight: normal; line-height: 1.2;">
                Karminder <span style="color: #C9A84C;">&amp;</span> Simranjit
              </h1>
              <p style="margin: 12px 0 0; font-family: Georgia, serif; font-size: 14px; color: #3D3D3D; opacity: 0.6; letter-spacing: 1px;">
                2nd April 2027 · Punjab, India
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 36px 40px;">
              <p style="margin: 0 0 24px; font-family: Georgia, serif; font-size: 15px; color: #3D3D3D; line-height: 1.6;">
                You have received a new RSVP response for the wedding of Karminder &amp; Simranjit.
              </p>

              <!-- Guest details table -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3; width: 130px;">
                    <strong style="color: #C9A84C; font-family: Georgia, serif;">Name:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3; color: #3D3D3D;">
                    ${data.name}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3;">
                    <strong style="color: #C9A84C; font-family: Georgia, serif;">Email:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3; color: #3D3D3D;">
                    <a href="mailto:${data.email}" style="color: #C9A84C; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3;">
                    <strong style="color: #C9A84C; font-family: Georgia, serif;">Attending:</strong>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0e6d3; color: #3D3D3D; font-weight: bold;">
                    ${attendingLabel}
                  </td>
                </tr>
                ${guestsSection}
                ${messageSection}
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #FDF6F0; padding: 24px 40px; text-align: center; border-top: 1px solid #E8B4B8;">
              <p style="margin: 0; font-family: Georgia, serif; font-size: 12px; color: #3D3D3D; opacity: 0.5;">
                ✦ &nbsp; Karminder &amp; Simranjit Wedding · 2nd April 2027 &nbsp; ✦
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export async function POST(request: NextRequest) {
  try {
    const body: RSVPPayload = await request.json();

    if (!body.name?.trim() || !body.email?.trim() || !body.attending) {
      return NextResponse.json(
        { error: "Name, email, and attendance are required." },
        { status: 400 }
      );
    }

    const toEmail = process.env.TO_EMAIL || "naman26g@gmail.com";

    await resend.emails.send({
      from: "Wedding RSVP <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: body.email,
      subject: `RSVP: ${body.name} — ${body.attending === "yes" ? "Attending ✅" : "Not Attending ❌"}`,
      html: buildEmailHtml(body),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("RSVP email error:", error);
    return NextResponse.json(
      { error: "Failed to send RSVP. Please try again." },
      { status: 500 }
    );
  }
}
