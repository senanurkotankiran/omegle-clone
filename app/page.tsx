"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "./components/breadcrumb/Breadcrumb";
import TestimonialsCarousel from "./components/home/TestimonialCarousel";
import Last4Blog from "./components/home/Last4Blog";
import Faqs from "./components/home/Faqs";
import Agreement from "./components/home/Agreement";
import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import Navbar2 from "./components/navbar2/Navbar2";
import Footer from "./components/footer/page";
import { useRouter } from "next/navigation";

interface IFaqItem {
  question: string;
  answer: string;
  blogId?: string;
}

const Home = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/ftf');
  };

  const [headings, setHeadings] = useState<{ id: string; text: string }[]>([]);
  const [faqs, setFaqs] = useState<IFaqItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const headingElements = Array.from(document.querySelectorAll('h1, h2, h3'));
      const headingTexts = headingElements.map((heading, index) => {
        const id = `heading-${index}`;
        heading.id = id;
        return { id, text: heading.textContent || '' };
      });
      setHeadings(headingTexts);// Tarayıcıya özgü kod
    }

  }, []);

  const handleAnchorClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      const filteredFaqs = data.filter((faq: IFaqItem) => !faq.blogId);
      setFaqs(filteredFaqs);
    };

    fetchFaqs();
  }, []);

  const faqJsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: IFaqItem) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  });

  console.log(faqJsonLd)

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
    "url": "https://omegle-mu.vercel.app",
  };

  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://omegle-mu.vercel.app",
      },
    ],
  };

  return (
    <>
      <script
        id="jsonLdWebSiteId"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        id="jsonLdOrganizationId"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        id="jsonLdWebPageId"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebPage) }}
      />
      {jsonLdBreadcrumb && (
        <script
          id="jsonLdBreadcrumbId"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
        />
      )}
      {faqJsonLd && (
        <script
          id="jsonLdFaqsId"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      )}

      <div className="pt-4">
        <div className="fixed top-0 z-10">
          <Navbar />
        </div>
        <div className="mt-14 md:mt-16">
          <Navbar2 />
        </div>
      </div>
      <div className="ml-8 mt-4">
        <Breadcrumb />
      </div>
      <div className="flex flex-col items-center justify-center">
        <section id="agreement" className="pt-20">
          <Agreement />
        </section>
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

                    className="text-white hover:text-blue-600 transition duration-300">
                    {content.text}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <section id="introduction" className="pt-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-8 text-white text-center">
            Omegle Online Video Chat
          </h1>
          <div className="w-full mx-auto mb-8 md:mb-16">
            <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg">
              <div className="flex flex-col md:flex-row justify-center items-center mx-auto max-w-3/4 p-4 md:p-8">
                <p className="text-white text-justify md:w-3/4 mb-4 md:mb-0 text-sm md:text-base">
                  Omegle is a global platform where users can anonymously communicate with random individuals via video or text chat. This platform offers the opportunity to encounter people from different cultures and establish new friendships. Users can practice languages, enhance their social skills, and engage in exchanges of views from diverse perspectives worldwide. Omegle anonymity allows users to communicate more freely and openly, while the platform prioritizes security and privacy. It safeguards users personal information and provides a mechanism to report inappropriate behavior. In conclusion, Omegle is an ideal communication platform for those looking to have fun and gain a global perspective.
                </p>
                <div className="hidden md:block w-1/4 md:w-1/3 p-4 md:p-8">
                  <Image src="/home2.webp" alt="blog" width={602} height={706} />
                </div>
                <div className="md:hidden w-full p-4 md:p-8">
                  <Image src="/home2.webp" alt="blog" width={602} height={706} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="last4blog" className="pt-20 max-w-screen-lg w-full mx-auto mb-8 md:mb-16">
          <h1 className="mb-16 flex justify-center text-3xl font-bold text-white">Recent Blogs</h1>
          <Last4Blog />
        </section>
        <section id="faqs" className="pt-20 max-w-screen-lg w-full mx-auto mb-8 md:mb-16">
          <Faqs />
        </section>
        <section id="testimonials" className="pt-20 max-w-screen-lg w-full mx-auto mb-8 md:mb-16">
          <h1 className="mt-16 flex justify-center text-3xl font-bold text-white">References</h1>
          <TestimonialsCarousel />
        </section>
        <div className="w-full">
          <div className="bg-white bg-opacity-50 rounded-lg shadow-lg p-8">
            <h2 className="text-xl md:text-2xl font-extrabold mb-4 text-center">Connect Globally, Talk to Strangers Right Now!</h2>
            <div className="p-2 flex items-center justify-center">
              <button
                onClick={handleClick}
                className="animate-bounce transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300 flex items-center justify-center border-none bg-gradient-to-r from-indigo-500 via-blue-600 to-pink-500 text-l text-white h-14 md:h-16 w-72 md:w-72 rounded-full"
              >
                Start Chat
              </button>
            </div>
            <p className="text-gray-800 text-center">Make New Friends Make New Friends Make New Friends Make New Friends Make New Friends</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
