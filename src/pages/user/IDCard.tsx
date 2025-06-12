import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { generateIDCard } from '../../services/api';
import IDCardViewer from '../../components/user/IDCardViewer';
import Button from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import type { IDCardResponse } from '../../types/api';

const IDCard = () => {
  const { data: idCard, loading, error, execute } = useApi<IDCardResponse>(generateIDCard);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    setGenerated(true);
    await execute();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">ID Card</h1>
        {!generated && (
          <Button onClick={handleGenerate} disabled={loading}>
            {loading ? <LoadingSpinner /> : 'Generate ID Card'}
          </Button>
        )}
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {idCard && <IDCardViewer pdfUrl={idCard.pdf_url} />}
      </main>
      <Footer />
    </div>
  );
};

export default IDCard;