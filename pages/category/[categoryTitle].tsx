"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { htmlToText } from 'html-to-text'
import Head from 'next/head'
import Navbar from '@/app/components/navbar/Navbar'
import Navbar2 from '@/app/components/navbar2/Navbar2'
import Breadcrumb from '@/app/components/breadcrumb/Breadcrumb'
import Footer from '@/app/components/footer/page'

const Category = () => {
  const params = useParams();
  const categoryTitle = Array.isArray(params?.categoryTitle) ? params.categoryTitle[0] : params?.categoryTitle || '';
  const decodedTitle = decodeURIComponent(categoryTitle.replace(/-/g, ' '));
  const router = useRouter();

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Omegle",
    "url": "https://omegle-mu.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://omegle-mu.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Omegle",
    "url": "https://omegle-mu.vercel.app",
    "logo": "https://omegle-mu.vercel.app/static/logo.png",
    "sameAs": [
      "https://www.facebook.com/Omegle",
      "https://twitter.com/Omegle",
      "https://www.instagram.com/Omegle",
    ],
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Omegle: Talk to Strangers",
    "description": "Omegle is just a great way to Video Chat with Girls, meet new people and have a fun time omegle people.",
    "url": `https://omegle-mu.vercel.app/category/${encodeURIComponent(decodedTitle.replace(/ /g, '-'))}`,
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://omegle-mu.vercel.app"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": `${encodeURIComponent(decodedTitle.replace(/ /g, '-'))}`,
        "item":`https://omegle-mu.vercel.app/${encodeURIComponent(decodedTitle.replace(/ /g, '-'))}`
      }
    ]
  };

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
    const textContent = htmlToText(content, { wordwrap: false });
    return textContent.length > length ? textContent.slice(0, length) + '...' : textContent;
  };

  const toLowerCaseTitle = (title: string) => {
    return encodeURIComponent(title.toLowerCase().replace(/ /g, '-'));
  };

  const canonicalUrl = `https://omegle-mu.vercel.app/category/${decodedTitle}`;

  return (
    <>
      <Head>
        <title>{`${decodedTitle} - Omegle Blog`}</title>
        <meta name="description" content={`Blogs under category ${decodedTitle}`} />
        <meta name="keywords" content={`Omegle, blog, ${decodedTitle}`} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <script
        id='jsonLdWebSiteId'
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        id='jsonLdOrganizationId'
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        id='jsonLdWebPageId'
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      <script
        id='jsonLdBreadcrumbId'
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />

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
                    className="bg-white rounded-lg shadow-lg p-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300 cursor-pointer capitalize"
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
                  className="rounded mb-2 mx-auto"
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
