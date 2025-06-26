import clientPromise from '@/utils/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }
  try {
    const client = await clientPromise;
    const db = client.db();
    const solved = await db.collection('solved').find({ userId }).sort({ date: -1 }).toArray();
    const totalSolved = solved.length;
    const perDay = {};
    const perCategory = {};
    const recent = solved.slice(0, 5).map(q => ({ title: q.question, date: q.date, category: q.category }));
    solved.forEach(q => {
      const d = new Date(q.date).toLocaleDateString();
      perDay[d] = (perDay[d] || 0) + 1;
      perCategory[q.category] = (perCategory[q.category] || 0) + 1;
    });
    res.status(200).json({ totalSolved, perDay, perCategory, recent });
  } catch (e) {
    res.status(500).json({ error: 'Database error' });
  }
} 