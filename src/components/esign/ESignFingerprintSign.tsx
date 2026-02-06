import { useState, useEffect } from 'react';
import { Fingerprint, ShieldCheck, Smartphone, Lock, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

interface Props {
    onSuccess: () => void;
    onCancel: () => void;
    mobile: string;
}

export default function ESignFingerprintSign({ onSuccess, onCancel, mobile }: Props) {
    const [step, setStep] = useState<'aadhaar' | 'otp' | 'processing' | 'success'>('aadhaar');
    const [aadhaar, setAadhaar] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState(30);

    useEffect(() => {
        let timer: any;
        if (step === 'otp' && countdown > 0) {
            timer = setInterval(() => setCountdown(c => c - 1), 1000);
        }
        return () => clearInterval(timer);
    }, [step, countdown]);

    const handleAadhaarSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (aadhaar.length !== 12) {
            setError('Please enter a valid 12-digit Aadhaar number');
            return;
        }
        setError('');
        setStep('otp');
    };

    const handleOtpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError('Please enter the 6-digit OTP');
            return;
        }
        setError('');
        setStep('processing');

        // Simulate API delay
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onSuccess();
            }, 1500);
        }, 2500);
    };

    return (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl animate-scale-in">
                {/* Header */}
                <div className="bg-black text-white p-6 relative">
                    <button
                        onClick={onCancel}
                        className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                    >
                        ✕
                    </button>
                    <div className="flex items-center space-x-3 mb-2">
                        <ShieldCheck className="h-6 w-6 text-green-500" />
                        <h3 className="font-black uppercase tracking-tighter text-xl text-white">Secure eSign Gateway_</h3>
                    </div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">Verified by NSDL / CDAC / ZoyaLegal</p>
                </div>

                <div className="p-8">
                    {step === 'aadhaar' && (
                        <div className="animate-fade-in">
                            <div className="text-center mb-8">
                                <div className="bg-gray-100 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                    <Fingerprint className="h-10 w-10 text-black" />
                                </div>
                                <h4 className="text-xl font-bold text-black mb-2">Aadhaar Authentication</h4>
                                <p className="text-sm text-gray-500 leading-relaxed font-medium">Enter your 12-digit Aadhaar number to receive an OTP on your linked mobile.</p>
                            </div>

                            <form onSubmit={handleAadhaarSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Aadhaar Number</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        maxLength={12}
                                        placeholder="XXXX XXXX XXXX"
                                        value={aadhaar}
                                        onChange={(e) => setAadhaar(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl py-4 px-4 text-center text-2xl font-black tracking-[0.3em] outline-none transition-all placeholder:text-gray-200"
                                    />
                                    {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center px-1">
                                        <AlertCircle className="h-3 w-3 mr-1" /> {error}
                                    </p>}
                                </div>

                                <div className="pt-4">
                                    <button className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center group">
                                        Send OTP
                                        <Smartphone className="ml-2 h-4 w-4 group-hover:translate-y-[-2px] transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 'otp' && (
                        <div className="animate-fade-in text-center">
                            <div className="mb-8">
                                <div className="bg-blue-50 p-4 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                    <Smartphone className="h-10 w-10 text-black animate-bounce" />
                                </div>
                                <h4 className="text-xl font-bold text-black mb-2">Enter OTP</h4>
                                <p className="text-sm text-gray-500 font-medium">OTP sent to your Aadhaar linked mobile number: <span className="text-black font-black">XXXXX-X{mobile.slice(-4)}</span></p>
                            </div>

                            <form onSubmit={handleOtpSubmit} className="space-y-6">
                                <div className="space-y-2 text-left">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">6-Digit OTP</label>
                                    <input
                                        autoFocus
                                        type="text"
                                        maxLength={6}
                                        placeholder="000000"
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ''))}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl py-4 px-4 text-center text-3xl font-black tracking-[0.5em] outline-none transition-all"
                                    />
                                    {error && <p className="text-red-500 text-[10px] font-bold uppercase tracking-widest flex items-center px-1">
                                        <AlertCircle className="h-3 w-3 mr-1" /> {error}
                                    </p>}
                                </div>

                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                                    <span className="text-gray-400">Didn't receive?</span>
                                    {countdown > 0 ? (
                                        <span className="text-black">Resend in {countdown}s</span>
                                    ) : (
                                        <button type="button" onClick={() => setCountdown(30)} className="text-blue-600 hover:underline">Resend Now</button>
                                    )}
                                </div>

                                <button className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center">
                                    Verify & Sign
                                    <Lock className="ml-2 h-4 w-4" />
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="py-12 text-center animate-fade-in">
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
                                <Loader2 className="h-24 w-24 text-black animate-spin relative z-10" />
                            </div>
                            <h4 className="text-2xl font-black text-black uppercase tracking-tighter mb-2">Processing_</h4>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Attaching Digital Signature & Timestamp...</p>

                            <div className="mt-8 space-y-2">
                                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-black transition-all duration-[2500ms] w-full ease-out"></div>
                                </div>
                                <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.3em]">SECURE CHANNEL ESTABLISHED</p>
                            </div>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="py-12 text-center animate-scale-in">
                            <div className="bg-green-500 p-4 rounded-full w-24 h-24 mx-auto mb-8 flex items-center justify-center shadow-lg shadow-green-200">
                                <CheckCircle2 className="h-12 w-12 text-white" />
                            </div>
                            <h4 className="text-3xl font-black text-black uppercase tracking-tighter mb-2">Signed Successfully!</h4>
                            <p className="text-sm text-gray-500 font-bold uppercase tracking-widest mb-6">Redirecting to download page...</p>

                            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 inline-block">
                                <p className="text-[10px] font-black text-black uppercase tracking-widest">Txn ID: ZLY-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
                    <div className="flex items-center justify-center space-x-2 text-[8px] font-black text-gray-400 uppercase tracking-widest">
                        <ShieldCheck className="h-3 w-3" />
                        <span>Encrypted by ZoyaLegal Trust Infrastructure</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
