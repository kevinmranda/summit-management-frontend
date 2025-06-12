import { useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { getPaymentReport } from '../../services/api';
import ReportViewer from '../../components/admin/ReportViewer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import type { Payment } from '../../types/User';

const Reports = () => {
  const { data: payments, loading, error, execute } = useApi<Payment[]>(getPaymentReport);

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Reports</h1>
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}
        {payments && <ReportViewer payments={payments} />}
      </main>
      <Footer />
    </div>
  );
};

export default Reports;