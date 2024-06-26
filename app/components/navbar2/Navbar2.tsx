"use client"
import React, { useState } from 'react'
import ChatList from './ChatList'
import About from './About'
import Home from './Home'
import Link from 'next/link'
import { FaAngleDown, FaBars, FaTimes } from 'react-icons/fa'
import Blog from './Blog'

const Navbar2 = () => {
  const [active, setActive] = useState<string | null>('home')
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)

  const handleClick = (menu: string) => {
    if (menu === active) {
      setDropdownOpen(!dropdownOpen)
    } else {
      setActive(menu)
      setDropdownOpen(true)
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <nav className="flex flex-col md:flex-row w-full items-center justify-right px-3 cursor-pointer px-r md:px-10 h-auto md:h-14 text-black bg-gradient-to-r from-gray-800 via-gray-800 to-gray-800 space-y-4 md:space-x-12 md:space-y-0 font-sans text-sm font-bold text-white mt-4 md:mt-0">
      
    <Link href={"/"} className='p-2'>
    <div className='px-r  hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg ' >
    <Home />
      </div>
    </Link>
      <div className=" md:hidden ">
        <button onClick={toggleMobileMenu} className="text-white mt-2">
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>
      <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:flex flex-col md:flex-row w-full items-center md:space-x-16 p-2`}>
        
        <Link href={"/about"} className='hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg '>
        <div className='px-r hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg pb-4 md:pb-0'>
          <About />
        </div>
      </Link>


      <Link href={"/blog"}>
        <div className='px-r hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg pb-4 md:pb-0 '>
          <Blog />
        </div>
      </Link>
      </div>
    </nav>
  )
}

export default Navbar2
