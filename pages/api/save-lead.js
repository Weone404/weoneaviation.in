import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { name, phone, email, course, message, source } = req.body;

  if (!name || !phone)
    return res.status(400).json({ error: 'Name and phone are required' });

  try {
    const client = await clientPromise;
    const db = client.db('contactDB');
    await db.collection('leads_in').insertOne({
      name: name?.trim(),
      phone: phone?.trim(),
      email: email?.trim() || '',
      course: course?.trim() || 'Not specified',
      message: message?.trim() || '',
      source: source?.trim() || 'weoneaviation_in',
      createdAt: new Date(),
    });

    return res.status(200).json({ success: true, message: 'Lead saved successfully' });
  } catch (err) {
    console.error('MongoDB error:', err);
    return res.status(500).json({ error: 'Failed to save', detail: err.message });
  }
}