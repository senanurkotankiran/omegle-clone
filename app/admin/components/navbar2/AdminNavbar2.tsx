"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import Login from '@/app/admin/components/user/Login';
import { useSession } from 'next-auth/react';

const AdminNavbar2 = () => {
  const [isContractDropdownOpen, setIsContractDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setIsLoginDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleContractDropdown = () => {
    setIsContractDropdownOpen(!isContractDropdownOpen);
  };

  const toggleLoginDropdown = () => {
    setIsLoginDropdownOpen(!isLoginDropdownOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className="flex flex-col md:flex-row w-full items-center justify-between px-3 md:px-10 h-auto md:h-14 text-white bg-gradient-to-r from-gray-800 via-gray-800 to-gray-800 space-y-4 md:space-y-0 font-sans text-sm font-bold mt-4 md:mt-0">
        <div className="flex items-center space-x-4">
          <Link href="/admin/panel/" >
            <div className="px-4 md:px-6 py-2">Panel</div>
          </Link>
          <button onClick={toggleMenu} className="md:hidden">
            <div className="w-6 h-6 flex flex-col justify-between items-center">
              <span className="block w-full h-0.5 bg-white"></span>
              <span className="block w-full h-0.5 bg-white"></span>
              <span className="block w-full h-0.5 bg-white"></span>
            </div>
          </button>
        </div>

        <div className={`${isMenuOpen ? 'block' : 'hidden'}   md:flex flex-col md:flex-row items-start md:items-center w-full md:w-auto space-y-2 md:space-y-0 md:space-x-4`}>
          <Link href="/admin/blog/blogList/" className="block px-4 py-2  hover:bg-gray-500 md:hover:bg-transparent ">Blog</Link>
          <Link href="/admin/user/userList" className="block px-4 py-2 hover:bg-gray-500 md:hover:bg-transparent">User</Link>
          <Link href="/admin/category/categoryList" className="block px-4 py-2 hover:bg-gray-500 md:hover:bg-transparent">Category</Link>
          <Link href="/admin/faq/faqList" className="block px-4 py-2 hover:bg-gray-500 md:hover:bg-transparent">FaQ</Link>
          <Link href="/admin/testimonial/testimonialList" className="block px-4 py-2 hover:bg-gray-500 md:hover:bg-transparent">Reference</Link>

          <div className="relative">
            <button onClick={toggleContractDropdown} className="block px-4 py-2 hover:bg-gray-500 md:hover:bg-transparent  ">Sözleşmeler</button>
            {isContractDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-b-lg shadow-lg z-10 ">
                <Link href={'/admin/privacy-policy/privacyList'} className="block px-4 py-2 hover:bg-gray-200 md:hover:bg-gray-200 ">Privacy Policy</Link>
                <Link href={'/admin/terms-of-service/termsList'} className="block px-4 py-2 hover:bg-gray-200 md:hover:bg-gray-200">Terms Of Service</Link>
                <Link href={'/admin/community-guidelines/communityList'} className="block px-4 py-2 hover:bg-gray-200 md:hover:bg-gray-200">Community Guidliness</Link>
              </div>
            )}
          </div>
        </div>

        <div className="relative ml-auto">
          {session ? (
            <div onClick={toggleLoginDropdown} className="flex items-center space-x-2 cursor-pointer">
              <span>{session.user?.name || session.user?.email}</span>
              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                {/* Icon for dropdown */}
              </div>
            </div>
          ) : (
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              {/* Icon for dropdown */}
            </div>
          )}
          {isLoginDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-10">
              <Link href="/admin/user/login" className="block px-4 py-2">
                <Login />
              </Link>
              <button className="w-full text-left px-4 py-2 hover:bg-gray-200">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default AdminNavbar2;
