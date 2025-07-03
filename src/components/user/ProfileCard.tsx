interface User {
  id: number;
  full_name: string;
  email: string;
  university: string;
  conference: string;
  zone: string;
  branch: string;
}

interface ProfileCardProps {
  user: User;
}

const ProfileCard = ({ user }: ProfileCardProps) => (
  <div className="bg-gradient-to-br from-primary-50 to-secondary-50 text-secondary-900 p-8 rounded-2xl shadow-soft max-w-3xl mx-auto border border-secondary-200">
    <h2 className="text-3xl font-bold mb-6 border-b border-secondary-200 pb-4 text-secondary-900">
      👤 {user.full_name}
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-primary-600 font-semibold">📧 Email:</span>
          <span className="text-secondary-800 font-medium">{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-primary-600 font-semibold">🏫 University:</span>
          <span className="text-secondary-800 font-medium">{user.university}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-primary-600 font-semibold">🧭 Conference:</span>
          <span className="text-secondary-800 font-medium">{user.conference}</span>
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-primary-600 font-semibold">🌍 Zone:</span>
          <span className="text-secondary-800 font-medium">{user.zone}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-primary-600 font-semibold">🏢 Branch:</span>
          <span className="text-secondary-800 font-medium">{user.branch}</span>
        </div>
      </div>
    </div>
  </div>
);

export default ProfileCard;
