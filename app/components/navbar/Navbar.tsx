"use client"
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/ftf')
  }
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-3 md:gap-10 px-r md:px-10 h-auto md:h-20 text-slate-100 bg-gradient-to-r from-gray-100 via-white ">
      <div className="flex items-center">
        <Link href={"/"}><Logo/></Link>
      </div>
      <div className="flex items-center mt-4 md:mt-0">
      
                  <button onClick={handleClick}  className="transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center border-none bg-orange-500 font-bold text-white h-10 w-16 rounded-lg">
                    Login
                  </button>
              
      </div>
     
    </div>
  )
}

export default Navbar
