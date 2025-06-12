import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/api';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    university: '',
    conference: '',
    zone: '',
    branch: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(formData);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded shadow">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Input
              label="University"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
            />
            <Input
              label="Conference"
              name="conference"
              value={formData.conference}
              onChange={handleChange}
              required
            />
            <Input
              label="Zone"
              name="zone"
              value={formData.zone}
              onChange={handleChange}
              required
            />
            <Input
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
            />
            <Button type="submit" disabled={loading}>
              {loading ? <LoadingSpinner /> : 'Register'}
            </Button>
          </form>
          <p className="mt-4 text-center">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500">Login</a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;