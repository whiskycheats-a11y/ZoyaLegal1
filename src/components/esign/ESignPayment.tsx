import { Shield, CreditCard, Lock, Smartphone, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    amount: string;
    onNext: () => void;
    onBack: () => void;
    docType: string;
}

export default function ESignPayment({ amount, onNext, onBack, docType }: Props) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = () => {
        setIsProcessing(true);
        // Simulate payment gateway
        setTimeout(() => {
            setIsProcessing(false);
            onNext();
        }, 2000);
    };

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-2">Step 3: Service Payment_</h2>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Securely pay the service fee to proceed with Aadhaar signing.</p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-6 md:p-8 border-2 border-dashed border-gray-200 mb-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0 text-center md:text-left">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">Service Selected</p>
                        <h3 className="text-xl font-black text-black uppercase tracking-tight">{docType} + eSign</h3>
                    </div>
                    <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-black/5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Total Amount</p>
                        <p className="text-3xl font-black text-black">₹{amount}</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center space-x-4">
                        <div className="bg-blue-50 p-2 rounded-lg">
                            <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm font-bold text-black">Card / UPI / NetBanking</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Instant Activation</p>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 px-2">
                        <Shield className="h-3 w-3 text-green-500" />
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest">SSL Secured Gateway • No Hidden Charges</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    disabled={isProcessing}
                    onClick={onBack}
                    className="bg-white border-2 border-black text-black py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center disabled:opacity-50"
                >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Back
                </button>
                <button
                    disabled={isProcessing}
                    onClick={handlePayment}
                    className="bg-black text-white py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center transform hover:-translate-y-1 group disabled:bg-gray-400"
                >
                    {isProcessing ? (
                        <div className="flex items-center">
                            <span className="mr-2">Verifying</span>
                            <div className="animate-spin h-4 w-4 border-2 border-white/20 border-t-white rounded-full"></div>
                        </div>
                    ) : (
                        <>
                            Secure Pay Now
                            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
                <div className="text-center group">
                    <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 border border-black/5 shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                        <Lock className="h-5 w-5" />
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Encrypted</p>
                </div>
                <div className="text-center group">
                    <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 border border-black/5 shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                        <Smartphone className="h-5 w-5" />
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Mobile OTP</p>
                </div>
                <div className="text-center group">
                    <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 border border-black/5 shadow-sm group-hover:bg-black group-hover:text-white transition-all">
                        <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">GST Invoice</p>
                </div>
            </div>
        </div>
    );
}
