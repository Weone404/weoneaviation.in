import { MongoClient } from 'mongodb';
import { sendWelcomeEmail } from '../../utils/emailService';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, pdfTitle, source } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('weoneaviation');
    const collection = db.collection('pdf_leads');

    // Insert lead magnet download record
    await collection.insertOne({
      name,
      email,
      pdfTitle,
      source,
      downloadedAt: new Date(),
      ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      emailSequenceStarted: false,
    });

    client.close();

    // Send welcome email asynchronously (don't wait for it)
    sendWelcomeEmail(email, name, pdfTitle || 'We One Aviation Guide').catch((err) => {
      console.error('Failed to send welcome email:', err);
    });

    return res.status(200).json({ 
      success: true, 
      message: 'Lead saved successfully. Welcome email sent!' 
    });
  } catch (error) {
    console.error('MongoDB error:', error);
    return res.status(500).json({ 
      error: 'Failed to save lead. Please try again.' 
    });
  }
}
