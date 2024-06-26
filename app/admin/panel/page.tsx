import React from 'react'
import AdminNavbar from '../components/navbar/AdminNavbar'
import AdminNavbar2 from '../components/navbar2/AdminNavbar2'
import Image from 'next/image'
import Last3Blog from '@/app/components/home/Last4Blog'
import Link from 'next/link'

const Panel = () => {
  return (
    <div>
      <div className="pt-4">
       <AdminNavbar/>
        <div className="mt-14 md:mt-16">
          <AdminNavbar2/>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-8">
        <h1 className="text-4xl md:text-4xl font-bold mb-4 md:mb-8 text-white text-center">Admin Paneli</h1>
        
       
        <main className="max-w-4xl mx-auto mb-4 ">
        <div className="text-left">

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
             

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Link href={"/admin/blog/blogForm"}>
                <div className='font-extrabold border border-dashed border-slate-400 p-10 m-2 text-center text-6xl rounded-lg border-4 mb-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300'>
                  +
                </div>
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Blog Yazısı Ekle</h2>
              <p className="text-gray-600 text-center">Kişisel deneyimlerinizi paylaşmak için tıklayın...</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Link href={"/admin/user/register"}>
                <div className='font-extrabold border border-dashed border-slate-400 p-10 m-2 text-center text-6xl rounded-lg border-4 mb-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300'>
                  +
                </div>
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Admin Ekle</h2>
              <p className="text-gray-600 text-center">Admin paneline giriş için kullanıcı ekle...</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Link href={"/admin/category/categoryForm"}>
                <div className='font-extrabold border border-dashed border-slate-400 p-10 m-2 text-center text-6xl rounded-lg border-4 mb-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300'>
                  +
                </div>
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Kategori Ekle</h2>
              <p className="text-gray-600 text-center">Kategori eklemek için tıklayın...</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Link href={"/admin/faq/faqForm"}>
                <div className='font-extrabold border border-dashed border-slate-400 p-10 m-2 text-center text-6xl rounded-lg border-4 mb-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300'>
                  +
                </div>
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">FaQ Ekle</h2>
              <p className="text-gray-600 text-center">FaQ eklemek için tıklayın...</p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <Link href={"/admin/testimonial/testimonialForm"}>
                <div className='font-extrabold border border-dashed border-slate-400 p-10 m-2 text-center text-6xl rounded-lg border-4 mb-4 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300'>
                  +
                </div>
              </Link>
              <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">Referans Ekle</h2>
              <p className="text-gray-600 text-center">Referans eklemek için tıklayın...</p>
            </div>

           

          </div>
        </div>
      </main>

      </div>
    </div>
  )
}

export default Panel