/**
 * Email Automation Scheduler
 * 
 * This script should run as a cron job every hour to send scheduled follow-up emails
 * 
 * Setup instructions:
 * 1. Add to package.json scripts: "schedule:emails": "node scripts/emailScheduler.js"
 * 2. Set up cron job to run hourly:
 *    - Linux/Mac: Add to crontab -e: "0 * * * * cd /path/to/app && npm run schedule:emails"
 *    - Windows: Use Task Scheduler to run: "npm run schedule:emails"
 * 
 * Or use a service like:
 * - AWS Lambda (runs on schedule)
 * - Vercel Cron (built-in for Next.js)
 * - Firebase Cloud Functions
 * - node-schedule (npm package)
 */

import { MongoClient } from 'mongodb';
import { sendEmail } from '../utils/emailService.js';
import { emailTemplates, emailSequence } from '../utils/emailTemplates.js';

const emailScheduler = async () => {
  console.log(`[${new Date().toISOString()}] Starting email scheduler...`);

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('weoneaviation');
    const leadsCollection = db.collection('pdf_leads');

    // Find all leads that should receive emails
    const now = new Date();

    // Get scheduled emails from collection
    const scheduledEmailsCollection = db.collection('scheduled_emails');
    
    // Find emails that are scheduled and not yet sent
    const duEmails = await scheduledEmailsCollection.findMany({
      scheduledFor: { $lte: now },
      sent: false,
    });

    console.log(`Found ${duEmails.length} emails to send`);

    for (const scheduledEmail of duEmails) {
      try {
        // Get email template
        const templateName = scheduledEmail.templateName;
        const templateFunction = emailTemplates[templateName];

        if (!templateFunction) {
          console.warn(`Template ${templateName} not found`);
          continue;
        }

        // Generate email content
        const emailContent = templateFunction(scheduledEmail.leadName);

        // Send email
        const result = await sendEmail({
          to: scheduledEmail.leadEmail,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        if (result.success) {
          // Mark as sent
          await scheduledEmailsCollection.updateOne(
            { _id: scheduledEmail._id },
            {
              $set: {
                sent: true,
                sentAt: new Date(),
                messageId: result.messageId,
              },
            }
          );
          console.log(`✓ Sent email to ${scheduledEmail.leadEmail}`);
        } else {
          console.error(`✗ Failed to send email to ${scheduledEmail.leadEmail}`);
        }
      } catch (error) {
        console.error(`Error processing scheduled email:`, error);
      }
    }

    // Schedule next emails for new leads
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find leads that don't have emails scheduled yet
    const newLeads = await leadsCollection.find({
      emailSequenceStarted: false,
      downloadedAt: { $gte: today },
    }).toArray();

    console.log(`Found ${newLeads.length} new leads to schedule`);

    for (const lead of newLeads) {
      // Schedule the email sequence for this lead
      for (const emailConfig of emailSequence) {
        const sendDate = new Date(lead.downloadedAt);
        sendDate.setDate(sendDate.getDate() + emailConfig.day);

        await scheduledEmailsCollection.insertOne({
          leadEmail: lead.email,
          leadName: lead.name,
          templateName: emailConfig.templateName,
          scheduledFor: sendDate,
          sent: false,
          createdAt: new Date(),
        });
      }

      // Mark lead as having emails scheduled
      await leadsCollection.updateOne(
        { _id: lead._id },
        { $set: { emailSequenceStarted: true } }
      );

      console.log(`✓ Scheduled 5-email sequence for ${lead.email}`);
    }

    client.close();
    console.log(`[${new Date().toISOString()}] Email scheduler completed`);
  } catch (error) {
    console.error('Email scheduler error:', error);
  }
};

// Run the scheduler
emailScheduler().catch(console.error);

export default emailScheduler;
