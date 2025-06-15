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
  <div className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
    <h2 className="text-2xl font-bold mb-4 border-b pb-2">👤 {user.full_name}</h2>
    <div className="space-y-2 text-base">
      <p><span className="font-semibold">📧 Email:</span> {user.email}</p>
      <p><span className="font-semibold">🏫 University:</span> {user.university}</p>
      <p><span className="font-semibold">🧭 Conference:</span> {user.conference}</p>
      <p><span className="font-semibold">🌍 Zone:</span> {user.zone}</p>
      <p><span className="font-semibold">🏢 Branch:</span> {user.branch}</p>
    </div>
  </div>
);

export default ProfileCard;
