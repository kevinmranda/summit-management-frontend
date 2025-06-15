import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-950 via-blue-900 to-blue-800 text-white">
    <Navbar />
    <main className="flex-grow container mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-white mb-10">
        🛠 Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
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
            className="block p-6 bg-white text-blue-900 rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-in-out border border-blue-200"
          >
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-sm">{description}</p>
          </Link>
        ))}
      </div>
    </main>
    <Footer />
  </div>
);

export default AdminDashboard;
