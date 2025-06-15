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
    <nav className="w-full px-6 py-4 bg-white/10 backdrop-blur-md shadow-lg rounded-b-xl border-b border-white/20">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-extrabold text-white drop-shadow-sm hover:text-cyan-300 transition-colors"
        >
          Summit Management
        </Link>

        <div className="flex gap-4 items-center text-white text-sm font-medium">
          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="hover:text-cyan-300 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:text-cyan-300 transition-colors"
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
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/admin/users"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Users
                  </Link>
                  <Link
                    to="/admin/summits"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Summits
                  </Link>
                  <Link
                    to="/admin/reports"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Reports
                  </Link>
                  <Link
                    to="/admin/qr-scan"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    QR Scan
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/user/dashboard"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/user/profile"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/user/summit/2025"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    Summit
                  </Link>
                  <Link
                    to="/user/idcard"
                    className="hover:text-cyan-300 transition-colors"
                  >
                    ID Card
                  </Link>
                </>
              )}
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-200 rounded-lg transition-colors"
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
