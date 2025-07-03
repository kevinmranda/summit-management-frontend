import { useState } from "react";
import { useApi } from "../../hooks/useApi";
import { scanQRCode } from "../../services/api";
import QRScanner from "../../components/admin/QRScanner";
import ProfileCard from "../../components/user/ProfileCard";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import type { QRScanResponse } from "../../types/api";

const QRScan = () => {
  const { data: scanResult, loading, error, execute } = useApi<QRScanResponse>(scanQRCode);
  const [scanError, setScanError] = useState("");
  const [location, setLocation] = useState("Main Hall");

  const handleScan = async (data: string) => {
    if (data) {
      try {
        // Use the new comprehensive QR scanning endpoint
        await execute(data, location);
        setScanError("");
      } catch (err: any) {
        setScanError(err.response?.data?.message || "Invalid QR code");
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

          {/* Location Input */}
          <div className="w-full bg-white rounded-2xl p-4 shadow-md">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Scanning Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter location (e.g., Main Hall, Dining Area)"
            />
          </div>

          <div className="w-full bg-white rounded-2xl p-4 shadow-md">
            <QRScanner onScan={handleScan} />
          </div>

          {/* Enhanced Scan Result Display */}
          {scanResult && (
            <div className="w-full bg-white text-blue-900 rounded-2xl p-4 shadow-lg">
              {scanResult.success ? (
                <div className="space-y-4">
                  <div className="flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                    <h3 className="text-xl font-bold text-green-600 ml-2">
                      {scanResult.message}
                    </h3>
                  </div>

                  {scanResult.user_info && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">User Information</h4>
                      <p><strong>Name:</strong> {scanResult.user_info.full_name}</p>
                      <p><strong>Email:</strong> {scanResult.user_info.email}</p>
                      <p><strong>University:</strong> {scanResult.user_info.university}</p>
                      <p><strong>Conference:</strong> {scanResult.user_info.conference}</p>
                    </div>
                  )}

                  {scanResult.meal_info && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-lg mb-2">Meal Information</h4>
                      <p><strong>Meal Type:</strong> {scanResult.meal_info.meal_type}</p>
                      <p><strong>Time:</strong> {new Date(scanResult.meal_info.consumed_at).toLocaleString()}</p>
                      {scanResult.meal_info.location && (
                        <p><strong>Location:</strong> {scanResult.meal_info.location}</p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="text-2xl">❌</span>
                  <h3 className="text-xl font-bold text-red-600 ml-2">
                    {scanResult.message}
                  </h3>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QRScan;
