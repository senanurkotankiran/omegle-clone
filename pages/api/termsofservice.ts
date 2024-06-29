import connectToDatabase from '@/lib/mongoose';
import TermsOfService from '@/models/TermsOfService';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { description,text,author } = req.body;
    try {
      const termsOfService = await TermsOfService.create({ description,text,author });

      res.status(201).json(termsOfService);

    } catch (error) {
      res.status(500).json({ error: 'TermsOfService eklenemedi' });
    }
  } else if (req.method === 'GET') {
    try {
      const termsOfServicies = await TermsOfService.find({});
      res.status(200).json(termsOfServicies);
    } catch (error) {
      res.status(500).json({ error: 'TermsOfService alınamadı' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST ve GET istekleri kabul edilir' });
  }
}
