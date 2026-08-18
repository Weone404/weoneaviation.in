/**
 * API endpoint for Vercel Cron Jobs
 * Runs hourly to send scheduled emails
 * 
 * Add to vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/cron/send-emails",
 *     "schedule": "0 * * * *"
 *   }]
 * }
 * 
 * Or set up with cron-job.org for free:
 * POST https://weoneaviation.in/api/cron/send-emails every hour
 */

import { MongoClient } from 'mongodb';
import { sendEmail } from '../../../utils/emailService';
import { emailTemplates } from '../../../utils/emailTemplates';

export default async function handler(req, res) {
  // Verify cron secret token (for security)
  const cronSecret = req.headers['authorization'];
  if (cronSecret !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  console.log(`[${new Date().toISOString()}] Cron job started: Send scheduled emails`);

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('weoneaviation');
    const scheduledEmailsCollection = db.collection('scheduled_emails');
    const leadsCollection = db.collection('pdf_leads');

    const now = new Date();
    let emailsSent = 0;
    let emailsFailed = 0;

    // ===== STEP 1: Send due emails =====
    const dueEmails = await scheduledEmailsCollection
      .find({
        scheduledFor: { $lte: now },
        sent: false,
      })
      .toArray();

    console.log(`Found ${dueEmails.length} emails to send`);

    for (const scheduledEmail of dueEmails) {
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
          emailsSent++;
          console.log(`✓ Sent to ${scheduledEmail.leadEmail}`);
        } else {
          emailsFailed++;
          console.error(`✗ Failed to ${scheduledEmail.leadEmail}`);
        }
      } catch (error) {
        emailsFailed++;
        console.error(`Error processing email:`, error.message);
      }
    }

    // ===== STEP 2: Schedule emails for new leads =====
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newLeads = await leadsCollection
      .find({
        emailSequenceStarted: false,
        downloadedAt: { $gte: today },
      })
      .toArray();

    console.log(`Found ${newLeads.length} new leads to schedule`);

    const emailSequence = [
      { day: 0, templateName: 'welcome' },
      { day: 2, templateName: 'dayTwoFollowUp' },
      { day: 3, templateName: 'dayThreeFollowUp' },
      { day: 5, templateName: 'dayFiveFollowUp' },
      { day: 7, templateName: 'daySevenFollowUp' },
    ];

    for (const lead of newLeads) {
      try {
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

        await leadsCollection.updateOne(
          { _id: lead._id },
          { $set: { emailSequenceStarted: true } }
        );

        console.log(`✓ Scheduled 5-email sequence for ${lead.email}`);
      } catch (error) {
        console.error(`Error scheduling for ${lead.email}:`, error.message);
      }
    }

    client.close();

    return res.status(200).json({
      success: true,
      message: 'Email scheduler completed',
      stats: {
        emailsSent,
        emailsFailed,
        newLeadsScheduled: newLeads.length,
        nextRun: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      },
    });
  } catch (error) {
    console.error('Cron job error:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
