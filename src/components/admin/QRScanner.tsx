import { useState } from "react";
import { QrReader } from "react-qr-reader";

interface QRScannerProps {
  onScan: (data: string) => void;
}

const QRScanner = ({ onScan }: QRScannerProps) => {
  const [error, setError] = useState("");
  const [scanned, setScanned] = useState(false);

  const handleScan = (data: string | null) => {
    if (data && !scanned) {
      setScanned(true);
      onScan(data);
      // Reset scanner after 2 seconds to allow new scan
      setTimeout(() => setScanned(false), 2000);
    }
  };

  const handleError = (err: any) => {
    // Show error only if it's a camera permission or device issue
    if (
      err?.name === "NotAllowedError" ||
      err?.name === "NotFoundError" ||
      err?.message?.toLowerCase().includes("permission") ||
      err?.message?.toLowerCase().includes("camera")
    ) {
      setError("🚫 Failed to access camera. Please check your permissions.");
      console.error(err);
    }
    // Otherwise, ignore frame decoding errors (non-fatal)
  };

  return (
    <div className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">📷 Scan QR Code</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, err) => {
            if (result) handleScan(result.getText());
            if (err) handleError(err);
          }}
          containerStyle={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default QRScanner;
