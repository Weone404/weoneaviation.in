import nodemailer from 'nodemailer';

// Create email transporter (Gmail SMTP)
// Requires environment variables: GMAIL_USER and GMAIL_PASSWORD
// To get Gmail app password:
// 1. Enable 2FA on Gmail account
// 2. Go to myaccount.google.com/apppasswords
// 3. Generate 16-character app password
// 4. Save to .env.local as GMAIL_PASSWORD

const createTransporter = () => {
  // Check if email credentials are configured
  if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
    console.warn('Email not configured. Set GMAIL_USER and GMAIL_PASSWORD environment variables.');
    return null;
  }

  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL_USER, // info.weoneaviation@gmail.com
      pass: process.env.GMAIL_PASSWORD, // 16-char app password from Google
    },
  });
};

/**
 * Send email with given options
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - Email HTML body
 * @param {string} options.text - Plain text version (optional)
 * @returns {Promise<Object>} Email sending result
 */
export const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();
    
    if (!transporter) {
      console.error('Email transporter not configured');
      return {
        success: false,
        error: 'Email service not configured',
      };
    }

    const mailOptions = {
      from: process.env.GMAIL_USER || 'info.weoneaviation@gmail.com',
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || 'Email body',
      replyTo: 'info.weoneaviation@gmail.com',
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      response: info.response,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

/**
 * Send welcome email to new lead
 * @param {string} email - Recipient email
 * @param {string} name - Recipient name
 * @param {string} pdfTitle - PDF downloaded
 * @returns {Promise<Object>} Email sending result
 */
export const sendWelcomeEmail = async (email, name, pdfTitle) => {
  const { emailTemplates } = await import('./emailTemplates');
  
  const welcomeTemplate = emailTemplates.welcome(name);
  
  return await sendEmail({
    to: email,
    subject: welcomeTemplate.subject,
    html: welcomeTemplate.html,
  });
};

/**
 * Schedule follow-up email (stores in DB for scheduler to process)
 * @param {Object} leadData - Lead information with email, name, date created
 * @param {number} dayDelay - Days to wait before sending
 * @returns {Promise<Object>} Storage result
 */
export const scheduleFollowUpEmail = async (leadData, dayDelay) => {
  try {
    const sendDate = new Date();
    sendDate.setDate(sendDate.getDate() + dayDelay);

    // Store in MongoDB for background job to pick up
    const scheduledEmail = {
      leadEmail: leadData.email,
      leadName: leadData.name,
      templateName: `day${dayDelay}FollowUp`,
      scheduledFor: sendDate,
      sent: false,
      createdAt: new Date(),
    };

    // This would be inserted into a 'scheduled_emails' collection
    // For now, this is a placeholder for the scheduler integration
    return {
      success: true,
      scheduledEmail,
      message: `Email scheduled for ${sendDate.toISOString()}`,
    };
  } catch (error) {
    console.error('Error scheduling follow-up email:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export default { sendEmail, sendWelcomeEmail, scheduleFollowUpEmail };
