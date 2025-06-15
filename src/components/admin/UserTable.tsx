import type { User } from "../../types/User";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => (
  <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
    <table className="min-w-full bg-white divide-y divide-gray-200">
      <thead className="bg-gray-50 text-gray-700 uppercase text-sm">
        <tr>
          <th className="px-4 py-3 text-left">ID</th>
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-4 py-3 text-left">Email</th>
          <th className="px-4 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        {users.map((user) => (
          <tr
            key={user.id}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            <td className="px-4 py-3">{user.id}</td>
            <td className="px-4 py-3">{user.full_name}</td>
            <td className="px-4 py-3">{user.email}</td>
            <td className="px-4 py-3 whitespace-nowrap">
              <button
                onClick={() => onEdit(user)}
                className="text-blue-600 hover:text-blue-800 mr-4 font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;
