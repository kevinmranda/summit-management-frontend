import { useState, useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { generateIDCard, getIDCard } from "../../services/api";
import IDCardViewer from "../../components/user/IDCardViewer";
import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
// import { getUserIdFromToken } from '../../utils/jwt'; // ✅ import the helper
import { getUserIdFromToken } from "../../services/auth"; // Adjust the import path as needed

import type { IDCardResponse } from "../../types/api";

const BACKEND_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const IDCard = () => {
  const {
    data: generatedCard,
    loading: generating,
    error: generateError,
    execute: generate,
  } = useApi<IDCardResponse>(generateIDCard);

  const {
    data: idCard,
    loading: fetching,
    error: fetchError,
    execute: fetch,
  } = useApi<IDCardResponse>(getIDCard);

  const [generated, setGenerated] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>("");

  // On load, fetch user's ID card
  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      fetch(userId);
    }
  }, [fetch]);

  // After generating, fetch using returned ID
  useEffect(() => {
    if (generatedCard?.id) {
      fetch(generatedCard.id);
    }
  }, [generatedCard, fetch]);

  // Set URL to preview/download
  useEffect(() => {
    if (idCard?.pdf_path) {
      setPdfUrl(`${BACKEND_URL}${idCard.pdf_path}`);
    }
  }, [idCard]);

  const handleGenerate = async () => {
    setGenerated(true);
    await generate();
  };

  const handleDownload = () => {
    if (pdfUrl) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "Summit_ID_Card.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const loading = generating || fetching;
  const error = generateError || fetchError;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white text-secondary-900 rounded-2xl shadow-strong p-8 max-w-xl w-full text-center border border-secondary-200 animate-scale-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            🪪 Digital ID Card
          </h1>
          <p className="text-secondary-600 mb-6">
            {pdfUrl
              ? "Your Summit ID Card is ready below. You can also download it."
              : "Click below to generate and preview your summit ID card."}
          </p>

          {!pdfUrl && !generated && (
            <Button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 text-lg font-semibold bg-blue-700 hover:bg-blue-600 text-white rounded-xl transition duration-300"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <LoadingSpinner />
                  <span>Generating...</span>
                </div>
              ) : (
                "Generate ID Card"
              )}
            </Button>
          )}

          {error && <p className="text-red-400 font-medium mt-4">⚠️ {error}</p>}

          {pdfUrl && (
            <div className="mt-6">
              <p className="text-green-400 font-semibold mb-2">
                ✅ ID Card is ready!
              </p>
              <IDCardViewer pdfUrl={pdfUrl} />
              <Button
                onClick={handleDownload}
                className="mt-4 w-full py-3 text-lg font-semibold bg-green-600 hover:bg-green-500 text-white rounded-xl transition duration-300"
              >
                Download PDF
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IDCard;
