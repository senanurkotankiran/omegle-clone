
import connectToDatabase from '@/lib/mongoose';
import Blog from '@/models/Blog';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { title, content, author,image } = req.body;
    try {
      const blog = await Blog.create({ title, content, author,image });
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: 'Kartvizit eklenemedi' });
    }
  } else if (req.method === 'GET') {
    try {

      const blogs = await Blog.find({})
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Kartvizitler alınamadı' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    try {
      const deleteBlog = await Blog.findByIdAndDelete(id);
      if (!deleteBlog) {
        return res.status(404).json({ error: 'Silinecek kart bulunamadı' });
      }
      res.status(200).json({ message: 'Kart başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'Kart silinemedi' });
    }
  }else {
    res.status(405).json({ error: 'Yalnızca POST ve GET istekleri kabul edilir' });
  }
}
