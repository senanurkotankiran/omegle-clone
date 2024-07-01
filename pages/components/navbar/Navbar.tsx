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

     
    </div>
  )
}

export default Navbar
