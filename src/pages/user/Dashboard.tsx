import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const UserDashboard = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
        {isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/user/profile" className="p-4 bg-white rounded shadow hover:bg-gray-100">
              <h2 className="text-xl font-semibold">Profile</h2>
              <p>View your profile details</p>
            </Link>
            <Link to="/user/summit/2025" className="p-4 bg-white rounded shadow hover:bg-gray-100">
              <h2 className="text-xl font-semibold">Summit</h2>
              <p>Check summit details</p>
            </Link>
            <Link to="/user/idcard" className="p-4 bg-white rounded shadow hover:bg-gray-100">
              <h2 className="text-xl font-semibold">ID Card</h2>
              <p>Generate your ID card</p>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;