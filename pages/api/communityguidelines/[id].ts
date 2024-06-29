import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoose';
import CommunityGuidelines from '@/models/CommunityGuidelines';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const deleteCommunityGuidelines = await CommunityGuidelines.findByIdAndDelete(id);
      if (!deleteCommunityGuidelines) {
        return res.status(404).json({ error: 'Silinecek CommunityGuidelines bulunamadı' });
      }
      res.status(200).json({ message: 'CommunityGuidelines başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'CommunityGuidelines silinemedi' });
    }
  } else if (req.method === 'PUT') {
    const { communityGuidelinesId } = req.body;
    const { description, author, text } = req.body;
    try {
      const updatedCommunityGuidelines = await CommunityGuidelines.findByIdAndUpdate(communityGuidelinesId, { description, text, author }, { new: true });
      if (!updatedCommunityGuidelines) {
        return res.status(404).json({ error: 'CommunityGuidelines Referans bulunamadı' });
      }
      res.status(200).json(updatedCommunityGuidelines);
    } catch (error) {
      res.status(500).json({ error: 'CommunityGuidelines güncellenemedi' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST, GET, DELETE ve PUT istekleri kabul edilir' });
  }
}
