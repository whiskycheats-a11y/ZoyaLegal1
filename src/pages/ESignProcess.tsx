import { useState } from 'react';
import { Shield, ArrowLeft, CheckCircle2, Fingerprint, Smartphone, Download, ChevronRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import ESignRequestForm from '../components/esign/ESignRequestForm';
import ESignPreview from '../components/esign/ESignPreview';
import ESignFingerprintSign from '../components/esign/ESignFingerprintSign';
import ESignDownload from '../components/esign/ESignDownload';
import ESignPayment from '../components/esign/ESignPayment';

import { esignService } from '../services/esignService';

type Step = 1 | 2 | 3 | 4 | 5;

export default function ESignProcess({ isAdmin = false }: { isAdmin?: boolean }) {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        docType: '',
        details: ''
    });
    const [isSigning, setIsSigning] = useState(false);

    const steps = [
        { number: 1, title: 'Details', icon: FileText },
        { number: 2, title: 'Preview', icon: Smartphone },
        { number: 3, title: 'Payment', icon: Shield },
        { number: 4, title: 'Sign', icon: Fingerprint },
        { number: 5, title: 'Done', icon: Download },
    ];

    const handleFormSubmit = async (data: any) => {
        setFormData(data);
        setCurrentStep(2);
        window.scrollTo(0, 0);
        // Silent initialization in background
        await esignService.initializeSigning(data);
    };

    const handleSignComplete = () => {
        setIsSigning(false);
        setCurrentStep(5);
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Area */}
            <section className="bg-black text-white pt-12 pb-24 md:pt-16 md:pb-32 px-4 shadow-2xl relative overflow-hidden">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                        <Link
                            to="/esign"
                            className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all group"
                        >
                            <ArrowLeft className="h-6 w-6 text-white group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div>
                            <div className="flex items-center space-x-2">
                                <Shield className="h-5 w-5 text-green-500" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Secure eSign Protocol Z-88</p>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Digital Signing Room_</h1>
                        </div>
                    </div>

                    {/* Progress Tracker */}
                    <div className="grid grid-cols-4 gap-2 md:gap-4 relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 hidden md:block"></div>

                        {steps.map((step) => {
                            const isActive = currentStep === step.number;
                            const isCompleted = currentStep > step.number;
                            const Icon = step.icon;

                            return (
                                <div key={step.number} className="relative z-10">
                                    <div className="flex flex-col items-center group">
                                        <div className={`
                      w-10 h-10 md:w-14 md:h-14 rounded-2xl flex items-center justify-center transition-all duration-500
                      ${isActive ? 'bg-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-500'}
                    `}>
                                            {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Icon className="h-5 w-5 md:h-6 md:h-6" />}
                                        </div>
                                        <div className="mt-2 text-center">
                                            <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                Step 0{step.number}
                                            </p>
                                            <p className={`hidden md:block text-xs font-bold ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                                {step.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Content Area */}
            <section className="flex-grow flex items-start justify-center px-4 -mt-16 pb-20 relative z-20">
                <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[600px]">

                    {/* Main Workspace */}
                    <div className="flex-grow p-6 md:p-12">
                        {currentStep === 1 && (
                            <ESignRequestForm
                                initialData={formData}
                                onNext={handleFormSubmit}
                            />
                        )}
                        {currentStep === 2 && (
                            <ESignPreview
                                data={formData}
                                onBack={() => setCurrentStep(1)}
                                onNext={() => setCurrentStep(isAdmin ? 4 : 3)}
                            />
                        )}
                        {currentStep === 3 && (
                            <ESignPayment
                                amount="300"
                                docType={formData.docType}
                                onBack={() => setCurrentStep(2)}
                                onNext={() => setCurrentStep(4)}
                            />
                        )}
                        {currentStep === 4 && (
                            <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
                                <div className="bg-gray-50 p-12 rounded-[3rem] border-2 border-dashed border-gray-200 text-center max-w-md">
                                    <Fingerprint className="h-16 w-16 text-black mx-auto mb-6" />
                                    <h3 className="text-2xl font-black text-black uppercase tracking-tight mb-4">Payment Verified_</h3>
                                    <p className="text-sm text-gray-500 font-medium mb-8">Secure signing channel is open. Click the button below to start Aadhaar verification.</p>
                                    <button
                                        onClick={() => setIsSigning(true)}
                                        className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center group"
                                    >
                                        Initialize eSign
                                        <ChevronRight className="ml-2 h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {currentStep === 5 && (
                            <ESignDownload data={formData} />
                        )}
                    </div>

                    {/* Sidebar / Info Panel (Hidden on Download Step) */}
                    {currentStep !== 4 && (
                        <div className="w-full md:w-80 bg-gray-50 p-8 border-l border-gray-100 hidden lg:block">
                            <div className="sticky top-24 space-y-8">
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 ml-1">Live Status_</h4>
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                                        <div className="flex items-center space-x-3 text-sm">
                                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="font-bold text-gray-800">System Ready</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span className="text-gray-400 uppercase">Encryption</span>
                                                <span className="text-green-600">Active</span>
                                            </div>
                                            <div className="flex justify-between text-[10px] font-bold">
                                                <span className="text-gray-400 uppercase">Auth Level</span>
                                                <span className="text-blue-600">High</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Did you know?</h4>
                                    <div className="bg-black text-white p-6 rounded-2xl shadow-xl">
                                        <p className="text-xs font-medium leading-relaxed italic">
                                            "Aadhaar eSign is fully legal and valid in Indian Courts since the IT Act 2000 amendment."
                                        </p>
                                        <div className="mt-4 flex items-center space-x-2">
                                            <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/Aadhaar_Logo.svg/1024px-Aadhaar_Logo.svg.png" alt="Aadhaar" className="h-4 invert" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Govt. Certified</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* eSign Modal (Floating Gateway) */}
            {isSigning && (
                <ESignFingerprintSign
                    mobile={formData.mobile}
                    onSuccess={handleSignComplete}
                    onCancel={() => setIsSigning(false)}
                />
            )}

            {/* Protection Footer */}
            <footer className="bg-white py-6 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest space-y-2 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center"><Shield className="h-3 w-3 mr-1 text-green-500" /> End-to-End Encrypted</span>
                        <span className="flex items-center"><Fingerprint className="h-3 w-3 mr-1 text-blue-500" /> Biometric Identity Verification</span>
                    </div>
                    <div>© 2026 ZoyaLegal Digital Trust Infrastructure</div>
                </div>
            </footer>
        </div>
    );
}
