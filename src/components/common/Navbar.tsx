import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Summit Management</Link>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <>
              {isAdmin ? (
                <>
                  <Link to="/admin/dashboard">Admin Dashboard</Link>
                  <Link to="/admin/users">Users</Link>
                  <Link to="/admin/summits">Summits</Link>
                  <Link to="/admin/reports">Reports</Link>
                  <Link to="/admin/qr-scan">QR Scan</Link>
                </>
              ) : (
                <>
                  <Link to="/user/dashboard">Dashboard</Link>
                  <Link to="/user/profile">Profile</Link>
                  <Link to="/user/summit/2025">Summit</Link>
                  <Link to="/user/idcard">ID Card</Link>
                </>
              )}
              <button onClick={handleLogout} className="hover:underline">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;