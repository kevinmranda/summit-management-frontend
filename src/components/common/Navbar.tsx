import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="w-full px-6 py-4 bg-white/95 backdrop-blur-md shadow-soft border-b border-secondary-200">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-primary-700 hover:text-primary-800 transition-colors"
        >
          Summit Management
        </Link>

        <div className="flex gap-6 items-center text-secondary-700 text-sm font-medium">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-all hover:shadow-medium"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {isAdmin ? (
                <>
                  <Link
                    to="/admin/dashboard"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/users"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/summits"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    Summits
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    Reports
                  </Link>
                  <Link
                    to="/admin/qr-scan"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    QR Scan
                  </Link>
                  <Link
                    to="/meals/scan"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    Meal Scan
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/user/dashboard"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/user/profile"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/user/summit/2025"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    Summit
                  </Link>
                  <Link
                    to="/user/idcard"
                    className="hover:text-primary-600 transition-colors px-3 py-2 rounded-lg hover:bg-primary-50"
                  >
                    ID Card
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-all hover:shadow-soft border border-red-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
