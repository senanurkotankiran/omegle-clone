"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Last3Blog = () => {

  interface IBlogItem {
    _id: string;
    title: string;
    content: string;
    author: string;
    image: string;
    createdAt: string;
  }

  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  const truncateContent = (content: string, length: number) => {
    return content.length > length ? content.slice(0, length) + '...' : content;
  };

  const latestBlogs = blogs
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="text-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {latestBlogs.map((item) => (
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
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{item.title}</h2>
            <p className="text-gray-600 text-justify">
              {truncateContent(item.content, 100)}
            </p>
          </div>
        ))}

        <div
          onClick={() => router.push('/blog')}
          className="bg-pink-100 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-xl font-semibold text-gray-800 cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300"
        >
          <Image 
            src="/pink.webp" 
            alt='foto' 
            width={200} 
            height={200} 
            className="rounded mb-2 mx-auto" // mx-auto added to center images
          />
          <p className="mt-2">See All Blogs</p>
        </div>
      </div>
    </div>
  )
}

export default Last3Blog
