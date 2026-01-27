import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CreditCard, Lock, ArrowLeft, ShieldCheck, Mail, User, Smartphone, Zap, CheckCircle2 } from 'lucide-react';

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

  const preset = useMemo(() => {
    const purpose = searchParams.get('purpose') || 'Professional Legal Services';
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
    if (!numericAmount || numericAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    try {
      setLoading(true);
      await loadRazorpayScript();
      const options = {
        key,
        amount: Math.round(numericAmount * 100),
        currency: 'INR',
        name: 'ZoyaLegal',
        description: preset.purpose,
        theme: { color: '#000000' },
        prefill: {
          name: payerName || undefined,
          email: payerEmail || undefined,
          contact: payerPhone || undefined,
        },
        handler: function (response: any) {
          alert('Payment Confirmed. Transaction ID: ' + response.razorpay_payment_id);
        },
        modal: { ondismiss: () => setLoading(false) },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (e) {
      alert('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [amountInput, payerEmail, payerName, payerPhone, loadRazorpayScript, preset.purpose]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Header Info */}
        <div className="md:col-span-12 flex flex-col md:flex-row md:items-center justify-between mb-2">
          <Link to="/" className="flex items-center text-gray-500 hover:text-black transition-all font-bold group mb-4 md:mb-0">
            <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-2 transition-transform" />
            Return to ZoyaLegal
          </Link>
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
            <Lock className="h-3 w-3 text-black" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-600">256-bit Secure Checkout</span>
          </div>
        </div>

        {/* Left Card: Payment Form */}
        <div className="md:col-span-7">
          <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-gray-200 relative overflow-hidden h-full">
            <div className="relative z-10 space-y-10">
              <header className="space-y-2">
                <h2 className="text-3xl md:text-4xl font-black text-black tracking-tight">Billing Details</h2>
                <p className="text-gray-500 font-medium">Please enter your payment information below</p>
              </header>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-tighter ml-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none font-bold text-black"
                        placeholder="John Doe"
                        value={payerName}
                        onChange={(e) => setPayerName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-500 uppercase tracking-tighter ml-1">Contact Number</label>
                    <div className="relative">
                      <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="tel"
                        className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none font-bold text-black"
                        placeholder="+91 0000 000000"
                        value={payerPhone}
                        onChange={(e) => setPayerPhone(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-tighter ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="email"
                      className="w-full pl-12 pr-4 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white transition-all outline-none font-bold text-black"
                      placeholder="client@zoyalegal.com"
                      value={payerEmail}
                      onChange={(e) => setPayerEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    onClick={startPayment}
                    disabled={loading || !amountInput}
                    className="w-full bg-black text-white py-6 rounded-2xl font-black text-lg hover:bg-gray-800 transition-all transform active:scale-[0.98] shadow-xl flex items-center justify-center group"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <>
                        Continue to Payment
                        <Zap className="h-5 w-5 ml-3 fill-current group-hover:scale-125 transition-transform" />
                      </>
                    )}
                  </button>
                  <div className="flex items-center justify-center mt-6 space-x-4 grayscale opacity-40">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Order Summary */}
        <div className="md:col-span-5 space-y-8">
          <div className="bg-black rounded-[2rem] p-10 text-white shadow-2xl h-full relative overflow-hidden flex flex-col justify-between border border-gray-800">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-[80px] opacity-20"></div>

            <div className="space-y-10 relative z-10">
              <header className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold opacity-70 uppercase tracking-widest text-gray-400">Transaction Summary</h3>
                  <p className="text-sm font-medium text-gray-500 mt-1">{preset.purpose}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-xl">
                  <CreditCard className="h-6 w-6 text-gray-400" />
                </div>
              </header>

              <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Amount Payable</label>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-light text-slate-500 mr-2">INR</span>
                    <input
                      type="number"
                      className="bg-transparent border-none outline-none text-6xl font-black text-white w-full p-0 focus:ring-0 placeholder:text-slate-800"
                      placeholder="0"
                      value={amountInput}
                      onChange={(e) => setAmountInput(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-bold">Base Service Fee</span>
                    <span className="font-bold">₹{amountInput || '0'}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-500 font-bold">Taxes & Processing</span>
                    <span className="text-gray-400 font-bold">INCLUDED</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-white/5 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="h-6 w-6 text-gray-400" />
                </div>
                <div>
                  <p className="font-bold text-sm">Secure Merchant Gateway</p>
                  <p className="text-xs text-slate-500">Your details are never stored on our servers.</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <CheckCircle2 className="h-4 w-4 text-gray-400" />
                <span className="text-[10px] font-black uppercase tracking-tughter">Verified Professional Provider</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em]">
        © 2025 ZoyaLegal International • Secure Payment Gateway
      </footer>
    </div>
  );
}
