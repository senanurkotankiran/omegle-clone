import connectToDatabase from '@/lib/mongoose';
import Category from '@/models/Category';
import Testimonial from '@/models/Testimonial';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { text,author } = req.body;
    try {
      const testimonial = await Testimonial.create({ text,author });

      res.status(201).json(testimonial);

    } catch (error) {
      res.status(500).json({ error: 'Referans eklenemedi' });
    }
  } else if (req.method === 'GET') {
    try {
      const testimonials = await Testimonial.find({});
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ error: 'Referanslar alınamadı' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST ve GET istekleri kabul edilir' });
  }
}
