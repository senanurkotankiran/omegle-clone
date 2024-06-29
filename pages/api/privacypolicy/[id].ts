import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoose';
import PrivacyPolicy from '@/models/PrivacyPolicy';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deletePrivacyPolicy = await PrivacyPolicy.findByIdAndDelete(id);
      if (!deletePrivacyPolicy) {
        return res.status(404).json({ error: 'Silinecek PrivacyPolicy bulunamadı' });
      }
      res.status(200).json({ message: 'PrivacyPolicy başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'PrivacyPolicy silinemedi' });
    }
  } else if (req.method === 'PUT') {
    const { privcayPolicyId } = req.body;
    const { description, author, text } = req.body;
    try {
      const updatedPrivacyPolicy = await PrivacyPolicy.findByIdAndUpdate(privcayPolicyId, { description, text, author }, { new: true });
      if (!updatedPrivacyPolicy) {
        return res.status(404).json({ error: 'PrivacyPolicy Referans bulunamadı' });
      }
      res.status(200).json(updatedPrivacyPolicy);
    } catch (error) {
      res.status(500).json({ error: 'PrivacyPolicy güncellenemedi' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST, GET, DELETE ve PUT istekleri kabul edilir' });
  }
}
