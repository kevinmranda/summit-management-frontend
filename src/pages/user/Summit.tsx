import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { getSummit } from "../../services/api";
import SummitDetails from "../../components/user/SummitDetails";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import Payment from "../../components/user/Payment"; // ⬅️ Make sure the path is correct
import type { Summit as SummitType } from "../../types/User";

const SummitPage = () => {
  const { year } = useParams<{ year: string }>();
  const {
    data: summit,
    loading,
    error,
    execute,
  } = useApi<SummitType>(getSummit);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (year) {
      execute(year);
    }
  }, [year, execute]);

  const handlePayClick = () => {
    if (summit?.ID) {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Navbar />
      <main className="flex-grow flex justify-center items-start pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-strong max-w-4xl w-full p-10 text-secondary-900 border border-secondary-200 animate-scale-in">
          <h1 className="text-4xl font-bold mb-8 text-center text-secondary-900">
            Summit {year} Details
          </h1>

          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-center animate-slide-up">
              {error}
            </div>
          )}

          {summit && (
            <>
              <SummitDetails summit={summit} />
              <div className="flex justify-center mt-6">
                <button
                  onClick={handlePayClick}
                  className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  Pay for Summit
                </button>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />

      {/* Payment Modal */}
      {showPaymentModal && summit?.ID && (
        <Payment
          summitId={String(summit.ID)}
          onClose={() => setShowPaymentModal(false)} // <-- pass this
        />
      )}
    </div>
  );
};

export default SummitPage;
