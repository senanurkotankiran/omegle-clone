"use client"

import Breadcrumb from '@/app/components/breadcrumb/Breadcrumb'
import CommentForm from '@/app/components/comment/CommentForm'
import CommentList from '@/app/components/comment/CommentList'
import Image from 'next/image'
import Link from 'next/link'

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const BlogDetail = () => {


  const params = useParams();
  const detailId = params?.detailId;

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

      const blog = blogs.find((blog) => blog._id === detailId) || null;
      setSelectedBlog(blog);
    }
  }, [detailId, blogs]);







  return (

    <div className="min-h-screen">

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
            <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-center">Talk to Strangers Right Now!</h2>
            <div className="p-2 flex items-center justify-center">
              <Link href={"/"} className="animate-bounce transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center border-none bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-l text-white h-14 md:h-16 w-full md:w-72 rounded-full">
                Start Chat
              </Link>
            </div>
            <p className="text-gray-800 text-center">Make New Friends Make New Friends Make New FriendsMake New FriendsMake New Friends</p>
          </div>
        </div>
    </div>
  )
}

export default BlogDetail