import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await connectToDatabase();

  const { method } = req;
  const { id } = req.query;

  if (method === 'PUT') {
    try {
      const user = await User.findByIdAndUpdate(id, req.body, { new: true });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: 'Error updating user', error });
    }
  } else if (method === 'DELETE') {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: 'Error deleting user', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
