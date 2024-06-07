import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import connectToDatabase from '@/lib/mongoose'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await connectToDatabase()

  switch (method) {
    case 'POST':
      try {
        const { name, email, password } = req.body

        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Please fill all fields' })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = new User({
          name,
          email,
          password: hashedPassword,
        })

        await user.save()

        res.status(201).json({ message: 'User created successfully' })
      } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error })
      }
      break
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
}
