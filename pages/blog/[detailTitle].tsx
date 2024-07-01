import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { htmlToText } from 'html-to-text';
import Breadcrumb from '../components/breadcrumb/Breadcrumb';

interface IBlogItem {
  _id: string;
  title: string;
  description: string;
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

interface BlogDetailProps {
  blog: IBlogItem | null;
  faqs: IFaqItem[];
}

const BlogDetail = ({ blog, faqs = [] }: BlogDetailProps) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formattedDate, setFormattedDate] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    if (blog) {
      setPageTitle(blog.title);
    }
  }, [blog]);

  useEffect(() => {
    if (blog) {
      if (typeof window !== 'undefined') {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = blog.content;

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
    }
  }, [blog]);

  useEffect(() => {
    if (blog) {
      const formatDate = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
      };
      setFormattedDate(formatDate(blog.createdAt));
    }
  }, [blog]);

  const toggleFaq = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 100,
        behavior: 'smooth',
      });
    } else {
      console.error(`Element with id ${id} not found.`);
    }
  };

  const slugify = (title: string) =>
    title
      .toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '');

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
    "name": blog ? blog.title : "Omegle: Talk to Strangers",
    "description": blog ? blog.content.substring(0, 160) : "Omegle is just a great way to Video Chat with Girls, meet new people and have a fun time omegle people.",
    "url": `https://omegle-mu.vercel.app${router.asPath}`,
    "breadcrumb": {
      "@id": `https://omegle-mu.vercel.app${router.asPath}#breadcrumb`,
    },
    "inLanguage": "en-US",
    "potentialAction": [
      {
        "@type": "ReadAction",
        "target": `[https://omegle-mu.vercel.app${router.asPath}]`,
      },
    ],
  };

  const jsonLdBreadcrumb = blog ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://omegle-mu.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": blog.categoryId.name,
        "item": `https://omegle-mu.vercel.app/category/${blog.categoryId._id}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": `https://omegle-mu.vercel.app/blog/${slugify(blog.title)}`,
      },
    ],
  } : null;

  const jsonLdArticle = blog ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://omegle-mu.vercel.app/blog/${slugify(blog.title)}#article`,
    "isPartOf": {
      "@id": `https://omegle-mu.vercel.app/blog/${slugify(blog.title)}`,
    },
    "author": {
      "name": blog.author,
      "@id": "https://omegle-mu.vercel.app/#/schema/person/1",
    },
    "headline": blog.title,
    "datePublished": blog.createdAt,
    "dateModified": blog.createdAt,
    "mainEntityOfPage": {
      "@id": `https://omegle-mu.vercel.app/blog/${slugify(blog.title)}`,
    },
    "wordCount": blog.content.split(' ').length,
    "publisher": {
      "@id": "https://omegle-mu.vercel.app/#organization",
    },
    "keywords": blog.title.split(' '),
    "articleSection": [blog.categoryId.name],
    "inLanguage": "en-US",
  } : null;

  const jsonLdFaqs = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  } : null;

  const canonicalUrl = blog
    ? `https://omegle-mu.vercel.app/blog/${slugify(blog.title)}`
    : 'https://omegle-mu.vercel.app/blog';

  const descriptionTag = blog ? htmlToText(blog.description, { wordwrap: false }) : 'Blog details and more';

  return (
    <>
      <Head>
        <title>{blog ? blog.title : 'Blog Detail'}</title>
        <meta name="description" content={descriptionTag} />
        <meta name="keywords" content={blog ? blog.title.split(' ').join(', ') : 'blog, detail, article'} />
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
        {jsonLdArticle && (
          <script
            id='jsonLdArticleId'
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
          />
        )}
        {jsonLdFaqs && (
          <script
            id='jsonLdFaqsId'
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaqs) }}
          />
        )}
      </Head>

      <div className="min-h-screen">
       
        <div className="ml-8 mt-4">
          <Breadcrumb title={blog?.title} category={blog?.categoryId.name} />
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
              {blog?.image && (
                <Image src={blog.image} alt={blog.title} width={500} height={500} className="mb-4" />
              )}
              <h2 className="text-xl font-bold text-gray-800 mb-4 capitalize">{blog?.title}</h2>
              <span className="text-xs pb-8">{blog?.categoryId.name} {'>'} {blog?.title}</span>
              <div className="text-gray-600 text-justify quill-content"></div>
              <span className="w-full items-right text-xs p-8 pb-4 text-gray-700 text-right">
                {formattedDate}
              </span>
              <span className="w-full items-right text-xs pr-8 text-gray-700 text-right capitalize">
                {blog?.author}
              </span>
            </div>
          </div>

          <div className="max-w-screen-lg w-full mx-auto mb-8 md:mb-16">
            <div className="mt-12">
              <h2 className="text-3xl flex justify-center font-bold mb-4 text-white">FAQs</h2>
              <div>
                {faqs.length > 0 ? (
                  faqs.map((item) => (
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
                  ))
                ) : (
                  <p className="text-white text-center">No FAQs available.</p>
                )}
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
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { detailTitle } = context.params || {};

  if (!detailTitle) {
    return { notFound: true };
  }

  // Title'ı URL'den çöz ve kısa çizgi ile boşlukları değiştir
  const decodedTitle = decodeURIComponent(detailTitle as string).replace(/-/g, ' ');

  const resBlog = await fetch(`https://omegle-mu.vercel.app/api/blogs?title=${encodeURIComponent(decodedTitle)}`);
  const blogs = await resBlog.json();
  const selectedBlog = blogs.length > 0 ? blogs.find((blog: IBlogItem) => blog.title.toLowerCase() === decodedTitle.toLowerCase()) : null;

  const resFaqs = await fetch('https://omegle-mu.vercel.app/api/faqs');
  const faqsData = await resFaqs.json();
  const filteredFaqs = selectedBlog ? faqsData.filter((faq: IFaqItem) => faq.blogId?.title === selectedBlog.title) : [];

  return {
    props: {
      blog: selectedBlog,
      faqs: filteredFaqs,
    },
  };
};

export default BlogDetail;
