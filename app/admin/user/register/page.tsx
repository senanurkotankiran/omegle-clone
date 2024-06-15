"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()

    if (res.ok) {
      router.push('/admin/user/login')
    } else {
      setError(data.message)
    }
  }

  return (
    <div>
         <div className="pt-4 mb-4">
        <div className="fixed top-0 w-full z-10">
          <AdminNavbar/>
        </div>
        <div className="mt-14 md:mt-16">
          <AdminNavbar2/>
        </div>
      </div>
      <div>
        
      </div>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md  ">
     
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white  rounded-lg ">
        <h1 className="text-2xl mb-8 font-bold">Register</h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
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
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Register</button>

      </form>

    </div>

    </div>
    
  )
}

export default Register
