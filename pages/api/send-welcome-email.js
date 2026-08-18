import { sendWelcomeEmail } from '../../utils/emailService';

/**
 * API endpoint to send welcome email to a new lead
 * POST /api/send-welcome-email
 * 
 * Body:
 * {
 *   email: "user@example.com",
 *   name: "John Doe",
 *   pdfTitle: "DGCA Exam Checklist"
 * }
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, name, pdfTitle } = req.body;

    // Validate input
    if (!email || !name) {
      return res.status(400).json({
        error: 'Missing required fields: email, name',
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format',
      });
    }

    // Send welcome email
    const result = await sendWelcomeEmail(email, name, pdfTitle || 'WeOne Aviation Guide');

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Welcome email sent successfully',
        messageId: result.messageId,
      });
    } else {
      return res.status(500).json({
        success: false,
        error: result.error,
        message: 'Failed to send welcome email',
      });
    }
  } catch (error) {
    console.error('Error in send-welcome-email endpoint:', error);
    return res.status(500).json({
      success: false,
      error: error.message,
      message: 'Internal server error',
    });
  }
}
