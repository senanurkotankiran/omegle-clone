"use client";
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const BlogDetail = () => {
  const params = useParams();
  const router = useRouter();
  const detailId = params?.detailId;

  interface IBlogItem {
    _id: string;
    title: string;
    description: string;
    content: string;
    author: string;
    image: string;
    categoryId: string;
  }

  interface ICategoryItem {
    _id: string;
    name: string;
  }

  const [blogs, setBlogs] = useState<IBlogItem[]>([]);
  const [categories, setCategories] = useState<ICategoryItem[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<IBlogItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ title: '', description: '', content: '', image: '', categoryId: '' });

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    };

    fetchBlogs();
  }, []);

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

  useEffect(() => {
    if (blogs.length > 0) {
      const blog = blogs.find((blog) => blog._id === detailId) || null;
      setSelectedBlog(blog);
      if (blog) {
        setFormData({
          title: blog.title,
          description: blog.description,
          content: blog.content,
          image: blog.image,
          categoryId: blog.categoryId,
        });
      }
    }
  }, [detailId, blogs]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value: string) => {
    setFormData({ ...formData, content: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`/api/blogs/${detailId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const updatedBlog = await res.json();
    setSelectedBlog(updatedBlog);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      // Blogu ve ilgili FAQ'ları sil
      await fetch(`/api/blogs/${detailId}`, {
        method: 'DELETE',
      });
  
      // Silme işlemi sonrası yönlendirme
      router.push('/admin/blog/blogList'); // Silme işleminden sonra blog listesine yönlendir
    } catch (error) {
      console.error("Error deleting blog or FAQs:", error);
    }
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

  return (
    <div className="min-h-screen">
      <div className="pt-4">
        <div className="fixed top-0 w-full z-10">
          <AdminNavbar />
        </div>
        <div className="mt-14 md:mt-16">
          <AdminNavbar2 />
        </div>
      </div>

      <main className="max-w-4xl mx-auto mb-4 mt-4">
        <div className="text-left">
          <div className="bg-white rounded-lg shadow-lg p-12 mb-16 flex flex-col items-center">
            {selectedBlog?.image && (
              <Image src={selectedBlog.image} alt={selectedBlog.title} width={500} height={500}  className="mb-4" />
            )}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="w-full">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Başlık</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
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
                <div className="mb-4">
                  <label htmlFor="content" className="block text-gray-700 font-bold mb-2">İçerik</label>
                  <ReactQuill
                    value={formData.content}
                    onChange={handleContentChange}
                    className="w-full h-64"
                    theme="snow"
                    modules={{
                      toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image'],
                        [{ 'align': [] }],
                      ]
                    }}
                  />
                </div>
                <div className="mb-4 pt-8">
                  <label htmlFor="categoryId" className="block text-gray-700 font-bold mb-2">Kategori</label>
                  <select
                    id="categoryId"
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="border p-2 w-full rounded-t-md text-gray-500 sm:text-sm"
                  >
                    <option value="" className="text-gray-800">Kategori Seç</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id} className="text-gray-800">
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">Resim</label>
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-1 p-3 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  />
                  {formData.image && (
                    <Image src={formData.image} alt="Seçilen Resim" className="mt-2 rounded-md" width={250} height={250} />
                  )}
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Blogu Güncelle
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
                >
                  İptal
                </button>
              </form>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-4">{selectedBlog?.title}</h2>
                <div className="text-gray-600 text-justify" dangerouslySetInnerHTML={{ __html: selectedBlog?.content || '' }}></div>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Blogu Düzenle
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Blogu Sil
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlogDetail;
