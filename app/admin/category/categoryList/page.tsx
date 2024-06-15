"use client"
import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2';
import { useRouter } from 'next/navigation';



const CategoryList = () => {
  interface ICategoryItem {
    _id: string;
    name: string;

  }

  const [categories, setCategories] = useState<ICategoryItem[]>([])
  const [editingCategory, setEditingCategory] = useState<ICategoryItem | null>(null);
  const [formData, setFormData] = useState({ name: '' });

  const router = useRouter()


  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    };

    fetchCards();
  }, []);



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (category: ICategoryItem) => {
    setEditingCategory(category);
    setFormData({ name: category.name });
  };

  const handleDeleteClick = async (categoryId: string) => {
    await fetch(`/api/categories/${categoryId}`, { method: 'DELETE' });
    setCategories(categories.filter(category => category._id !== categoryId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingCategory) {
      const res = await fetch(`/api/categories/${editingCategory._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const updatedCategory = await res.json();
      setCategories(categories.map(category => (category._id === updatedCategory._id ? updatedCategory : category)));
      setEditingCategory(null);
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
            <h2 className="text-xl font-bold text-gray-800 mb-4">User List</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Name</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map(item => (
                    <tr key={item._id}>
                      <td className="py-2 px-4 border-b border-gray-200">{item.name}</td>
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

            {editingCategory && (
              <form onSubmit={handleSubmit} className="w-full mt-8">
                <h3 className="text-lg font-bold mb-4">Edit User</h3>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update Category</button>
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
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

export default CategoryList;
