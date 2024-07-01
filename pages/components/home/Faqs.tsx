"use client"
import React, { useEffect, useState } from 'react'

const Faqs = () => {
  // SSS öğelerinin yapısını tanımlayan arayüz
  interface IFaqItem {
    _id: string;
    question: string;
    answer: string;
    blogId?: string; // blogId alanı isteğe bağlı
  }

  // SSS öğeleri ve açık olan SSS öğesinin indeksini tutan durumlar
  const [faqs, setFaqs] = useState<IFaqItem[]>([]);
  const [openIndex, setOpenIndex] = useState<string | null>(null);


  // SSS öğelerini API'den çeken ve duruma atan işlev
  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      // blogId alanı olmayan SSS öğelerini filtrele
      const filteredFaqs = data.filter((faq: IFaqItem) => !faq.blogId);
      setFaqs(filteredFaqs);

    
    };

    fetchFaqs();
  }, []);

  // Bir SSS öğesini açıp kapatan işlev
  const toggleFaq = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (

 

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
  );
}

export default Faqs;
