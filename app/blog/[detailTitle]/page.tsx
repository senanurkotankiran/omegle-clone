"use client"

import Breadcrumb from '@/app/components/breadcrumb/Breadcrumb'
import Footer from '@/app/components/footer/page'
import Navbar from '@/app/components/navbar/Navbar'
import Navbar2 from '@/app/components/navbar2/Navbar2'
import Image from 'next/image'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const BlogDetail = () => {


  const params = useParams();
  const detailTitle = Array.isArray(params?.detailTitle) ? params.detailTitle[0] : params?.detailTitle || '';
  const decodedTitle = decodeURIComponent(detailTitle);
  interface IBlogItem {
    _id: string;
    title: string;
    content: string;
    author: string,
    image: string;
  }

  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<IBlogItem | null>(null);


  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);


  useEffect(() => {
    if (blogs.length > 0) {

      const blog = blogs.find((blog) => blog.title === decodedTitle) || null;
      setSelectedBlog(blog);
    }
  }, [decodedTitle, blogs]);




  const router = useRouter();
  const handleClick = () => {
    router.push('/ftf')
  }

 
  return (

    <div className="min-h-screen">
 <div className="pt-4">
        <div className="fixed top-0 w-full z-10">
          <Navbar/>
        </div>
        <div className="mt-32 md:mt-16">
          <Navbar2/>
        </div>
      </div>
      <div className='ml-8 mt-4'>
      <Breadcrumb title={selectedBlog?.title} />

      </div>
      <main className="max-w-4xl mx-auto mb-4 mt-4">
        <div className="text-left">


          <div className="bg-white rounded-lg shadow-lg p-12 mb-16 flex flex-col items-center">
            {selectedBlog?.image && (
              <Image src={selectedBlog.image} alt={selectedBlog.title} width={500} height={500} className="mb-4" />
            )}              
            <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedBlog?.title}</h2>
            <p className="text-gray-600 text-justify ">{selectedBlog?.content}</p>
          </div>

        </div>

       

      </main>



      <div className="w-full">
          <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
            <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-center">Connect Globally, Talk to Strangers Right Now!</h2>
            <div className="p-2 flex items-center justify-center">
              <button onClick={handleClick} className="animate-bounce transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center border-none bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-l text-white h-14 md:h-16 w-full md:w-72 rounded-full">
                Start Chat
              </button>
            </div>
            <p className="text-gray-800 text-center">Make New Friends Make New Friends Make New FriendsMake New FriendsMake New Friends</p>
          </div>
        </div>
        <Footer/>
    </div>
  )
}

export default BlogDetail