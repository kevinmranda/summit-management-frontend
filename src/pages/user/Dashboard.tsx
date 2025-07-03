import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { CalendarDays, Badge, UserCircle2 } from "lucide-react";

const UserDashboard = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Navbar />

      <main className="flex-grow px-4 py-10 container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-secondary-900">
          Welcome to Your Dashboard
        </h1>

        {isAuthenticated && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/user/profile"
              className="bg-white hover:shadow-medium transition-all border border-secondary-200 rounded-2xl p-8 text-center shadow-soft hover:-translate-y-1 group"
            >
              <UserCircle2
                className="mx-auto mb-4 text-primary-600 group-hover:text-primary-700 transition-colors"
                size={48}
              />
              <h2 className="text-xl font-semibold mb-2 text-secondary-900">Profile</h2>
              <p className="text-secondary-600">Manage your personal information</p>
            </Link>

            <Link
              to="/user/summit/2025"
              className="bg-white hover:shadow-medium transition-all border border-secondary-200 rounded-2xl p-8 text-center shadow-soft hover:-translate-y-1 group"
            >
              <CalendarDays
                className="mx-auto mb-4 text-accent-600 group-hover:text-accent-700 transition-colors"
                size={48}
              />
              <h2 className="text-xl font-semibold mb-2 text-secondary-900">Summit</h2>
              <p className="text-secondary-600">
                Explore this year’s summit sessions
              </p>
            </Link>

            <Link
              to="/user/idcard"
              className="bg-white hover:shadow-medium transition-all border border-secondary-200 rounded-2xl p-8 text-center shadow-soft hover:-translate-y-1 group"
            >
              <Badge className="mx-auto mb-4 text-primary-600 group-hover:text-primary-700 transition-colors" size={48} />
              <h2 className="text-xl font-semibold mb-2 text-secondary-900">ID Card</h2>
              <p className="text-secondary-600">Download your digital summit ID</p>
            </Link>
          </div>
        )}

        {/* Optional future enhancements */}
        {/* <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-xl p-6">Upcoming events, news, or notices</div>
          <div className="bg-white/10 rounded-xl p-6">User stats or registration progress</div>
        </section> */}
      </main>

      <Footer />
    </div>
  );
};

export default UserDashboard;
