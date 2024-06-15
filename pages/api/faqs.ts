import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoose';
import Faq, { IFaq } from '@/models/Faq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { question, answer } = req.body;
    try {
      const faq: IFaq = await Faq.create({ question, answer });
      res.status(201).json(faq);
    } catch (error) {
      res.status(500).json({ error: 'Faq eklenemedi' });
    }
  } else if (req.method === 'GET') {
    try {
      const faqs: IFaq[] = await Faq.find({});
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ error: 'Faqs alınamadı' });
    }
  } else if (req.method === 'DELETE') {
    const { faqId } = req.body;
    try {
      const deleteFaq = await Faq.findByIdAndDelete(faqId);
      if (!deleteFaq) {
        return res.status(404).json({ error: 'Silinecek Faq bulunamadı' });
      }
      res.status(200).json({ message: 'Faq başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'Faq silinemedi' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST, GET ve DELETE istekleri kabul edilir' });
  }
}
