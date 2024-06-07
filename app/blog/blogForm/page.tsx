"use client"
import Breadcrumb from '@/app/components/breadcrumb/Breadcrumb';
import Image from 'next/image';
import React, { useState } from 'react'

const BlogForm = () => {


    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: '',
        image: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value,
        }));
      };
    
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
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
        await fetch('/api/blogs', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });
      setFormData({ title: '', content: '', author: '' ,image:''});
      };
  return (

<div className='mb-8 mt-8 '>
<div className='ml-8 mt-4'>
      <Breadcrumb/>

</div>
<div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Blog Ekle</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Başlık
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Yazar
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            İçerik
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            rows={6}
            required
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
            <Image src={formData.image} alt="Seçilen Resim" className="mt-2 rounded-md" width={250} height={250}  />
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

  )
}

export default BlogForm