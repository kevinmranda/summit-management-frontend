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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-strong max-w-3xl w-full p-8 text-secondary-900 border border-secondary-200 animate-scale-in">
          <h1 className="text-4xl font-bold mb-8 text-center text-secondary-900">
            👤 Your Profile
          </h1>

          {loading && (
            <div className="flex justify-center py-10">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <p className="text-red-600 font-semibold text-center mb-4">{error}</p>
          )}

          {user && <ProfileCard user={user} />}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
