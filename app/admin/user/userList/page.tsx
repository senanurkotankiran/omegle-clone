"use client"
import { useEffect, useState } from 'react';
import AdminNavbar from '../../components/navbar/AdminNavbar';
import AdminNavbar2 from '../../components/navbar2/AdminNavbar2';

interface IUser {
  _id: string;
  name: string;
  email: string;
}

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '' });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/users');
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (user: IUser) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email });
  };

  const handleDeleteClick = async (userId: string) => {
    await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    setUsers(users.filter(user => user._id !== userId));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingUser) {
      const res = await fetch(`/api/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const updatedUser = await res.json();
      setUsers(users.map(user => (user._id === updatedUser._id ? updatedUser : user)));
      setEditingUser(null);
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
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Email</th>
                    <th className="py-2 px-4 border-b border-gray-200 bg-gray-100">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                      <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                      <td className="py-2 px-4 border-b border-gray-200">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user._id)}
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

            {editingUser && (
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
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Update User</button>
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
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

export default UserList;
