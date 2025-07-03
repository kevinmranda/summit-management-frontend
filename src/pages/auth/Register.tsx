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
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-strong p-8 border border-secondary-200 animate-scale-in">
          <h2 className="text-2xl font-bold text-center mb-6 text-secondary-900">
            {step === 1 ? 'Basic Information' : 'TUCASA Information'}
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm animate-slide-up">
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
              <div className="mt-6">
                <Button type="button" onClick={nextStep} size="lg" className="w-full">
                  Continue
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
              <div className="mt-6 flex gap-4">
                <Button type="button" onClick={prevStep} variant="outline" size="lg" className="flex-1">
                  Back
                </Button>
                <Button type="submit" disabled={loading} size="lg" className="flex-1">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" color="white" />
                      <span>Creating...</span>
                    </div>
                  ) : (
                    'Create Account'
                  )}
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