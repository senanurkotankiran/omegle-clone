"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2'
import { htmlToText } from 'html-to-text'

const BlogList = () => {

  interface IBlogItem {
    _id: string;
    title: string;
    content: string;
    author: string,
    image: string;
    createdAt: string;
  }

  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      const sortedBlogs = data.sort((a: IBlogItem, b: IBlogItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      setBlogs(sortedBlogs);
    };

    fetchBlogs();
  }, []);

  const truncateContent = (content: string, length: number) => {
    const textContent = htmlToText(content, { wordwrap: false });
    return textContent.length > length ? textContent.slice(0, length) + '...' : textContent;  };

  return (
    <div className="min-h-screen">
         <div className="pt-4">
        <div className="fixed top-0 w-full z-10">
          <AdminNavbar />
        </div>
        <div className="mt-14 md:mt-16">
          <AdminNavbar2/>
        </div>
      </div>
 

      <main className="max-w-4xl mx-auto mb-4 ">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-8 text-white text-center">Omegle Video Chat With Strangers</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => router.push(`/admin/blog/${item._id}`)}
                  className="bg-white rounded-lg shadow-lg p-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300 cursor-pointer"
                >
                  <Image 
                    src={item.image} 
                    alt='foto' 
                    width={250} 
                    height={250} 
                    className="mb-4 rounded border mx-auto" 
                  />
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">{item.title}</h2>
                  <p className="text-gray-600 text-justify">
                    {truncateContent(item.content, 50)}
                  </p>
                </div>
              )
            })}

         
          </div>
        </div>
      </main>

    </div>
  )
}

export default BlogList
