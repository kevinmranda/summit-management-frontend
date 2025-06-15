import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { getPaymentReport } from "../../services/api";
import ReportViewer from "../../components/admin/ReportViewer";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import type { Payment } from "../../types/User";

const Reports = () => {
  const {
    data: payments,
    loading,
    error,
    execute,
  } = useApi<Payment[]>(getPaymentReport);

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-950 via-blue-900 to-blue-800 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          📊 Payment Reports
        </h1>

        <div className="flex flex-col items-center gap-6 max-w-5xl mx-auto w-full">
          {loading && <LoadingSpinner />}

          {error && (
            <p className="bg-red-100 text-red-800 px-4 py-2 rounded shadow w-full text-center">
              {error}
            </p>
          )}

          {payments && (
            <div className="w-full bg-white text-blue-900 rounded-2xl p-6 shadow-lg">
              <ReportViewer payments={payments} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reports;
