import connectToDatabase from "@/lib/mongoose";
import Category from "@/models/Category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await connectToDatabase();

  const { method } = req;
  const { id } = req.query;

  if (method === 'PUT') {
    try {
      const category = await Category.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      console.error('Error updating category:', error); 
      res.status(400).json({ message: 'Error updating category', error });
    }
  } else if (method === 'DELETE') {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Error deleting category:', error); // Hata mesajını konsola yazdır
      res.status(400).json({ message: 'Error deleting category', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
