"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

// React-Quill'i dinamik olarak yüklemek
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const PrivacyForm = () => {
  interface IPrivacyPolicy {
    _id: string;
    description:string;
    text:string;
    author:string
  }

  const [privacyPolicies, setPrivacyPolicies] = useState<IPrivacyPolicy[]>([]);

  const [formData, setFormData] = useState({
    description: '',
    text: '',
    author: '',
   
  });


  useEffect(() => {
    const fetchPrivacyPolicies = async () => {
      const res = await fetch('/api/privacypolicy', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setPrivacyPolicies(data);
    };

    fetchPrivacyPolicies();
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
      text: value,
    }));
  };

 


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch('/api/privacypolicy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setFormData({ description: '', text: '', author: '' });
  };

  return (
    <div className="pt-4 mb-4">
      <AdminNavbar />
      <div className="mt-14 md:mt-16">
        <AdminNavbar2 />
      </div>
      <div className="max-w-lg mx-auto bg-white p-8 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy Ekle</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label htmlFor="text" className="block text-sm font-medium">
              İçerik
            </label>
            <ReactQuill
                    value={formData.text}
                    onChange={handleQuillChange}
                    className="w-full h-64"
                    theme="snow"
                    modules={{
                      toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image'],
                        [{ 'align': [] }],
                      ]
                    }}
                  />
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full mt-16 bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Gönder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PrivacyForm;
