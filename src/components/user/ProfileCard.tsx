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
  <div className="bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">{user.full_name}</h2>
    <p><strong>Email:</strong> {user.email}</p>
    <p><strong>University:</strong> {user.university}</p>
    <p><strong>Conference:</strong> {user.conference}</p>
    <p><strong>Zone:</strong> {user.zone}</p>
    <p><strong>Branch:</strong> {user.branch}</p>
  </div>
);

export default ProfileCard;