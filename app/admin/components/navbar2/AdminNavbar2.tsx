import About from '@/app/components/navbar2/About'
import Home from '@/app/components/navbar2/Home'
import Login from '@/app/components/user/Login'
import Link from 'next/link'
import React, { useState } from 'react'

const AdminNavbar2 = () => {
 
  
  return (
    <div>
        <nav className="flex md:flex-row justify-between items-center px-3 md:px-10 h-auto md:h-14 text-black bg-gradient-to-r from-gray-800 via-gray-800 to-gray-800 space-x-4 md:space-x-6 font-sans text-sm font-bold text-white mt-4 md:mt-0">

<div className="flex items-center space-x-4">
<Link href={"/admin/panel/"} className='hover:bg-white hover:opacity-50 hover:p-1 hover:text-black hover:rounded-lg'>
    <div className='px-4 md:px-6 py-2 hover:bg-white hover:opacity-50 hover:text-black hover:rounded-lg '>
      Panel
    </div>
  </Link>

  <Link href={"/admin/blog/blogList/"} className='hover:bg-white hover:opacity-50 hover:p-1 hover:text-black hover:rounded-lg'>
    <div className='px-4 md:px-6 py-2 hover:bg-white hover:opacity-50 hover:text-black hover:rounded-lg '>
      Blog 
    </div>
  </Link>

  <Link href={"/admin/user/userList"} className='hover:bg-white hover:opacity-50 hover:p-1 hover:text-black hover:rounded-lg'>
    <div className='px-4 md:px-6 py-2 hover:bg-white hover:opacity-50 hover:text-black hover:rounded-lg '>
      User
    </div>
  </Link>

  <Link href={"/admin/category/categoryList"} className='hover:bg-white hover:opacity-50 hover:p-1 hover:text-black hover:rounded-lg'>
    <div className='px-4 md:px-6 py-2 hover:bg-white hover:opacity-50 hover:text-black hover:rounded-lg '>
      Category
    </div>
  </Link>
  <Link href={"/admin/faq/faqList"} className='hover:bg-white hover:opacity-50 hover:p-1 hover:text-black hover:rounded-lg'>
    <div className='px-4 md:px-6 py-2 hover:bg-white hover:opacity-50 hover:text-black hover:rounded-lg '>
      FaQ
    </div>
  </Link>
</div>

<Link href={"/admin/user/login"} className='ml-auto '>
  <div className='px-4 md:px-6 py-2 ' >
    <Login />
  </div>
</Link>

</nav>
    </div>
  )
}

export default AdminNavbar2