"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import AdminNavbar from '../../components/navbar/AdminNavbar'
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2'
import { htmlToText } from 'html-to-text'
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const CommunityList = () => {
interface ICommunityGuidelines {
    _id: string;
    description:string;
    text:string;
    author:string
  }

  const [communityGuidelines, setCommunityGuidelines] = useState<ICommunityGuidelines[]>([]);

  const [formData, setFormData] = useState({
    description: '',
    text: '',
    author: '',
   
  });

  const [isEditing, setIsEditing] = useState<ICommunityGuidelines | null>(null);
  const router = useRouter();


  useEffect(() => {
    const fetchCommunityGuidelines = async () => {
      const res = await fetch('/api/communityguidelines');
      const data = await res.json();

      setCommunityGuidelines(data);
    };

    fetchCommunityGuidelines();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContentChange = (value: string) => {
    setFormData({ ...formData, text: value });
  };
  const handleEditClick = (category: ICommunityGuidelines) => {
    setIsEditing(category);
    setFormData({ text: category.text , description: category.description, author: category.author });
  };

  const handleDeleteClick = async (communityGuidelinesId: string) => {
    await fetch(`/api/communityguidelines/${communityGuidelinesId}`, { method: 'DELETE' });
    setCommunityGuidelines(communityGuidelines.filter(category => category._id !== communityGuidelinesId));
  };



  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditing) {
      const res = await fetch(`/api/communityguidelines/${isEditing._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, communityGuidelinesId: isEditing._id }),

      });
      const updatedPrivacyPolicy = await res.json();
      setCommunityGuidelines(communityGuidelines.map(category => (category._id === updatedPrivacyPolicy._id ? updatedPrivacyPolicy : category)));

      console.log(updatedPrivacyPolicy)
      setIsEditing(null);
    }
  };












  const truncateContent = (content: string, length: number) => {
    const textContent = htmlToText(content, { wordwrap: false });
    return textContent.length > length ? textContent.slice(0, length) + '...' : textContent;  };


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
        <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Community Guidelines List</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Description</th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Author</th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Text</th>
                  <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {communityGuidelines.map(item => (
                  <tr key={item._id}>
                    <td className="py-2 px-4 border-b border-gray-200">{item.description}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{item.author}</td>
                    <td className="py-2 px-4 border-b border-gray-200">{truncateContent(item.text, 50)}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      <button
                        onClick={() => handleEditClick(item)}

                        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(item._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isEditing && (
            <form onSubmit={handleSubmit} className="w-full mt-8">
              <h3 className="text-lg font-bold mb-4">Edit User</h3>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div className="mb-4 pb-12">
                  <label htmlFor="text" className="block text-gray-700 font-bold mb-2">Content</label>
                  <ReactQuill
                    value={formData.text}
                    onChange={handleContentChange}
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
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg ">Update Privacy Policy Content</button>
              <button
                type="button"
                onClick={() => setIsEditing(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg ml-2"
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  </div>
  )
}

export default CommunityList
