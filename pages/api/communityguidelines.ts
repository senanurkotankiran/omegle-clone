import connectToDatabase from '@/lib/mongoose';
import CommunityGuidelines from '@/models/CommunityGuidelines';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { description,text,author } = req.body;
    try {
      const communityGuidelines = await CommunityGuidelines.create({ description,text,author });

      res.status(201).json(communityGuidelines);

    } catch (error) {
      res.status(500).json({ error: 'Community Guidelines eklenemedi' });
    }
  } else if (req.method === 'GET') {
    try {
      const communityGuidelines = await CommunityGuidelines.find({});
      res.status(200).json(communityGuidelines);
    } catch (error) {
      res.status(500).json({ error: 'Community Guidelines alınamadı' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST ve GET istekleri kabul edilir' });
  }
}
