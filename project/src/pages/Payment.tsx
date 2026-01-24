import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function Payment() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [amountInput, setAmountInput] = useState<string>('');
  const [payerName, setPayerName] = useState<string>('');
  const [payerEmail, setPayerEmail] = useState<string>('');
  const [payerPhone, setPayerPhone] = useState<string>('');

  // Optional presets via query params, e.g. /payment?purpose=Startup%20Kit&amount=1499
  const preset = useMemo(() => {
    const purpose = searchParams.get('purpose') || 'Online Service Payment';
    const amount = searchParams.get('amount');
    return { purpose, amount };
  }, [searchParams]);

  useEffect(() => {
    if (preset.amount && !amountInput) {
      setAmountInput(preset.amount);
    }
  }, [preset.amount, amountInput]);

  const loadRazorpayScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.Razorpay) return resolve();
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay'));
      document.body.appendChild(script);
    });
  }, []);

  const startPayment = useCallback(async () => {
    const key = (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined) || 'rzp_live_RbGJzVOXdIIOWm';

    const numericAmount = Number(amountInput);
    if (!numericAmount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      await loadRazorpayScript();

      const options = {
        key,
        amount: Math.round(numericAmount * 100), // in paise
        currency: 'INR',
        name: 'ZoyaLegal',
        description: preset.purpose,
        prefill: {
          name: payerName || undefined,
          email: payerEmail || undefined,
          contact: payerPhone || undefined,
        },
        theme: { color: '#6b21a8' },
        handler: function (response: any) {
          // Basic success acknowledgement; integrate your backend verification here if needed
          alert('Payment successful. ID: ' + response.razorpay_payment_id);
        },
        modal: {
          ondismiss: function () {
            // No-op; user closed the modal
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      alert('Unable to initiate payment. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [amountInput, payerEmail, payerName, payerPhone, loadRazorpayScript, preset.purpose]);

  return (
    <div className="min-h-[70vh] bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Secure Online Payment</h1>
        <p className="text-gray-600 mb-6">{preset.purpose}</p>

        <div className="grid grid-cols-1 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (INR)</label>
            <input
              type="number"
              min="1"
              step="1"
              inputMode="numeric"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter amount"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name (optional)</label>
              <input
                type="text"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Full name"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
              <input
                type="tel"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="10-digit mobile"
                value={payerPhone}
                onChange={(e) => setPayerPhone(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
              <input
                type="email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="email@example.com"
                value={payerEmail}
                onChange={(e) => setPayerEmail(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">Payments are processed securely by Razorpay.</div>
          <button
            onClick={startPayment}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {loading ? 'Processing…' : 'Pay Now'}
          </button>
        </div>
      </div>
    </div>
  );
}


