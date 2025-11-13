# Quick Guide: Change Email Recipient

## Current Configuration
- **Current recipient:** `rajatsaraswat1729@gmail.com` (for testing)
- **Target recipient:** `info@sgrids.io` (for production)

## Steps to Change

### Option 1: Quick Change (Just the email address)

1. Open `/src/app/api/send-email/route.ts`
2. Go to **line 19**
3. Change:
   ```typescript
   to: ["rajatsaraswat1729@gmail.com"],
   ```
   To:
   ```typescript
   to: ["info@sgrids.io"],
   ```
4. Save the file
5. Done! ✅

### Option 2: Production Setup (Recommended)

For a professional setup, also update the "from" address:

1. First, verify your domain at [resend.com/domains](https://resend.com/domains)
2. Open `/src/app/api/send-email/route.ts`
3. Update both the `from` and `to` fields (lines 17-19):
   ```typescript
   from: "Solvyn Contact Form <noreply@sgrids.io>", // or any email@sgrids.io
   to: ["info@sgrids.io"],
   ```
4. Save the file
5. Done! ✅

## Multiple Recipients (Optional)

To send to multiple email addresses:

```typescript
to: ["info@sgrids.io", "admin@sgrids.io", "rajatsaraswat1729@gmail.com"],
```

## That's it!

No other files need to be modified. The form will automatically start sending to the new email address.

