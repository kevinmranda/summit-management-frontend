import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { getProfile } from '../../services/api';
import ProfileCard from '../../components/user/ProfileCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import type { User } from '../../types/User';

const Profile = () => {
  const { data: user, loading, error, execute } = useApi<User>(getProfile);

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Profile</h1>
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}
        {user && <ProfileCard user={user} />}
      </main>
      <Footer />
    </div>
  );
};

export default Profile;