import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-4">The page you're looking for doesn't exist.</p>
        <Link to="/" className="text-blue-500 underline">Go to Home</Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default NotFound;