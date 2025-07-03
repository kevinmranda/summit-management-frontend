import { useEffect, useRef, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { scanMeal } from "../../services/api";
import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import { Html5Qrcode } from "html5-qrcode";

interface ScanMealResponse {
  success: boolean;
  message: string;
}

const MealScan = () => {
  const {
    data: scanResult,
    loading,
    error,
    execute,
  } = useApi<ScanMealResponse>(scanMeal);

  const [scanError, setScanError] = useState("");
  const qrRef = useRef<Html5Qrcode | null>(null);
  const qrContainerId = "meal-scan-qr-container";

  useEffect(() => {
    const scanner = new Html5Qrcode(qrContainerId);
    qrRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        async (decodedText: string) => {
          try {
            const qrData = JSON.parse(decodedText);
            if (qrData.id) {
              await execute({ user_id: qrData.id });
              await scanner.stop(); // stop after a successful scan
              await scanner.clear();
            } else {
              setScanError("Invalid QR code: missing id");
            }
          } catch {
            setScanError("Invalid QR code format");
          }
        },
        (err) => {
          console.warn("Scan error", err);
        }
      )
      .catch((err) => {
        setScanError(`Scanner failed to start: ${err.message}`);
      });

    return () => {
      scanner.stop().then(() => scanner.clear()).catch(() => {});
    };
  }, [execute]);

  const handleReset = () => {
    setScanError("");
    window.location.reload(); // easiest way to reset the scanner
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-blue-950 text-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-blue-700 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">🍽️ Meal Scan</h1>
          <p className="text-blue-300 mb-6">
            Scan the QR code on the ID card to check meal status.
          </p>

          <div id={qrContainerId} className="mb-4 mx-auto" style={{ width: "300px" }}></div>

          {scanError && (
            <p className="text-red-400 font-medium mb-4">⚠️ {scanError}</p>
          )}

          <Button
            onClick={handleReset}
            disabled={loading}
            className="w-full py-3 text-lg font-semibold bg-blue-700 hover:bg-blue-600 text-white rounded-xl transition duration-300"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                <span>Scanning...</span>
              </div>
            ) : (
              "Reset Scanner"
            )}
          </Button>

          {error && <p className="text-red-400 font-medium mt-4">⚠️ {error}</p>}

          {scanResult && (
            <p
              className={`font-semibold mt-4 ${
                scanResult.success ? "text-green-400" : "text-red-400"
              }`}
            >
              {scanResult.message}
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MealScan;
