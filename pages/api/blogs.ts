import connectToDatabase from '@/lib/mongoose';
import Blog from '@/models/Blog';
import Category from '@/models/Category';  // Assuming you have a Category model
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { title, content, author, image, categoryId } = req.body;

    try {
      const blog = await Blog.create({ title, content, author, image, categoryId });
      res.status(201).json(blog);
    } catch (error) {
      res.status(500).json({ error: 'Blog oluşturulamadı' });
    }
  } else if (req.method === 'GET') {
    const { category } = req.query;

    try {
      let blogs;
      if (category) {
        const categoryDoc = await Category.findOne({ name: category });
        if (categoryDoc) {
          blogs = await Blog.find({ categoryId: categoryDoc._id }).populate('categoryId');
        } else {
          blogs = [];
        }
      } else {
        blogs = await Blog.find({}).populate('categoryId');
      }
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ error: 'Bloglar alınamadı' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      const deleteBlog = await Blog.findByIdAndDelete(id);
      if (!deleteBlog) {
        return res.status(404).json({ error: 'Silinecek blog bulunamadı' });
      }
      res.status(200).json({ message: 'Blog başarıyla silindi' });
    } catch (error) {
      res.status(500).json({ error: 'Blog silinemedi' });
    }
  } else {
    res.status(405).json({ error: 'Yalnızca POST, GET ve DELETE istekleri kabul edilir' });
  }
}
