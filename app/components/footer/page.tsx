import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="text-white py-6 flex flex-col md:flex-row items-center justify-between w-full h-auto md:h-32  py-2 px-4 text-left font-bold shadow-lg bg-gradient-to-r from-rose-300 via-pink-600 to-indigo-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center md:my-auto">
        <p className="text-xs md:text-sm text-center md:text-left mb-4 md:mb-0 md:my-auto">&copy; We are not affiliated with Omegle.com LLC Official</p>
        <p className='text-xs md:text-sm text-center md:text-left mb-4 md:mb-0 md:my-auto'>Copyright &copy; Omegle 2023</p>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 md:items-center md:my-auto">
          <Link href={"/privacy-policy"} className="hover:text-gray-400 text-xs md:text-sm">Privacy Policy</Link>
          <Link href={"/terms-of-service"} className="hover:text-gray-400 text-xs md:text-sm">Terms Of Service</Link>
          <Link href={"/community-guidelines"} className="hover:text-gray-400 text-xs md:text-sm">Community Guidelines</Link>
          <a href="#" className="hover:text-gray-400 text-xs md:text-sm">Contact Us</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
