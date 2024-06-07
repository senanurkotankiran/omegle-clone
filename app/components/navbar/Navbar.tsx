import React from 'react'
import Logo from './Logo'
import Login from '../user/Login'
import Link from 'next/link'
import UserInfo from '../user/UserInfo'

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-3 md:gap-10 px-r md:px-10 h-auto md:h-20 text-slate-100 bg-gradient-to-r from-gray-100 via-white ">
      <div className="flex items-center">
        <Link href={"/"}><Logo/></Link>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
        <Link href={"/user/login"} className='p-1'><Login/></Link>
      </div>
    </div>
  )
}

export default Navbar
