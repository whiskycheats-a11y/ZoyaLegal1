import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

const LegalDisclaimer: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Session storage ensures it appears once per "visit" (until tab is closed)
        const hasAgreed = sessionStorage.getItem('zoya_disclaimer_agreed');
        if (!hasAgreed) {
            setIsVisible(true);
            // Disable scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }
    }, []);

    const handleAgree = () => {
        sessionStorage.setItem('zoya_disclaimer_agreed', 'true');
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
            <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row animate-scale-in">
                {/* Left Side - Visual Branding */}
                <div className="bg-gray-900 text-white p-8 md:w-1/3 flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,transparent_1px)] bg-[length:20px_20px]"></div>
                    <Shield className="h-16 w-16 mb-4 text-white relative z-10" />
                    <h2 className="text-xl font-black uppercase tracking-tighter italic relative z-10">Zoya Legal</h2>
                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest relative z-10">Compliance Division</p>
                </div>

                {/* Right Side - Content */}
                <div className="p-8 md:p-10 md:w-2/3 flex flex-col">
                    <div className="flex items-center space-x-2 mb-6">
                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Official Disclaimer</span>
                    </div>

                    <div className="space-y-4 overflow-y-auto max-h-[40vh] md:max-h-none pr-2 custom-scrollbar">
                        <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                            <span className="font-bold text-black">ZOYA LEGAL & BUSINESS SERVICES</span> provides legal and allied services. The content available on this website is for general informational purposes only and does not constitute legal advice.
                        </p>

                        <p className="text-gray-800 text-sm md:text-base leading-relaxed">
                            Any legal guidance is case-specific and based solely on the facts and documents provided by the client.
                        </p>

                        <p className="text-gray-800 text-sm md:text-base leading-relaxed border-l-4 border-black pl-4">
                            As per the rules of the <span className="font-bold italic">Bar Council of India</span>, this firm does not solicit or advertise legal services.
                        </p>

                        <p className="text-gray-500 text-[11px] md:text-xs font-semibold uppercase tracking-tight">
                            By accessing this website, you acknowledge that you are doing so voluntarily to seek information and that there has been no solicitation, invitation, or inducement of any kind by the firm.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 mt-8">
                        <button
                            onClick={handleAgree}
                            className="flex-1 bg-black text-white px-6 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg active:scale-95 text-sm"
                        >
                            I Agree
                        </button>
                        <button
                            onClick={handleDisagree}
                            className="flex-1 border-2 border-black text-black px-6 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-95 text-sm"
                        >
                            Disagree
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalDisclaimer;
