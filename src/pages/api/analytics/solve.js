import clientPromise from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId, question, category, date } = req.body;
  if (!userId || !question || !category || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const client = await clientPromise;
    const db = client.db();
    await db.collection('solved').insertOne({ userId, question, category, date });
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
} 