import connectToDatabase from "@/lib/mongoose";
import Blog from "@/models/Blog";
import Faq from "@/models/Faq";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const { method } = req;
  const { id } = req.query;

  if (method === 'PUT') {
    try {
      const blog = await Blog.findByIdAndUpdate(id, req.body, { new: true });
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json(blog);
    } catch (error) {
      res.status(400).json({ message: 'Error updating blog', error });
    }
  } else if (method === 'DELETE') {
    try {
      const deletedBlog = await Blog.findByIdAndDelete(id);
      if (!deletedBlog) {
        return res.status(404).json({ message: 'Blog not found' });
      }

      // Blog silindiğinde ilgili FAQ'ları da sil
      await Faq.deleteMany({ blogId: id });

      res.status(200).json({ message: 'Blog and related FAQs deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting blog and FAQs', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
