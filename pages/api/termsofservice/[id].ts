import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoose';
import TermsOfService from '@/models/TermsOfService';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deleteTermsOfService = await TermsOfService.findByIdAndDelete(id);
      if (!deleteTermsOfService) {
        return res.status(404).json({ error: 'Silinecek TermsOfService bulunamadı' });
      }
      res.status(200).json({ message: 'TermsOfService başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'TermsOfService silinemedi' });
    }
  } else if (req.method === 'PUT') {
    const { termsOfServiceId } = req.body;
    const { description, author, text } = req.body;
    try {
      const updatedTermsOfService= await TermsOfService.findByIdAndUpdate(termsOfServiceId, { description, text, author }, { new: true });
      if (!updatedTermsOfService) {
        return res.status(404).json({ error: 'TermsOfService Referans bulunamadı' });
      }
      res.status(200).json(updatedTermsOfService);
    } catch (error) {
      res.status(500).json({ error: 'TermsOfService güncellenemedi' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST, GET, DELETE ve PUT istekleri kabul edilir' });
  }
}
