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

  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#141e30] to-[#243b55] text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-2xl font-bold text-center mb-6">
            {step === 1 ? 'Basic Info' : 'TUCASA Info'}
          </h2>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-300 px-4 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <>
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
              <div className="mt-6 flex justify-end">
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              </div>
            </>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit}>
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
              <div className="mt-6 flex justify-between">
                <Button type="button" onClick={prevStep} className="bg-gray-600 hover:bg-gray-700">
                  Back
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? <LoadingSpinner /> : 'Register'}
                </Button>
              </div>
            </form>
          )}

          <p className="mt-6 text-center text-white/70">
            Already have an account?{' '}
            <a href="/login" className="text-emerald-300 hover:underline font-medium">
              Login
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;