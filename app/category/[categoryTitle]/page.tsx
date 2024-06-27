"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Breadcrumb from '../../components/breadcrumb/Breadcrumb'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/page'
import Navbar2 from '../../components/navbar2/Navbar2'


const Category = () => {
  interface IBlogItem {
    _id: string;
    title: string;
    content: string;
    author: string;
    image: string;
    createdAt: string;
    categoryId: { _id: string; name: string };
  }

  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const params = useParams();
  const categoryTitle = Array.isArray(params?.categoryTitle) ? params.categoryTitle[0] : params?.categoryTitle || '';
  const decodedTitle = decodeURIComponent(categoryTitle.replace(/-/g, ' '));
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`/api/blogs`);
      const data = await res.json();
      const filteredBlogs = data.filter((blog: IBlogItem) =>
        blog.categoryId.name.toLowerCase() === decodedTitle.toLowerCase()
      );
      const sortedBlogs = filteredBlogs.sort((a: IBlogItem, b: IBlogItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBlogs(sortedBlogs);
    };

    fetchBlogs();
  }, [decodedTitle]);

  const truncateContent = (content: string, length: number) => {
    return content.length > length ? content.slice(0, length) + '...' : content;
  };

  const toLowerCaseTitle = (title: string) => {
    return encodeURIComponent(title.toLowerCase().replace(/ /g, '-'));
  };

  return (
    <>
      <head>
        <title>{decodedTitle} - Omegle Blog</title>
        <meta name="description" content={`Blogs under category ${decodedTitle}`} />
        <meta name="keywords" content={`Omegle, blog, ${decodedTitle}`} />
        <meta name="robots" content="index, follow" />
      </head>

      <div className="min-h-screen">
        <div className="pt-4">
          <div className="fixed top-0 w-full z-10">
            <Navbar />
          </div>
          <div className="mt-14 md:mt-16">
            <Navbar2 />
          </div>
        </div>
   
        <div className='ml-8 mt-4'>
          <Breadcrumb category={decodedTitle.toLowerCase()} />
        </div>

        <main className="max-w-4xl mx-auto mb-4 min-h-screen">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-8 text-white text-center capitalize">{decodedTitle}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {blogs.map((item) => {
                return (
                  <div
                    key={item._id}
                    onClick={() => router.push(`/blog/${toLowerCaseTitle(item.title)}`)}
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
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Category;
