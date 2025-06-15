import { useState, useEffect } from 'react';
import { useApi } from '../../hooks/useApi';
import { generateIDCard, getIDCard } from '../../services/api';
import IDCardViewer from '../../components/user/IDCardViewer';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import type { IDCardResponse } from '../../types/api';

const BACKEND_URL = 'http://172.20.10.3:8080'; // Backend base URL

const IDCard = () => {
  const { data: generatedCard, loading: generating, error: generateError, execute: generate } = useApi<IDCardResponse>(generateIDCard);
  const { data: idCard, loading: fetching, error: fetchError, execute: fetch } = useApi<IDCardResponse>(getIDCard);
  const [generated, setGenerated] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string>('');

  // Fetch ID card PDF path after generation
  useEffect(() => {
  if (generatedCard?.id || generatedCard?.id) {
    const id = generatedCard.id || generatedCard.id;
    fetch(id);
  }
}, [generatedCard, fetch]);

  // Set PDF URL when ID card data is fetched
  useEffect(() => {
    if (idCard && idCard.pdf_path) {
      setPdfUrl(`${BACKEND_URL}${idCard.pdf_path}`);
    }
  }, [idCard]);

  const handleGenerate = async () => {
    setGenerated(true);
    await generate();
  };

  const loading = generating || fetching;
  const error = generateError || fetchError;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-blue-950 text-white rounded-2xl shadow-2xl p-8 max-w-xl w-full text-center border border-blue-700 animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">🪪 Digital ID Card</h1>
          <p className="text-blue-300 mb-6">Click below to generate and preview your summit ID card.</p>

          {!generated && (
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
                'Generate ID Card'
              )}
            </Button>
          )}

          {error && (
            <p className="text-red-400 font-medium mt-4">⚠️ {error}</p>
          )}

          {pdfUrl && (
            <div className="mt-6">
              <p className="text-green-400 font-semibold mb-2">✅ ID Card generated successfully!</p>
              <IDCardViewer pdfUrl={pdfUrl} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default IDCard;