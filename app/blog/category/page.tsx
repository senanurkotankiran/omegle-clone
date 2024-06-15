"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/app/components/navbar/Navbar'
import Navbar2 from '@/app/components/navbar2/Navbar2'
import Breadcrumb from '@/app/components/breadcrumb/Breadcrumb'
import Footer from '@/app/components/footer/page'

const Blog = () => {

  interface IBlogItem {
    _id: string;
    title: string;
    content: string;
    author: string,
    image: string;
    createdAt: string;
  }

  interface ICategoryItem {
    _id: string;
    name: string;

  }

  const [categories, setCategories] = useState<ICategoryItem[]>([])
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

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    };

    fetchCards();
  }, []);


  const truncateContent = (content: string, length: number) => {
    return content.length > length ? content.slice(0, length) + '...' : content;
  };

  return (
    <div className="min-h-screen">
      <div className="pt-4">
        <div className="fixed top-0 w-full z-10">
          <Navbar />
        </div>
        <div className="mt-32 md:mt-16">
          <Navbar2 />
        </div>
      </div>
      <div>
        <Image src='/blog6.png' alt='foto' width={1800} height={900} className="mb-4 w-full h-200 opacity-65" />
      </div>

      <div className='ml-8 mt-4'>
        <Breadcrumb />
      </div>

      <main className="max-w-4xl mx-auto mb-4 ">
        <div className="text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-8 text-white text-center">Omegle Online Video Chat </h1>

          <div className='uppercase flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8 px-3 md:px-10'>
            {categories.map((item) => (
              <div
                key={item._id}
                className='text-center text-lg text-white font-bold  hover:text-gray-600'
                onClick={() => {
                  router.push(`/blog/category/${item._id}`)
                }}>
                {item.name}
              </div>
            ))}
            <div className='text-center text-lg text-white font-bold  hover:text-gray-600' onClick={() => {
              router.push(`/blog/`);
            }}> ALL BLOGS</div>          </div>



          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {blogs.map((item) => {
              return (
                <div
                  key={item._id}
                  onClick={() => router.push(`/blog/${item._id}`)}
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
      <Footer />

    </div>
  )
}

export default Blog
