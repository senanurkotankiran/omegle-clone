import connectToDatabase from "@/lib/mongoose";
import User from "@/models/User";
import bcrypt from 'bcryptjs'
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest , res: NextApiResponse){
    await connectToDatabase();

  if ( req.method === 'POST') {
    const { name, email, password } = req.body
 
    try {
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please fill all fields' })
          }
  
          const existingUser = await User.findOne({ email })
  
          if (existingUser) {
            return res.status(400).json({ message: 'User already exists' })
          }
  
          const hashedPassword = await bcrypt.hash(password, 10)
          const user = await User.create({ name, email, password:hashedPassword });  
          res.status(201).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error })

    }
}
}