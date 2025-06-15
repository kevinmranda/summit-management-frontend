import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { scanQRCode } from "../../services/api";
import QRScanner from "../../components/admin/QRScanner";
import ProfileCard from "../../components/user/ProfileCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import type { User } from "../../types/User";

const QRScan = () => {
  const { data: user, loading, error, execute } = useApi<User>(scanQRCode);
  const [scanError, setScanError] = useState("");

  const handleScan = async (data: string) => {
    if (data) {
      try {
        const id = data.split("/").pop(); // Extract ID from QR code URL
        if (id) {
          await execute(id);
          setScanError("");
        }
      } catch (err) {
        setScanError("Invalid QR code");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-blue-950 via-blue-900 to-blue-800 text-white">
      <Navbar />
      <main className="flex-grow container mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          📷 QR Code Scanner
        </h1>

        <div className="flex flex-col items-center justify-center gap-6 max-w-3xl mx-auto">
          {loading && <LoadingSpinner />}

          {error && (
            <p className="bg-red-100 text-red-800 px-4 py-2 rounded shadow w-full text-center">
              {error}
            </p>
          )}
          {scanError && (
            <p className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded shadow w-full text-center">
              {scanError}
            </p>
          )}

          <div className="w-full bg-white rounded-2xl p-4 shadow-md">
            <QRScanner onScan={handleScan} />
          </div>

          {user && (
            <div className="w-full bg-white text-blue-900 rounded-2xl p-4 shadow-lg">
              <ProfileCard user={user} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QRScan;
