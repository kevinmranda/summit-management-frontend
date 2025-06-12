import type { User } from '../../types/User';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Email</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td className="p-2 border">{user.id}</td>
            <td className="p-2 border">{user.full_name}</td>
            <td className="p-2 border">{user.email}</td>
            <td className="p-2 border">
              <button
                onClick={() => onEdit(user)}
                className="text-blue-500 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(user.id)}
                className="text-red-500"
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