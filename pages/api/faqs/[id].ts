import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoose';
import Faq, { IFaq } from '@/models/Faq';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deleteFaq = await Faq.findByIdAndDelete(id);
      if (!deleteFaq) {
        return res.status(404).json({ error: 'Silinecek Faq bulunamadı' });
      }
      res.status(200).json({ message: 'Faq başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'Faq silinemedi' });
    }
  } else if (req.method === 'PUT') {
    const { faqId } = req.body;
    const { question, answer } = req.body;
    try {
      const updatedFaq = await Faq.findByIdAndUpdate(faqId, { question, answer }, { new: true });
      if (!updatedFaq) {
        return res.status(404).json({ error: 'Güncellenecek Faq bulunamadı' });
      }
      res.status(200).json(updatedFaq);
    } catch (error) {
      res.status(500).json({ error: 'Faq güncellenemedi' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST, GET, DELETE ve PUT istekleri kabul edilir' });
  }
}
