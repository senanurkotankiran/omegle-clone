"use client"

import React, { useState, useEffect } from 'react';
import AdminNavbar from '@/app/admin/components/navbar/AdminNavbar';
import AdminNavbar2 from '@/app/admin/components/navbar2/AdminNavbar2';
import { IFaq } from '@/models/Faq';

const FaqForm = () => {
  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/faqs');
        if (!res.ok) {
          throw new Error('Verileri alma başarısız oldu');
        }
        const data = await res.json();
        setFaqs(data);
      } catch (error: any) {
        console.error('Verileri alırken hata oluştu:', error);
        setError(error.message);
      }
    };

    fetchFaqs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'FAQ eklenirken bir hata oluştu');
      }

      const newFaq = await response.json();
      setFaqs((prevFaqs) => [...prevFaqs, newFaq]);
      setFormData({ question: '', answer: '' });
    } catch (error: any) {
      setError(error.message || 'Bir hata oluştu');
    }
  };

  return (
    <div>
      <div className="pt-4 mb-4">
        <div className="fixed top-0 w-full z-10">
          <AdminNavbar />
        </div>
        <div className="mt-14 md:mt-16">
          <AdminNavbar2 />
        </div>
      </div>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md mt-28 md:mt-32">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded-lg">
          <h1 className="text-2xl mb-8 font-bold">FAQ Form</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <label className="block mb-2 text-sm">Question</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Answer</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default FaqForm;
