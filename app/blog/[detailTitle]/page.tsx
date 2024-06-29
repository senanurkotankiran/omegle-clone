"use client"
import Breadcrumb from '@/app/components/breadcrumb/Breadcrumb';
import Footer from '@/app/components/footer/page';
import Navbar from '@/app/components/navbar/Navbar';
import Navbar2 from '@/app/components/navbar2/Navbar2';
import Image from 'next/image';
import { format } from 'date-fns';
import { useParams, useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';

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

  const [faqs, setFaqs] = useState<IFaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<IBlogItem | null>(null);
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [faqJsonLd, setFaqJsonLd] = useState<string>("");


  const router = useRouter();
  const pathname = usePathname();

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
      const blog = blogs.find((blog) => blog.title.toLowerCase() === decodedTitle.toLowerCase()) || null;
      setSelectedBlog(blog);
    }
  }, [decodedTitle, blogs]);

  useEffect(() => {
    if (selectedBlog) {
      setPageTitle(selectedBlog.title);
    }
  }, [selectedBlog]);

  useEffect(() => {
    if (selectedBlog) {
      const formattedTitle = encodeURIComponent(
        selectedBlog.title.toLowerCase().replace(/ /g, '-').replace(/\./g, '-')
      );
      router.replace(`/blog/${formattedTitle}`);
    }
  }, [selectedBlog, router]);

  useEffect(() => {
    if (selectedBlog) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = selectedBlog.content;

      const headingsFromContent = Array.from(tempDiv.querySelectorAll('h1, h2, h3'));
      headingsFromContent.forEach((heading, index) => {
        const id = `content-heading-${index}`;
        heading.id = id;
      });

      const quillContent = document.querySelector('.quill-content');
      if (quillContent) {
        quillContent.innerHTML = tempDiv.innerHTML;
      }

      const allHeadings = Array.from(document.querySelectorAll('h1, h2, h3'));
      allHeadings.forEach((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`;
        }
      });

      const updatedHeadings = allHeadings.map((heading) => ({
        id: heading.id,
        text: heading.textContent || '',
      }));

      setHeadings(updatedHeadings);
    }
  }, [selectedBlog]);

  const toggleFaq = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 100, // Uygun bir ofset değeri kullanın
        behavior: 'smooth'
      });
    } else {
      console.error(`Element with id ${id} not found.`);
    }
  };


  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      const filteredFaqs = selectedBlog ? data.filter((faq: IFaqItem) => faq.blogId?.title === selectedBlog.title) : [];
      setFaqs(filteredFaqs);

      const generatedFaqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": filteredFaqs.map((faq: IFaqItem) => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer,
          },
        })),
      };
      setFaqJsonLd(JSON.stringify(generatedFaqJsonLd));
    };

    if (selectedBlog) {
      fetchFaqs();
    }
  }, [selectedBlog]);





 const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Omegle",
    "url": "https://omegle-mu.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://omegle-mu.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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
      "https://www.instagram.com/Omegle"
    ]
  };

  const jsonLdWebPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": selectedBlog ? selectedBlog.title : "Omegle: Talk to Strangers",
    "description": selectedBlog ? selectedBlog.content.substring(0, 160) : "Omegle is just a great way to Video Chat with Girls, meet new people and have a fun time omegle people.",
    "url": `https://omegle-mu.vercel.app${pathname}`,
    "breadcrumb": {
      "@id": `https://omegle-mu.vercel.app${pathname}#breadcrumb`
    },
    "inLanguage": "en-US",
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": `[https://omegle-mu.vercel.app${pathname}]`
      }
    ]
  };

  const jsonLdBreadcrumb = selectedBlog ? {
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
        "name": selectedBlog.categoryId.name,
        "item": `https://omegle-mu.vercel.app/category/${selectedBlog.categoryId._id}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": selectedBlog.title,
        "item": `https://omegle-mu.vercel.app/blog/${encodeURIComponent(selectedBlog.title.toLowerCase().replace(/ /g, '-').replace(/\./g, '-'))}`
      }
    ]
  } : null;

  const jsonLdArticle = selectedBlog ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://omegle-mu.vercel.app/blog/${encodeURIComponent(selectedBlog.title.toLowerCase().replace(/ /g, '-').replace(/\./g, '-'))}#article`,
    "isPartOf": {
      "@id": `https://omegle-mu.vercel.app/blog/${encodeURIComponent(selectedBlog.title.toLowerCase().replace(/ /g, '-').replace(/\./g, '-'))}`
    },
    "author": {
      "name": selectedBlog.author,
      "@id": "https://omegle-mu.vercel.app/#/schema/person/1"
    },
    "headline": selectedBlog.title,
    "datePublished": selectedBlog.createdAt,
    "dateModified": selectedBlog.createdAt,
    "mainEntityOfPage": {
      "@id": `https://omegle-mu.vercel.app/blog/${encodeURIComponent(selectedBlog.title.toLowerCase().replace(/ /g, '-').replace(/\./g, '-'))}`
    },
    "wordCount": selectedBlog.content.split(' ').length,
    "publisher": {
      "@id": "https://omegle-mu.vercel.app/#organization"
    },
    "keywords": selectedBlog.title.split(' '),
    "articleSection": [selectedBlog.categoryId.name],
    "inLanguage": "en-US"
  } : null;







  return (
    <>
          <head>
        <title >{selectedBlog ? selectedBlog.title : 'Blog Detail'}</title>
        <meta name="description" content={selectedBlog ? selectedBlog.content.substring(0, 160) : 'Blog details and more'} />
        <meta name="keywords" content={selectedBlog ? selectedBlog.title.split(' ').join(', ') : 'blog, detail, article'} />
        <meta name="robots" content="index, follow" />
          </head>

    
     


      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      {jsonLdBreadcrumb && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      )}
      {jsonLdArticle && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
        />
      )}





      <div className="min-h-screen">
        <div className="pt-4">
          <div className="fixed top-0 w-full z-10">
            <Navbar />
          </div>
          <div className="mt-14 md:mt-16">
            <Navbar2 />
          </div>
        </div>
        <div className="ml-8 mt-4">
          <Breadcrumb title={selectedBlog?.title} category={selectedBlog?.categoryId.name} />
        </div>

        <div className="max-w-4xl mx-auto mb-4 mt-4">
          <div className="w-full opacity-85 max-w-screen-md mb-16 p-4 bg-gradient-to-r from-rose-300 via-pink-600 to-indigo-500 rounded-lg shadow-lg text-white">
            <div className="flex justify-left items-center space-x-4 space-y-4">
              <p className="text-2xl font-bold">Contents</p>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white focus:outline-none hover:text-blue-600 "
              >
                {isOpen ? "[ close ]" : "[ open ]"}
              </button>
            </div>
            {isOpen && (
              <ul className="mt-4 space-y-2">
                {headings.map((content) => (
                  <li key={content.id} className="text-lg">
                    <a href={`#${content.id}`} 
                      onClick={(e) => handleAnchorClick(e, content.id)}
                      className="text-white hover:text-blue-600 transition duration-300 capitalize">
                      {content.text}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="text-left">
            <div className="bg-white rounded-lg shadow-lg p-12 mb-16 flex flex-col items-center">
              {selectedBlog?.image && (
                <Image src={selectedBlog.image} alt={selectedBlog.title} width={500} height={500} className="mb-4" />
              )}
              <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize">{selectedBlog?.title}</h2>
              <span className="text-xs pb-8">{selectedBlog?.categoryId.name} {'>'} {selectedBlog?.title}</span>
              <div className="text-gray-600 text-justify quill-content"></div>
              <span className="w-full items-right text-xs p-8 pb-4 text-gray-700 text-right">
                {selectedBlog?.createdAt && format(new Date(selectedBlog.createdAt), 'MMMM dd, yyyy')}
              </span>
              <span className="w-full items-right text-xs pr-8 text-gray-700 text-right capitalize">
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
        </div>

        <div className="w-full">
          <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
            <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-center">Connect Globally, Talk to Strangers Right Now!</h2>
            <div className="p-2 flex items-center justify-center">
              <button onClick={() => router.push('/ftf')} className="animate-bounce transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center border-none bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-l text-white h-14 md:h-16 w-full md:w-72 rounded-full">
                Start Chat
              </button>
            </div>
            <p className="text-gray-800 text-center">Make New Friends Make New Friends Make New Friends Make New Friends Make New Friends</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default BlogDetail;
