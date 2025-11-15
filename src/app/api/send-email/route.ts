import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, company, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Solvyn Contact Form <onboarding@resend.dev>", // You'll change this to your verified domain
      to: ["rajatsaraswat1729@gmail.com"], // Change to info@sgrids.io later
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body {
                font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
                line-height: 1.6;
                color: #111827;
                background-color: #f9fafb;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
              }
              .header {
                background: linear-gradient(135deg, #f97316 0%,rgb(253, 176, 82) 50%, #f97316 100%);
                background-size: 200% 200%;
                color: #ffffff;
                padding: 32px 24px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                font-weight: 600;
                letter-spacing: -0.025em;
              }
              .content {
                background: #ffffff;
                padding: 32px 24px;
              }
              .field {
                margin-bottom: 20px;
                padding: 16px;
                background: #ffffff;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                border-left: 4px solid #f97316;
                transition: all 0.3s ease;
              }
              .field-label {
                font-weight: 600;
                color: #f97316;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 8px;
                display: block;
              }
              .field-value {
                color: #111827;
                font-size: 15px;
                line-height: 1.5;
              }
              .field-value a {
                color: #f97316;
                text-decoration: none;
                font-weight: 500;
              }
              .field-value a:hover {
                color: #ea580c;
                text-decoration: underline;
              }
              .message-section {
                margin-top: 24px;
                margin-bottom: 20px;
              }
              .message-label {
                font-weight: 600;
                color: #f97316;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                margin-bottom: 12px;
                display: block;
              }
              .message-box {
                background: #ffffff;
                padding: 20px;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                border-left: 4px solid #f97316;
                white-space: pre-wrap;
                word-wrap: break-word;
                color: #374151;
                font-size: 15px;
                line-height: 1.6;
              }
              .footer {
                margin-top: 32px;
                padding-top: 24px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
                font-size: 12px;
                line-height: 1.5;
              }
              .footer p {
                margin: 4px 0;
              }
              .brand-name {
                color: #f97316;
                font-weight: 600;
              }
              @media only screen and (max-width: 600px) {
                .email-container {
                  border-radius: 0;
                }
                .content {
                  padding: 24px 16px;
                }
                .header {
                  padding: 24px 16px;
                }
                .header h1 {
                  font-size: 20px;
                }
              }
            </style>
          </head>
          <body>
            <div style="padding: 20px;">
              <div class="email-container">
                <div class="header">
                  <h1>New Contact Form Submission</h1>
                </div>
                <div class="content">
                  <div class="field">
                    <span class="field-label">Name</span>
                    <div class="field-value">${name}</div>
                  </div>
                  
                  <div class="field">
                    <span class="field-label">Email</span>
                    <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  
                  ${company ? `
                  <div class="field">
                    <span class="field-label">Company</span>
                    <div class="field-value">${company}</div>
                  </div>
                  ` : ''}
                  
                  <div class="message-section">
                    <span class="message-label">Message</span>
                    <div class="message-box">${message}</div>
                  </div>
                  
                  <div class="footer">
                    <p>This email was sent from the <span class="brand-name">Solvyn</span> contact form on your website.</p>
                    <p>Received on ${new Date().toLocaleString('en-US', { 
                      dateStyle: 'full', 
                      timeStyle: 'short',
                      timeZone: 'Asia/Kolkata'
                    })} IST</p>
                  </div>
                </div>
              </div>
            </div>
          </body>
        </html>
      `,
      // Plain text fallback
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}

Message:
${message}

---
Received on ${new Date().toLocaleString('en-US', { 
  dateStyle: 'full', 
  timeStyle: 'short',
  timeZone: 'Asia/Kolkata'
})} IST
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { 
        success: true, 
        message: "Email sent successfully",
        id: data?.id 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

