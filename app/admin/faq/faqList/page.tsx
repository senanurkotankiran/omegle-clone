"use client"
import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2';
import { useRouter } from 'next/navigation';

const FaqList = () => {
  interface IFaqItem {
    _id: string;
    question: string;
    answer: string;
  }

  const [faqs, setFaqs] = useState<IFaqItem[]>([]);
  const [editingFaq, setEditingFaq] = useState<IFaqItem | null>(null);
  const [formData, setFormData] = useState({ question: '', answer: '' });

  const router = useRouter();

  useEffect(() => {
    const fetchFaqs = async () => {
      const res = await fetch('/api/faqs');
      const data = await res.json();
      setFaqs(data);
    };

    fetchFaqs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (faq: IFaqItem) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer });
  };

  const handleDeleteClick = async (faqId: string) => {
    await fetch(`/api/faqs/${faqId}`, { method: 'DELETE' });
    setFaqs(faqs.filter(faq => faq._id !== faqId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingFaq) {
      const res = await fetch(`/api/faqs/${editingFaq._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, faqId: editingFaq._id }),
      });
      const updatedFaq = await res.json();
      setFaqs(faqs.map(faq => (faq._id === updatedFaq._id ? updatedFaq : faq)));
      setEditingFaq(null);
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">FAQ List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Question</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Answer</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {faqs.map(item => (
                    <tr key={item._id}>
                      <td className="py-2 px-4 border-b border-gray-200">{item.question}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{item.answer}</td>
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

            {editingFaq && (
              <form onSubmit={handleSubmit} className="w-full mt-8">
                <h3 className="text-lg font-bold mb-4">Edit FAQ</h3>
                <div className="mb-4">
                  <label htmlFor="question" className="block text-gray-700 font-bold mb-2">Question</label>
                  <input
                    type="text"
                    id="question"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="answer" className="block text-gray-700 font-bold mb-2">Answer</label>
                  <textarea
                    id="answer"
                    name="answer"
                    value={formData.answer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update FAQ</button>
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
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

export default FaqList;
