import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const AdminNavbar = () => {
  return (
    <div> <div className="fixed top-0 w-full z-10">
    <div className="flex flex-col md:flex-row items-center justify-between gap-3 px-3 md:gap-10 px-r md:px-10 h-auto md:h-20 text-slate-100 bg-gradient-to-r from-gray-100 via-white ">
    <div className="flex items-center">
        <Link href={"/admin/panel"}> <div className=" m-2 py-1 h-14 cursor-pointer flex items-center space-x-2">

          <Image src="/omegleLogo.png" alt="Logo" width={200} height={200} />



        </div></Link>
      </div>

    </div>
  </div></div>
  )
}

export default AdminNavbar