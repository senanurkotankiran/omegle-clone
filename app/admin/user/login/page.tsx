"use client"
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import AdminNavbar from '@/app/admin/components/navbar/AdminNavbar'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()



    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn('credentials',{
      redirect: false,
      email,
      password,
    } )
 

    if (res?.error) {
      setError(res.error)
    } else {
      router.push( '/admin/panel');

    }

  }

  return (
    <div>
    <div className="pt-4 mb-4">
   <div className="fixed top-0 w-full z-10">
     <AdminNavbar/>
   </div>
   
 </div>
 <div>
   
 </div>
   <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md  mt-28 md:mt-32">

 <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white  rounded-lg ">
   <h1 className="text-2xl mb-8 font-bold">Log In</h1>
   {error && <p className="text-red-500">{error}</p>}
 
   <div className="mb-4">
     <label className="block mb-2 text-sm">Email</label>
     <input
       type="email"
       value={email}
       onChange={(e) => setEmail(e.target.value)}
       className="w-full p-2 border rounded-lg"
     />
   </div>
   <div className="mb-4">
     <label className="block mb-2 text-sm">Password</label>
     <input
       type="password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
       className="w-full p-2 border rounded-lg"
     />
   </div>
   <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Login</button>

 </form>

</div>

</div>
  )
}

export default Login

