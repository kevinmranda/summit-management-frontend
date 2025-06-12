import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow container mx-auto p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Summit Management</h1>
        <p className="text-lg mb-6">Join our annual summit and connect with peers!</p>
        <Link to="/register">
          <Button>Register Now</Button>
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

export default Home;