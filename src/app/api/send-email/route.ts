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
            <style>
              body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #ff7a18 0%, #ffb74d 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                background: #f9f9f9;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border-left: 4px solid #ff7a18;
              }
              .field-label {
                font-weight: bold;
                color: #ff7a18;
                font-size: 12px;
                text-transform: uppercase;
                margin-bottom: 5px;
              }
              .field-value {
                color: #333;
                font-size: 16px;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #ff7a18;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                color: #666;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📬 New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">Name</div>
                <div class="field-value">${name}</div>
              </div>
              
              <div class="field">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${email}">${email}</a></div>
              </div>
              
              ${company ? `
              <div class="field">
                <div class="field-label">Company</div>
                <div class="field-value">${company}</div>
              </div>
              ` : ''}
              
              <div class="field-label" style="margin-top: 20px; margin-bottom: 10px;">Message</div>
              <div class="message-box">
                ${message}
              </div>
              
              <div class="footer">
                <p>This email was sent from the Solvyn contact form on your website.</p>
                <p>Received on ${new Date().toLocaleString('en-US', { 
                  dateStyle: 'full', 
                  timeStyle: 'short',
                  timeZone: 'Asia/Kolkata'
                })} IST</p>
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

