// pages/api/auth/[...nextauth].ts

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import connectToDatabase from '@/lib/mongoose'

if (!process.env.JWT_SECRET_KEY) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local')
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        await connectToDatabase()
      
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error('Invalid email or password')
        }
      
        const user = await User.findOne({ email: credentials.email })
      
        if (!user) {
          throw new Error('Invalid email or password')
        }
      
        const isMatch = await bcrypt.compare(credentials.password, user.password)
      
        if (!isMatch) {
          throw new Error('Invalid email or password')
        }
      
        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
  secret: process.env.JWT_SECRET_KEY,
})
