"use client"
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import AdminNavbar from '@/app/admin/components/navbar/AdminNavbar'
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2'

const CategoryForm = () => {
  
  interface ICategoryItem {
    _id: string;
    name: string;

  }

const [categories, setCategories] = useState<ICategoryItem[]>([])
const [error, setError] = useState('')

const [name, setName] = useState('');
const router = useRouter();

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
const res = await fetch('/api/categories', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name }),
});
const newCategory = await res.json();
setName('');
setCategories([...categories, newCategory]); 
};

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
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md  mt-28 md:mt-32">

        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white  rounded-lg ">
          <h1 className="text-2xl mb-8 font-bold">CategoryForm</h1>
          {error && <p className="text-red-500">{error}</p>}

          <div className="mb-4">
            <label className="block mb-2 text-sm">Category Name</label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
         
          <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Save</button>

        </form>

      </div>

    </div>
  )
}

export default CategoryForm
