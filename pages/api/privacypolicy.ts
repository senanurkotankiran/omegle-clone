import connectToDatabase from '@/lib/mongoose';
import PrivacyPolicy from '@/models/PrivacyPolicy';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { description,text,author } = req.body;
    try {
      const privacypolicy = await PrivacyPolicy.create({ description,text,author });

      res.status(201).json(privacypolicy);

    } catch (error) {
      res.status(500).json({ error: 'Privacy Policy eklenemedi' });
    }
  } else if (req.method === 'GET') {
    try {
      const privacypolicys = await PrivacyPolicy.find({});
      res.status(200).json(privacypolicys);
    } catch (error) {
      res.status(500).json({ error: 'Privacy Policy alınamadı' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST ve GET istekleri kabul edilir' });
  }
}
