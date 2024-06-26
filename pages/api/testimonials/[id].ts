import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoose';
import Testimonial from '@/models/Testimonial';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'DELETE') {
    const { testimonialId } = req.body;
    try {
      const deleteTestimonial = await Testimonial.findByIdAndDelete(testimonialId);
      if (!deleteTestimonial) {
        return res.status(404).json({ error: 'Silinecek Referans bulunamadı' });
      }
      res.status(200).json({ message: 'Referans başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'Referans silinemedi' });
    }
  } else if (req.method === 'PUT') {
    const { testimonialId } = req.body;
    const { text, author } = req.body;
    try {
      const updatedTestimonial = await Testimonial.findByIdAndUpdate(testimonialId, { text, author }, { new: true });
      if (!updatedTestimonial) {
        return res.status(404).json({ error: 'Güncellenecek Referans bulunamadı' });
      }
      res.status(200).json(updatedTestimonial);
    } catch (error) {
      res.status(500).json({ error: 'Referans güncellenemedi' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST, GET, DELETE ve PUT istekleri kabul edilir' });
  }
}
