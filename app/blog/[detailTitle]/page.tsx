"use client"

import Breadcrumb from '@/app/components/breadcrumb/Breadcrumb'
import Footer from '@/app/components/footer/page'
import Navbar from '@/app/components/navbar/Navbar'
import Navbar2 from '@/app/components/navbar2/Navbar2'
import Image from 'next/image'
import { format } from 'date-fns';

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { NextPageContext } from 'next'
import Faqs from '@/app/components/home/Faqs'

const BlogDetail = () => {

  const params = useParams();
  const detailTitle = Array.isArray(params?.detailTitle) ? params.detailTitle[0] : params?.detailTitle || '';
  const decodedTitle = decodeURIComponent(detailTitle.replace(/-/g, ' '));
  
  interface IBlogItem {
    _id: string;
    title: string;
    content: string;
    author: string;
    image: string;
    createdAt: Date;
    categoryId: { _id: string; name: string };
  }

  interface IFaqItem {
    _id: string;
    question: string;
    answer: string;
    blogId?: { _id: string; title: string };
  }

  // SSS öğeleri ve açık olan SSS öğesinin indeksini tutan durumlar
  const [faqs, setFaqs] = useState<IFaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<IBlogItem | null>(null);
  const [pageTitle, setPageTitle] = useState('Loading...')

  const router = useRouter();
  const handleClick = () => {
    router.push('/ftf');
  }

  // Blog verilerini API'den çek ve duruma ata
  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

  // Seçili blogu belirle
  useEffect(() => {
    if (blogs.length > 0) {
      const blog = blogs.find((blog) => blog.title.toLowerCase() === decodedTitle.toLowerCase()) || null;
      setSelectedBlog(blog);
    }
  }, [decodedTitle, blogs]);

  // Sayfa başlığını güncelle
  useEffect(() => {
    if (selectedBlog) {
      setPageTitle(selectedBlog.title);
    }
  }, [selectedBlog]);

  // URL'yi blog başlığı ile güncelle
  const formatTitleForURL = (title: string) => {
    return encodeURIComponent(
      title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/\./g, '-')
    )
  }

  useEffect(() => {
    if (selectedBlog) {
      const formattedTitle = formatTitleForURL(selectedBlog.title);
      router.replace(`/blog/${formattedTitle}`);
    }
  }, [selectedBlog, router]);

  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      const filteredFaqs = selectedBlog ? data.filter((faq: IFaqItem) => faq.blogId?.title === selectedBlog.title) : [];
      setFaqs(filteredFaqs);
    };

    if (selectedBlog) {
      fetchFaqs();
    }
  }, [selectedBlog]);


  // Bir SSS öğesini açıp kapatan işlev
  const toggleFaq = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <>
      <head>
        <title>{pageTitle}</title>
        <meta name="description" content="Omegle is a great place to meet new friends. When you use Omegle, we pick another user at random and let you have a one-on-one chat with each other." />
        <meta name="keywords" content="Omegle, chat, meet new people, secure chat, online friends" />
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
          <Breadcrumb title={selectedBlog?.title} category={selectedBlog?.categoryId.name} />
        </div>
        <main className="max-w-4xl mx-auto mb-4 mt-4">
          <div className="text-left">
            <div className="bg-white rounded-lg shadow-lg p-12 mb-16 flex flex-col items-center">
              {selectedBlog?.image && (
                <Image src={selectedBlog.image} alt={selectedBlog.title} width={500} height={500} className="mb-4" />
              )}
              <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedBlog?.title}</h2>
              <span className='text-xs pb-8'>{selectedBlog?.categoryId.name} {'>'} {selectedBlog?.title}</span>
              <div className="text-gray-600 text-justify " dangerouslySetInnerHTML={{ __html: selectedBlog?.content || '' }}></div>
              <span className=' w-full items-right text-xs p-8 pb-4 text-gray-700 text-right'>
                {selectedBlog?.createdAt && format(new Date(selectedBlog.createdAt), 'MMMM dd, yyyy')}
              </span>
              <span className=' w-full items-right text-xs pr-8 text-gray-700 text-right capitalize '>
                {selectedBlog?.author}
              </span>
            </div>
          </div>

          <div className="max-w-screen-lg w-full mx-auto mb-8 md:mb-16">
            <div className="mt-12">
              <h2 className="text-3xl flex justify-center font-bold mb-4 text-white">FAQs</h2>
              <div>
                {faqs.map((item) => (
                  <div key={item._id} className="py-2">
                    <button
                      className="flex items-center justify-between w-full py-2 px-4 text-left bg-white rounded-t-lg shadow-lg focus:outline-none focus:ring focus:ring-black"
                      onClick={() => toggleFaq(item._id)}
                    >
                      <span className="text-xl font-semibold">{item.question}</span>
                      <svg
                        className="w-6 h-6 text-gray-600 transform transition-transform"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ transform: openIndex === item._id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <path
                          d="M5 15l7-7 7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    {openIndex === item._id && (
                      <div className="flex items-center justify-between w-full py-2 px-4 text-left font-bold rounded-b-lg shadow-lg">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
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
        <Footer />
      </div>
    </>
  );
}

export default BlogDetail;
