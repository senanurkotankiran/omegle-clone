"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { htmlToText } from 'html-to-text';
import Head from 'next/head';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';

// URL'leri düzgün hale getiren fonksiyon
const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '');

const Blog = () => {

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Omegle",
    "url": "https://omegle-mu.vercel.app/blog",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://omegle-mu.vercel.app/blog/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Omegle",
    "url": "https://omegle-mu.vercel.app/blog",
    "logo": "https://omegle-mu.vercel.app/static/logo.png",
    "sameAs": [
      "https://www.facebook.com/Omegle",
      "https://twitter.com/Omegle",
      "https://www.instagram.com/Omegle"
    ]
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Omegle: Talk to Strangers",
    "description": "Omegle is just a great way to Video Chat with Girls, meet new people and have a fun time omegle people.",
    "url": "https://omegle-mu.vercel.app/blog"
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
        "name": "Blog",
        "item": "https://omegle-mu.vercel.app/blog"
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

  interface ICategoryItem {
    _id: string;
    name: string;
  }

  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(`/api/blogs${selectedCategory ? `?category=${selectedCategory}` : ''}`);
      const data = await res.json();
      const sortedBlogs = data.sort((a: IBlogItem, b: IBlogItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBlogs(sortedBlogs);
    };

    fetchBlogs();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const truncateContent = (content: string, length: number) => {
    const textContent = htmlToText(content, { wordwrap: false });
    return textContent.length > length ? textContent.slice(0, length) + '...' : textContent;
  };

  const handleCategoryClick = (category: string | null) => {
    setSelectedCategory(category);
  };

  const handleBlogClick = (title: string) => {
    const slug = slugify(title);
    router.push(`/blog/${slug}`);
  };

  const canonicalUrl = 'https://omegle-mu.vercel.app/blog';

  return (
    <>
      <Head>
        <title>Blog - Omegle : Talk to Strangers!</title>
        <meta name="description" content="Omegle is a great place to meet new friends. When you use Omegle, we pick another user at random and let you have a one-on-one chat with each other." />
        <meta name="keywords" content="Omegle, chat, meet new people, secure chat, online friends" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />

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
        {jsonLdBreadcrumb && (
          <script
            id='jsonLdBreadcrumbId'
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
          />
        )}

        {/* Blog sayfası için SEO bilgileri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              "blogPost": blogs.map((blog) => ({
                "@type": "BlogPosting",
                "headline": blog.title,
                "image": blog.image,
                "author": {
                  "@type": "Person",
                  "name": blog.author,
                },
                "datePublished": new Date(blog.createdAt).toISOString(),
                "description": truncateContent(blog.content, 160),
              })),
            }),
          }}
        />
      </Head>

      <div className="min-h-screen">
      
        <div>
          <Image src='/blog6.webp' alt='foto' width={1800} height={900} className="mb-4 w-full h-200 opacity-65" />
        </div>

        <div className='ml-8 mt-4'>
          <Breadcrumb />
        </div>

        <main className="max-w-4xl mx-auto mb-4">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-12 mt-8 text-white text-center">Omegle Online Video Chat</h1>

            <div className='uppercase flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8 px-3 md:px-10'>
              {categories.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleCategoryClick(item.name)}
                  className={`text-center text-lg font-bold cursor-pointer ${selectedCategory === item.name ? 'text-gray-600' : 'text-white hover:text-gray-600'}`}
                >
                  {item.name}
                </div>
              ))}
              <div
                onClick={() => handleCategoryClick(null)}
                className={`text-center text-lg font-bold cursor-pointer ${selectedCategory === null ? 'text-gray-600' : 'text-white hover:text-gray-600'}`}
              >
                ALL BLOGS
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {blogs.map((item) => {
                return (
                  <div
                    key={item._id}
                    onClick={() => handleBlogClick(item.title)}
                    className="bg-white rounded-lg shadow-lg p-6 transition ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-gray-200 duration-300 cursor-pointer"
                  >
                    <Image
                      src={item.image}
                      alt='foto'
                      width={250}
                      height={250}
                      className="mb-4 rounded border mx-auto"
                    />
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center capitalize">{item.title}</h2>
                    <p className="text-gray-600 text-justify">
                      {truncateContent(item.content, 50)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Blog;
