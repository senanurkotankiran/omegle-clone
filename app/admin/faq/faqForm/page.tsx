"use client"

import React, { useState, useEffect } from 'react';
import AdminNavbar from '@/app/admin/components/navbar/AdminNavbar';
import AdminNavbar2 from '@/app/admin/components/navbar2/AdminNavbar2';
import { IFaq } from '@/models/Faq';

const FaqForm = () => {
  interface IBlogItem {
    _id: string;
    title: string;
  }

  const [faqs, setFaqs] = useState<IFaq[]>([]);
  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    blogId: '', // blogId'yi ekliyoruz
  });

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs');
        if (!res.ok) {
          throw new Error('Blogları alma başarısız oldu');
        }
        const data = await res.json();
        setBlogs(data);
      } catch (error: any) {
        console.error('Blogları alırken hata oluştu:', error);
        setError(error.message);
      }
    };

    fetchBlogs();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // blogId boş ise undefined olarak ayarla
    const submitData = {
      ...formData,
      blogId: formData.blogId || undefined,
    };

    try {
      const response = await fetch('/api/faqs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'FAQ eklenirken bir hata oluştu');
      }

      const newFaq = await response.json();
      setFaqs((prevFaqs) => [...prevFaqs, newFaq]);
      setFormData({ question: '', answer: '', blogId: '' }); // Formu sıfırla
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
            <label className="block mb-2 text-sm">Soru</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Cevap</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm">Blog</label>
            <select
              name="blogId"
              value={formData.blogId}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Blog seçin (opsiyonel)</option>
              {blogs.map((blog) => (
                <option key={blog._id} value={blog._id}>{blog.title}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Kaydet
          </button>
        </form>
      </div>
    </div>
  );
};

export default FaqForm;
