"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogForm = () => {
  interface ICategoryItem {
    _id: string;
    name: string;
  }

  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    author: '',
    image: '',
    categoryId: '',
    question: '',
    answer: '',
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleQuillChange = (value: string) => {
    setFormData(prevState => ({
      ...prevState,
      content: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prevState => ({
        ...prevState,
        image: reader.result as string,
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Reset error state before submission
    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error);
      }
  
      setFormData({
        title: '',
        description: '',
        content: '',
        author: '',
        image: '',
        categoryId: '',
        question: '',
        answer: '',
      });
    } catch (error : any) {
      setError(error.message);
    }
  };
  
  return (
    <div className="pt-4 mb-4">
      <AdminNavbar />
      <div className="mt-14 md:mt-16">
        <AdminNavbar2 />
      </div>
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Blog Ekle</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium">
              Başlık
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Açıklama
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-medium">
              Yazar
            </label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="categoryId" className="block text-sm font-medium">
              Kategori
            </label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleSelectChange}
              className="border p-2 w-full rounded-t-md text-gray-500 sm:text-sm"
            >
              <option value="" className="text-gray-800">
                Kategori Seç
              </option>
              {categories.map(category => (
                <option key={category._id} value={category._id} className="text-gray-800">
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium">
              İçerik
            </label>
            <ReactQuill
              value={formData.content}
              onChange={handleQuillChange}
              className="mt-1 block w-full border border-gray-300 rounded-md"
              theme="snow"
              modules={{
                toolbar: [
                  [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['bold', 'italic', 'underline'],
                  ['link', 'image'],
                  [{ 'align': [] }],
                ],
              }}
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Resim
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
            {formData.image && (
              <Image src={formData.image} alt="Seçilen Resim" className="mt-2 rounded-md" width={1000} height={200} />
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
