# Email Automation Setup Guide

## ✅ What's Implemented

1. **Email Templates** (5 emails)
   - Welcome email (immediately on lead capture)
   - Day 2: DGCA Exam Preparation Guide
   - Day 3: Cost Breakdown & Payment Options
   - Day 5: Real Pilot Success Stories
   - Day 7: Final Call-to-Action (Schedule Counselling)

2. **Email Service** (`utils/emailService.js`)
   - Gmail SMTP configuration via Nodemailer
   - `sendEmail()` - Core email sending function
   - `sendWelcomeEmail()` - Welcome email trigger
   - `scheduleFollowUpEmail()` - Email scheduling

3. **API Endpoints**
   - `/api/send-welcome-email` - Manual welcome email trigger
   - `/api/save-lead-magnet` - UPDATED to auto-send welcome email
   - `/api/cron/send-emails` - Automated scheduler (hourly)

4. **Email Sequence Scheduler**
   - `scripts/emailScheduler.js` - Node.js script
   - `pages/api/cron/send-emails.js` - Vercel Cron endpoint

---

## 🔧 Setup Instructions

### Step 1: Get Gmail App Password

We One Aviation uses Gmail SMTP for sending emails. Follow these steps:

1. Go to **myaccount.google.com** (logged in as info.weoneaviation@gmail.com)
2. Click **Security** in the left menu
3. Enable **2-Step Verification** (if not already enabled)
4. Go back to Security → **App passwords**
5. Select **Mail** and **Windows Computer** (or your device)
6. Generate a 16-character password
7. Copy this password

### Step 2: Add Environment Variables

Create/update `.env.local` file in project root:

```bash
# Email Configuration
GMAIL_USER=info.weoneaviation@gmail.com
GMAIL_PASSWORD=your-16-character-app-password-here

# Cron Job Security (generate a random token)
CRON_SECRET=your-super-secret-cron-token-12345

# MongoDB (already configured)
MONGODB_URI=your-mongodb-connection-string
```

### Step 3: Install Nodemailer (if not installed)

```bash
npm install nodemailer
```

### Step 4: Set Up Email Scheduler

Choose ONE of these options:

#### Option A: Vercel Cron (Recommended - if hosted on Vercel)

1. Create/update `vercel.json` in project root:

```json
{
  "crons": [{
    "path": "/api/cron/send-emails",
    "schedule": "0 * * * *"
  }]
}
```

2. Deploy to Vercel
3. Emails will auto-send hourly

#### Option B: Cron-Job.org (Free, works with any host)

1. Go to https://cron-job.org/en/
2. Create free account
3. Click **Create Cronjob**
4. Set URL: `https://weoneaviation.in/api/cron/send-emails`
5. Set method: `POST`
6. Set execution: **Hourly** (0 * * * *)
7. Add header:
   - **Key:** `Authorization`
   - **Value:** `Bearer your-super-secret-cron-token-12345`
8. Save

#### Option C: Linux/Mac Cron Job

1. Edit crontab: `crontab -e`
2. Add this line:
```bash
0 * * * * cd /path/to/weoneaviation.in && MONGODB_URI=... GMAIL_USER=... GMAIL_PASSWORD=... node scripts/emailScheduler.js >> /var/log/email-scheduler.log 2>&1
```

#### Option D: Windows Task Scheduler

1. Open **Task Scheduler**
2. Create **Basic Task**
3. Name: "We One Email Scheduler"
4. Trigger: **Hourly**
5. Action: **Start a program**
   - Program: `C:\Program Files\nodejs\node.exe`
   - Arguments: `scripts/emailScheduler.js`
   - Start in: `D:\weoneaviation.in`
6. Set environment variables before running

---

## 📊 Email Sequence Timeline

When a lead downloads a PDF:

| Time | Email | Purpose |
|------|-------|---------|
| **Immediately** | Welcome Email | Thank you + 7-day sequence intro |
| **+2 days** | DGCA Exam Prep | Study guide + timeline |
| **+3 days** | Cost Breakdown | Honest pricing + payment options |
| **+5 days** | Success Stories | Real pilot outcomes |
| **+7 days** | Final CTA | Book counselling call |

---

## 🗄️ MongoDB Collections Required

The email system uses these collections:

### 1. `pdf_leads` (already exists)
```javascript
{
  _id: ObjectId,
  name: "John Doe",
  email: "john@example.com",
  pdfTitle: "DGCA Exam Checklist",
  source: "/lead-magnets/dgca-exam-checklist",
  downloadedAt: Date,
  ipAddress: "192.168.1.1",
  emailSequenceStarted: false  // NEW field
}
```

### 2. `scheduled_emails` (create new)
```javascript
{
  _id: ObjectId,
  leadEmail: "john@example.com",
  leadName: "John Doe",
  templateName: "welcome",
  scheduledFor: Date,
  sent: false,
  sentAt: null,
  messageId: null,
  createdAt: Date
}
```

