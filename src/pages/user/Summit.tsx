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
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-600 via-purple-700 to-pink-600 text-white">
      <Navbar />
      <main className="flex-grow flex justify-center items-start pt-10 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-10 text-gray-900 border border-purple-300 animate-fade-in">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-purple-900">
            Summit {year} Details
          </h1>

          {loading && (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          )}

          {error && (
            <p className="text-red-600 font-semibold text-center mb-6">
              {error}
            </p>
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
