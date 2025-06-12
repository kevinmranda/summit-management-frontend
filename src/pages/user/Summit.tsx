import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { getSummit } from '../../services/api';
import SummitDetails from '../../components/user/SummitDetails';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import type { Summit } from '../../types/User';

const Summit = () => {
  const { year } = useParams<{ year: string }>();
  const { data: summit, loading, error, execute } = useApi<Summit>(getSummit);

  useEffect(() => {
    if (year) {
      execute(year);
    }
  }, [year, execute]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Summit Details</h1>
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}
        {summit && <SummitDetails summit={summit} />}
      </main>
      <Footer />
    </div>
  );
};

export default Summit;