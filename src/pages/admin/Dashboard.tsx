import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
    <Navbar />
    <main className="flex-grow container mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-center text-secondary-900 mb-10">
        🛠 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
          {
            title: 'Manage Users',
            description: 'View and edit user accounts',
            to: '/admin/users',
          },
          {
            title: 'Manage Summits',
            description: 'Create and update summits',
            to: '/admin/summits',
          },
          {
            title: 'Reports',
            description: 'View payment reports',
            to: '/admin/reports',
          },
          {
            title: 'QR Scan',
            description: 'Scan ID card QR codes',
            to: '/admin/qr-scan',
          },
        ].map(({ title, description, to }) => (
          <Link
            key={title}
            to={to}
            className="block p-8 bg-white text-secondary-900 rounded-2xl shadow-soft hover:shadow-medium hover:-translate-y-1 transition-all duration-300 ease-in-out border border-secondary-200 group"
          >
            <h2 className="text-2xl font-bold mb-2 group-hover:text-primary-600 transition-colors">{title}</h2>
            <p className="text-secondary-600">{description}</p>
          </Link>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default AdminDashboard;
