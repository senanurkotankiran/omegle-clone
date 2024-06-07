"use client"
import React, { useState } from 'react'

const Faqs = () => {



    const [faqs, setFaqs] = useState([
        {
          question: 'Soru 1?',
          answer: 'Cevap 1. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        },
        {
          question: 'Soru 2?',
          answer: 'Cevap 2. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        },
        {
          question: 'Soru 3?',
          answer: 'Cevap 3. Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
        },
      ]);
    
      // Açık/kapalı durumu kontrol eden state
      const [openIndex, setOpenIndex] = useState<number | null>(null);
    
      // Dropdown'u açan/kapatan fonksiyon
      const toggleFaq = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
      };
    


  return (
    <div className="mt-12">
    <h2 className="text-3xl flex justify-center font-bold mb-4 text-white">FAQs</h2>
    <div >
      {faqs.map((faq, index) => (
        <div key={index} className="py-2">
          <button
            className=" flex items-center justify-between w-full py-2 px-4 text-left bg-white rounded-t-lg shadow-lg focus:outline-none focus:ring focus:ring-black"
            onClick={() => toggleFaq(index)}
          >
            <span className="text-xl font-semibold">{faq.question}</span>
            <svg
              className="w-6 h-6 text-gray-600 transform transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)' }}
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
          {openIndex === index && (
            <div className="flex items-center justify-between  w-full py-2 px-4 text-left font-bold rounded-b-lg shadow-lg ">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>


  )
}

export default Faqs