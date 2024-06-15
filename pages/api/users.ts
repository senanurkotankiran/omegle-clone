import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  await connectToDatabase();

  const { method } = req;

  if (method === 'GET') {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching users', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}