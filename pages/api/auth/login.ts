import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import User from '../../../models/User'
import jwt from 'jsonwebtoken'
import connectToDatabase from '@/lib/mongoose'
import { SignJWT } from 'jose'
import { getJwtSecretKey } from '@/lib/auth'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await connectToDatabase()

  switch (method) {
    case 'POST':
      try {
        const { email, password } = req.body

        if (!email || !password) {
          return res.status(400).json({ message: 'Please fill all fields' })
        }

        const user = await User.findOne({ email })

        if (!user) {
          return res.status(400).json({ message: 'Invalid email or password' })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' })
        }

        
        //generate token
       const token  = await new SignJWT({
          email: user.email  
        }).setProtectedHeader({
          alg: 'HS256'
        }).setIssuedAt()
        .setExpirationTime('1h')
        .sign(getJwtSecretKey())
        console.log("token", token) 

        //const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' })

        res.status(200).json({ token })
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
