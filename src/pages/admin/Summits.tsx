import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { createSummit } from '../../services/api';
import SummitForm from '../../components/admin/SummitForm';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Summits = () => {
  const { loading, error, execute } = useApi(createSummit);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (data: { year: string; name: string; date: string }) => {
    try {
      await execute(data);
      setSuccess('Summit created successfully');
    } catch (err) {
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Manage Summits</h1>
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <SummitForm onSubmit={handleSubmit} />
      </main>
      <Footer />
    </div>
  );
};

export default Summits;