import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { createSummit } from "../../services/api";
import SummitForm from "../../components/admin/SummitForm";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

const Summits = () => {
  const { loading, error, execute } = useApi(createSummit);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (data: {
    year: string;
    name: string;
    date: string;
    venue: string;
    ministers?: string;
    clothing?: string;
    description?: string;
  }) => {
    try {
      await execute(data);
      setSuccess("Summit created successfully");
    } catch (err) {
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-950 via-blue-900 to-blue-800 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          🗓️ Manage Summits
        </h1>

        <div className="flex flex-col items-center gap-6 max-w-3xl mx-auto w-full">
          {loading && <LoadingSpinner />}

          {error && (
            <p className="bg-red-100 text-red-800 px-4 py-2 rounded shadow w-full text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="bg-green-100 text-green-800 px-4 py-2 rounded shadow w-full text-center">
              {success}
            </p>
          )}

          <div className="w-full bg-transparent text-blue-900 rounded-2xl p-6 shadow-lg">
            <SummitForm onSubmit={handleSubmit} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Summits;
