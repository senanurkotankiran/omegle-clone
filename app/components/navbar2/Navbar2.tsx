"use client"
import React, { useState } from 'react'
import ChatList from './ChatList'
import ChatOnline from './ChatOnline'
import About from './About'
import Home from './Home'
import Link from 'next/link'
import { FaAngleDown } from 'react-icons/fa';
import Blog from './Blog'

const Navbar2 = () => {

  const [active, setActive] = useState<string | null>('home');
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleClick = (menu: string) => {
    if (menu === active) {
      setDropdownOpen(!dropdownOpen);
    } else {
      setActive(menu);
      setDropdownOpen(true)
    }
  };

  return (
    <nav className="flex flex-col md:flex-row w-full items-center justify-right px-3 cursor-pointer px-r md:px-10 h-auto md:h-14 text-black bg-gradient-to-r from-gray-800 via-gray-800 to-gray-800 space-y-4 md:space-y-0  md:space-x-16 font-sans text-sm font-bold text-white mt-4 md:mt-0">
      
      <Link href={"/"} className='p-2'>
        <div className={`px-r  hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg  ${active === 'home' ? 'transition ease-in-out hover:-translate-y-1 duration-300 bg-gray-100 text-black rounded-lg p-1 flex items-center justify-center' : ''}`} onClick={() => handleClick('home')}>
          <Home />
        </div>
      </Link>

      <div className="relative flex items-center ">
        <div className={`px-r flex items-center cursor-pointer  hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg ${active === 'chatlist' ? 'transition ease-in-out hover:-translate-y-1 duration-300 bg-gray-100 text-black rounded-lg p-1  flex items-center justify-center ' : ''}`} onClick={() => handleClick('chatlist')}>
          <ChatList />
          <FaAngleDown className={` transform transition-transform duration-200 ${dropdownOpen ? 'rotate-0' : 'rotate-180'}`} />
        </div>
        {dropdownOpen && active === 'chatlist' && (
          <div className="absolute top-full mt-2 w-60 bg-white shadow-lg rounded-md z-10 text-black">
            <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
              <span>💻Video Chat Apps </span>
            </div>
            <div className="flex items-center pl-4 pb-4 hover:bg-gray-100 cursor-pointer">
              <span>💬Video Chat with Girls</span>
            </div>
          </div>
        )}
      </div>

      <Link href={"/chatOnline"} className='hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg '>
        <div className={`px-r hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg ${active === 'chatonline' ? 'transition ease-in-out hover:-translate-y-1 duration-300  bg-gray-100 text-black rounded-lg p-1 flex items-center justify-center' : ''}`} onClick={() => handleClick('chatonline')}>
          <ChatOnline />
        </div>
      </Link>

      <Link href={"/about"} className='hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg '>
        <div className={`px-r hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg ${active === 'about' ? 'transition ease-in-out hover:-translate-y-1 duration-300  bg-gray-100 text-black rounded-lg p-1 flex items-center justify-center' : ''}`} onClick={() => handleClick('about')}>
          <About />
        </div>
      </Link>

      <Link href={"/blog"}>
        <div className={`px-r hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg ${active === 'blog' ? 'transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300   bg-gray-100 text-black rounded-lg p-1 flex items-center justify-center' : ''}`} onClick={() => handleClick('blog')}>
          <Blog />
        </div>
      </Link>

      <Link href={"/panel"}>
        <div className={`px-r hover:bg-white hover:opacity-50 hover:p-1 hover:text-black  hover:rounded-lg ${active === 'blog' ? 'transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 duration-300   bg-gray-100 text-black rounded-lg p-1 flex items-center justify-center' : ''}`} onClick={() => handleClick('blog')}>
          Panel
        </div>
      </Link>

    </nav>
  )
}

export default Navbar2
