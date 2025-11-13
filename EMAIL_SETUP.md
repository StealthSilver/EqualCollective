# Email Functionality Setup Guide

## Overview
The contact form in the CTA section now sends emails using Resend API service.

## Setup Instructions

### 1. Get Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key (starts with `re_`)

### 2. Add Environment Variable

Add the following to your `.env.local` file:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
```

### 3. Email Configuration

**Current Setup (Testing):**
- Emails are currently sent to: `rajatsaraswat1729@gmail.com`
- From address: `onboarding@resend.dev` (Resend's test domain)

**For Production:**

To change the recipient email to `info@sgrids.io`:

1. Open `/src/app/api/send-email/route.ts`
2. Find line 19:
   ```typescript
   to: ["rajatsaraswat1729@gmail.com"],
   ```
3. Change it to:
   ```typescript
   to: ["info@sgrids.io"],
   ```

### 4. Verify Your Domain (Optional but Recommended)

For production use, you should verify your domain with Resend:

1. Go to Resend Dashboard → Domains
2. Add your domain (e.g., `sgrids.io`)
3. Add the DNS records provided by Resend
4. Once verified, update the `from` address in `/src/app/api/send-email/route.ts`:
   ```typescript
   from: "Solvyn Contact Form <noreply@sgrids.io>",
   ```

## Testing

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the contact form section
3. Fill in the form fields:
   - Name (required)
   - Email (required)
   - Company (optional)
   - Message (required)
4. Click "CONNECT NOW"
5. Check the recipient email inbox

## Email Format

The email sent includes:
- Professional HTML formatting with your brand colors (#ff7a18, #ffb74d)
- All form fields formatted clearly
- Timestamp in IST timezone
- Plain text fallback for email clients that don't support HTML

## Troubleshooting

### "Failed to send email" error
- Check that `RESEND_API_KEY` is correctly set in `.env.local`
- Verify the API key is valid in your Resend dashboard
- Check the browser console for detailed error messages
- Check the terminal/server logs for API errors

### Email not received
- Check spam/junk folder
- Verify the recipient email address in the API route
- Check Resend dashboard → Logs to see if the email was sent

### API Key Issues
- Free tier limits: 100 emails/day, 3,000 emails/month
- Upgrade plan if you need higher limits

## Features Implemented

✅ Real-time form submission with loading state
✅ Success/error feedback messages
✅ Form field validation
✅ Professional HTML email template
✅ Plain text email fallback
✅ IST timezone for timestamps
✅ Automatic form reset on success
✅ Error handling and retry capability

## Notes

- The Resend package has been installed
- API route created at `/src/app/api/send-email/route.ts`
- CTA component updated with real email functionality
- Form includes proper error handling

