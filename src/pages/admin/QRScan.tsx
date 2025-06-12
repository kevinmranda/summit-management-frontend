import { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { scanQRCode } from '../../services/api';
import QRScanner from '../../components/admin/QRScanner';
import ProfileCard from '../../components/user/ProfileCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import type { User } from '../../types/User';

const QRScan = () => {
  const { data: user, loading, error, execute } = useApi<User>(scanQRCode);
  const [scanError, setScanError] = useState('');

  const handleScan = async (data: string) => {
    if (data) {
      try {
        const id = data.split('/').pop(); // Extract ID from QR code URL
        if (id) {
          await execute(id);
        }
      } catch (err) {
        setScanError('Invalid QR code');
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">QR Code Scanner</h1>
        {loading && <LoadingSpinner />}
        {error && <p className="text-red-500">{error}</p>}
        {scanError && <p className="text-red-500">{scanError}</p>}
        <QRScanner onScan={handleScan} />
        {user && <ProfileCard user={user} />}
      </main>
      <Footer />
    </div>
  );
};

export default QRScan;