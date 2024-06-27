import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '@/lib/mongoose';
import Faq, { IFaq } from '@/models/Faq';
import Blog from '@/models/Blog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { question, answer, blogId } = req.body;
    try {
      const faq: IFaq = await Faq.create({ question, answer, blogId });
      res.status(201).json(faq);
    } catch (error) {
      res.status(500).json({ error: 'FAQ could not be added' });
    }
  } else if (req.method === 'GET') {
    const { blog } = req.query;

    try {
      let faqs: IFaq[];
      if (blog) {
        const categoryDoc = await Blog.findOne({ title: blog });
        if (categoryDoc) {
          faqs = await Faq.find({ blogId: categoryDoc._id }).populate('blogId');
        } else {
          faqs = [];
        }
      } else {
        faqs = await Faq.find({}).populate('blogId');
      }
      res.status(200).json(faqs);
    } catch (error) {
      res.status(500).json({ error: 'Bloglar alınamadı' });
    }
  }  else {
    res.status(405).json({ error: 'Only POST, GET and DELETE requests are accepted' });
  }
}
