import { useEffect, useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { getUsers, updateUser, deleteUser } from '../../services/api';
import UserTable from '../../components/admin/UserTable';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import type { User } from '../../types/User';

const Users = () => {
  const { data: users, loading, error, execute: fetchUsers } = useApi<User[]>(getUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData(user);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        fetchUsers();
      } catch (err) {
        alert('Failed to delete user');
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      try {
        await updateUser(editingUser.id, formData);
        setEditingUser(null);
        fetchUsers();
      } catch (err) {
        alert('Failed to update user');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}
        {users && <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />}
        {editingUser && (
          <form onSubmit={handleUpdate} className="mt-6 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <Input
              label="Full Name"
              name="full_name"
              value={formData.full_name || ''}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
            <Button type="submit">Update</Button>
            <Button
              type="button"
              className="ml-2 bg-gray-500"
              onClick={() => setEditingUser(null)}
            >
              Cancel
            </Button>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Users;