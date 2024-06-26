"use client"
import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2';
import { useRouter } from 'next/navigation';

const TestimonialList = () => {
  interface ITestimonialItem {
    _id: string;
    text: string;
    author: string;
  }

  const [testimonials, setTestimonials] = useState<ITestimonialItem[]>([]);
  const [editingTestimonial, setEditingTestimonial] = useState<ITestimonialItem | null>(null);
  const [formData, setFormData] = useState({ text: '', author: '' });

  const router = useRouter();

  useEffect(() => {
    const fetcTestimonials = async () => {
      const res = await fetch('/api/testimonials');
      const data = await res.json();
      setTestimonials(data);
    };

    fetcTestimonials();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (testimonial: ITestimonialItem) => {
    setEditingTestimonial(testimonial);
    setFormData({ text: testimonial.text, author: testimonial.author });
  };

  const handleDeleteClick = async (testimonialId: string) => {
    await fetch(`/api/testimonials/${testimonialId}`, { method: 'DELETE' });
    setTestimonials(testimonials.filter(testimonial => testimonial._id !== testimonialId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingTestimonial) {
      const res = await fetch(`/api/testimonials/${editingTestimonial._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, testimonialId: editingTestimonial._id }),
      });
      const updatedTestimonial = await res.json();
      setTestimonials(testimonials.map(testimonial => (testimonial._id === updatedTestimonial._id ? updatedTestimonial : testimonial)));
      setEditingTestimonial(null);
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
          <div className="bg-white rounded-lg shadow-lg p-12 mb-16">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Reference List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Test</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Author</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {testimonials.map(item => (
                    <tr key={item._id}>
                      <td className="py-2 px-4 border-b border-gray-200">{item.text}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{item.author}</td>
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

            {editingTestimonial && (
              <form onSubmit={handleSubmit} className="w-full mt-8">
                <h3 className="text-lg font-bold mb-4">Edit Testimonial</h3>
                <div className="mb-4">
                  <label htmlFor="text" className="block text-gray-700 font-bold mb-2">Text</label>
                  <input
                    type="text"
                    id="text"
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="author" className="block text-gray-700 font-bold mb-2">Author</label>
                  <textarea
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Testimonial</button>
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
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
  );
};

export default TestimonialList;