**Create the collection:**
```bash
# Via MongoDB Compass:
# 1. Connect to your database
# 2. Right-click database → Create Collection
# 3. Name it: scheduled_emails
# 4. Click Create
```

---

## 📧 Testing the Email System

### Test 1: Send Welcome Email Manually
```bash
curl -X POST http://localhost:3000/api/send-welcome-email \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-test-email@gmail.com",
    "name": "Test User",
    "pdfTitle": "Test PDF"
  }'
```

### Test 2: Trigger Lead Capture + Email
1. Go to: `https://weoneaviation.in/lead-magnets/dgca-exam-checklist`
2. Fill form with test email
3. Submit
4. Check inbox in 2-3 minutes (welcome email should arrive)

### Test 3: Run Email Scheduler (manual)
```bash
node scripts/emailScheduler.js
```

### Test 4: Test Cron Endpoint
```bash
curl -X POST https://weoneaviation.in/api/cron/send-emails \
  -H "Authorization: Bearer your-cron-secret"
```

---

## 📊 Monitoring & Debugging

### Check Sent Emails
```bash
# MongoDB query to see all sent emails
db.scheduled_emails.find({ sent: true }).pretty()

# Count emails sent today
db.scheduled_emails.find({ 
  sentAt: { $gte: new Date(Date.now() - 24*60*60*1000) }
}).count()
```

### Monitor Email Failures
```bash
# Find emails that failed
db.scheduled_emails.find({ sent: false }).pretty()

# Check email logs (if using cron-job.org)
# Visit cron-job.org dashboard → View execution history
```

### Enable Debug Logging
Add to environment:
```bash
DEBUG=nodemailer:*
```

---

## 💡 Expected Results

### After Setup (First Week)
- ✅ Test email delivery confirmed
- ✅ Scheduler running hourly
- ✅ Welcome emails sending automatically
- ✅ Leads stored in MongoDB

### After 2 Weeks
- ✅ First welcome emails sent
- ✅ Day 2 follow-ups being sent
- ✅ Monitor open/engagement rates

### Expected Metrics (Per 100 Leads)
- Welcome email: 50-70% open rate
- Day 2 follow-up: 30-40% open rate
- Day 3 cost info: 25-35% open rate
- Day 5 stories: 20-30% open rate
- Day 7 CTA: 15-25% open rate + 5-10% conversions

---

## 🚀 Next Steps (Optional Enhancements)

1. **Email Tracking**
   - Use SendGrid/Mailgun for open/click tracking
   - Track conversion from email → signup

2. **Dynamic Segments**
   - Send different emails based on which PDF they downloaded
   - Personalize follow-ups by source

3. **Lead Scoring**
   - Score leads by email engagement
   - Prioritize hot leads for sales team

4. **SMS Notifications**
   - Send SMS reminder: "Check your email for exclusive guide"
   - SMS follow-up: "Ready to become a pilot?"

5. **Zapier/Make Integration**
   - Auto-add leads to CRM
   - Create calendar events for counselling calls
   - Send Slack notification when hot lead appears

---

## ❌ Troubleshooting

| Issue | Solution |
|-------|----------|
| Emails not sending | Check GMAIL_PASSWORD is 16 chars, not your regular password |
| "Unauthorized" errors | Verify CRON_SECRET matches in .env and API call |
| Scheduler not running | Verify cron-job.org or Vercel cron is configured |
| Emails in spam | Add SPF/DKIM records to domain (Gmail setup guide) |
| MongoDB connection error | Check MONGODB_URI in .env.local |

---

## 📞 Support

For issues:
1. Check MongoDB collections exist
2. Verify environment variables set
3. Review email service logs: `console.log()` statements
4. Test manually with curl before setting up cron

---

## ✅ Verification Checklist

- [ ] Gmail app password generated and added to .env
- [ ] Nodemailer installed (`npm install nodemailer`)
- [ ] `scheduled_emails` collection created in MongoDB
- [ ] One of 4 scheduler options configured (Vercel/Cron-Job/Linux/Windows)
- [ ] Test email sent successfully
- [ ] CRON_SECRET set in .env and cron configuration
- [ ] Build verified (`npm run build`)
- [ ] API endpoints tested with curl
- [ ] First lead tested through form

---

## 🎯 What This Achieves

✅ **Automated lead nurturing** - 5 emails over 7 days  
✅ **Personalization** - Greets by name, addresses their needs  
✅ **Reduced bounce rate** - Keeps leads engaged with follow-ups  
✅ **Higher conversion** - End email has clear CTA  
✅ **Scalable** - Works for 1 or 1,000 leads  
✅ **Cost-effective** - Uses free Gmail SMTP  

**Expected Result:** 5-10% of leads convert to paid training (from 50+ leads/month = 2-5 new students/month)

---

Generated: 2026-08-18
