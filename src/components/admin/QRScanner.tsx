import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScan: (data: string) => void;
}

const QRScanner = ({ onScan }: QRScannerProps) => {
  const [error, setError] = useState("");
  const [scanned, setScanned] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerId = "html5-qrcode-reader";

  useEffect(() => {
    const scanner = new Html5Qrcode(scannerId);
    scannerRef.current = scanner;

    Html5Qrcode.getCameras()
      .then((devices) => {
        if (devices.length > 0) {
          const cameraId = devices[0].id;
          scanner
            .start(
              cameraId,
              {
                fps: 10,
                qrbox: { width: 250, height: 250 },
              },
              (decodedText) => {
                if (!scanned) {
                  setScanned(true);
                  onScan(decodedText);
                  setTimeout(() => setScanned(false), 2000);
                }
              },
              (err) => {
                // Frame decode errors are expected; no need to show them
              }
            )
            .catch((err) => {
              setError(
                "🚫 Failed to start camera. Please allow camera access or check permissions."
              );
              console.error(err);
            });
        } else {
          setError("🚫 No cameras found on this device.");
        }
      })
      .catch((err) => {
        setError("🚫 Unable to access camera. Check your device permissions.");
        console.error(err);
      });

    return () => {
      scanner.stop().then(() => scanner.clear()).catch(() => {});
    };
  }, [onScan, scanned]);

  return (
    <div className="bg-white text-blue-950 p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">📷 Scan QR Code</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div
        id={scannerId}
        className="rounded-lg overflow-hidden border border-gray-300 shadow-sm"
        style={{ width: "100%" }}
      ></div>
    </div>
  );
};

export default QRScanner;
