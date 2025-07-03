import React, { useState, useEffect } from "react";
import { initiatePayment, getPaymentProviders } from "../../services/api";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

interface Provider {
  name: string;
  icon_url: string;
}

interface PaymentProps {
  summitId: string;
  onClose: () => void; // <-- add onClose prop
}

const Payment: React.FC<PaymentProps> = ({ summitId, onClose }) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [msisdn, setMsisdn] = useState("");
  const [amount] = useState("2000"); // Fixed amount
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.233:8080/payments/providers"
        );
        if (Array.isArray(response.data)) {
          setProviders(response.data);
        } else {
          setError("Invalid provider data received");
        }
      } catch (err: any) {
        setError(
          err.response?.data?.error || "Failed to load payment providers"
        );
      }
    };
    fetchProviders();
  }, []);

  const handleProviderSelect = (provider: string) => {
    setSelectedProvider(provider);
    setError("");
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!msisdn) return setError("⚠️ Please enter a phone number");

    setLoading(true);
    setError("");

    try {
      const response = await initiatePayment({
        summit_id: Number(summitId),
        amount: parseFloat(amount),
        msisdn,
        provider: selectedProvider,
      });

      if (response.data.success) {
        // Redirect or do whatever
      } else {
        setError(response.data.message || "Payment failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Payment initiation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-white border border-secondary-200 rounded-2xl shadow-strong p-8 w-full max-w-md text-secondary-900 animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary-500 hover:text-secondary-700 transition-colors"
          aria-label="Close payment modal"
        >
          <FaTimes />
        </button>

        <h2 className="text-2xl font-bold text-center mb-6 text-secondary-900">
          💳 Pay for Summit
        </h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm text-center font-medium animate-slide-up">
            {error}
          </div>
        )}

        {!selectedProvider ? (
          <>
            <h3 className="text-center text-lg font-medium mb-4">
              Choose a Payment Provider
            </h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {providers.length === 0 ? (
                <p className="text-gray-200 text-center col-span-full">
                  No providers available
                </p>
              ) : (
                providers.map((provider) => (
                   <img
                    key={provider.name}
                    src={provider.icon_url}
                    alt={provider.name}
                    onClick={() => handleProviderSelect(provider.name)}
                    className="w-16 h-16 object-contain cursor-pointer hover:scale-110 transition"
                  />
                ))
              )}
            </div>
          </>
        ) : (
          <form onSubmit={handlePayment} className="space-y-5">
            <div>
              <label className="block font-medium text-white mb-1">
                📞 Phone Number
              </label>
              <input
                type="text"
                value={msisdn}
                onChange={(e) => setMsisdn(e.target.value)}
                className="w-full p-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                placeholder="e.g. 255712345678"
                required
              />
            </div>

            <div>
              <label className="block font-medium text-white mb-1">
                💰 Amount (TZS)
              </label>
              <input
                type="text"
                value={amount}
                readOnly
                className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              <button
                type="button"
                onClick={() => setSelectedProvider("")}
                className="bg-white/20 text-white px-5 py-2 rounded-lg hover:bg-white/30 transition"
                disabled={loading}
              >
                ⬅ Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-8 rounded-lg transition shadow"
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Payment;
