import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const LegalDisclaimer: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const hasAgreed = localStorage.getItem('zoya_disclaimer_agreed');
        if (!hasAgreed) {
            setIsVisible(true);
            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleAgree = () => {
        localStorage.setItem('zoya_disclaimer_agreed', 'true');
        setIsVisible(false);
        document.body.style.overflow = 'auto';
    };

    const handleDisagree = () => {
        // Professional redirect or message
        window.location.href = 'https://www.google.com';
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row animate-scale-in">
                {/* Left Side - Visual Branding */}
                <div className="bg-black text-white p-12 md:w-1/3 flex flex-col items-center justify-center text-center">
                    <Shield className="h-16 w-16 mb-4 text-white" />
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic">Regulatory_ Compliance</h2>
                </div>

                {/* Right Side - Content */}
                <div className="p-8 md:p-12 md:w-2/3">
                    <div className="flex items-center space-x-2 mb-6">
                        <AlertTriangle className="h-5 w-5 text-black" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Legal Disclaimer & Terms</span>
                    </div>

                    <p className="text-gray-800 font-medium leading-relaxed mb-8">
                        <span className="font-black text-black">Disclaimer:</span> ZOYA LEGAL & BUSINESS SERVICES provides genuine legal guidance in accordance with the <span className="underline decoration-black decoration-2 underline-offset-4">Bar Council of India rules</span>. Advice is case-specific and based on the factual documents provided by the client.
                    </p>

                    <p className="text-xs text-gray-500 font-bold uppercase tracking-tight mb-8">
                        By clicking "I AGREE", you acknowledge that your visit to this website is of your own accord and that there has been no solicitation or advertisement by the firm.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={handleAgree}
                            className="flex-1 bg-black text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl active:scale-95"
                        >
                            I Agree
                        </button>
                        <button
                            onClick={handleDisagree}
                            className="flex-1 border-2 border-black text-black px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95"
                        >
                            Discard
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalDisclaimer;
