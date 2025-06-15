import { useEffect, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { getUsers, updateUser, deleteUser } from "../../services/api";
import UserTable from "../../components/admin/UserTable";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import type { User } from "../../types/User";

const Users = () => {
  const {
    data: users,
    loading,
    error,
    execute: fetchUsers,
  } = useApi<User[]>(getUsers);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setSuccess("");
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        fetchUsers();
        setSuccess("User deleted successfully");
      } catch (err) {
        alert("Failed to delete user");
      }
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      try {
        await updateUser(editingUser.id, formData);
        setEditingUser(null);
        setSuccess("User updated successfully");
        fetchUsers();
      } catch (err) {
        alert("Failed to update user");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-950 via-blue-900 to-blue-800 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          👥 Manage Users
        </h1>

        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          {loading && <LoadingSpinner />}

          {error && (
            <p className="bg-red-100 text-red-800 px-4 py-2 rounded shadow text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-100 text-green-800 px-4 py-2 rounded shadow text-center">
              {success}
            </p>
          )}

          {users && (
            <div className="bg-white rounded-2xl p-6 shadow-lg text-blue-900">
              <UserTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}

          {editingUser && (
            <form
              onSubmit={handleUpdate}
              className="bg-white rounded-2xl p-6 shadow-lg text-blue-900"
            >
              <h2 className="text-2xl font-bold mb-4">✏️ Edit User</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  name="full_name"
                  value={formData.full_name || ""}
                  onChange={handleChange}
                />
                <Input
                  label="Email"
                  name="email"
                  value={formData.email || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-6 flex gap-4">
                <Button type="submit">Update</Button>
                <Button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-600"
                  onClick={() => setEditingUser(null)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Users;
