import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/users" className="p-4 bg-white rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">Manage Users</h2>
          <p>View and edit user accounts</p>
        </Link>
        <Link to="/admin/summits" className="p-4 bg-white rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">Manage Summits</h2>
          <p>Create and update summits</p>
        </Link>
        <Link to="/admin/reports" className="p-4 bg-white rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">Reports</h2>
          <p>View payment reports</p>
        </Link>
        <Link to="/admin/qr-scan" className="p-4 bg-white rounded shadow hover:bg-gray-100">
          <h2 className="text-xl font-semibold">QR Scan</h2>
          <p>Scan ID card QR codes</p>
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default AdminDashboard;