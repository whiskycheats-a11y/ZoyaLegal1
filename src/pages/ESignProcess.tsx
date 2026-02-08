import { useState } from 'react';
import { Shield, ArrowLeft, CheckCircle2, Fingerprint, Download, ChevronRight, FileText, User, CreditCard, ClipboardCheck, Copy, Check, Upload, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { esignService } from '../services/esignService';

// Sub-components
import ESignPreview from '../components/esign/ESignPreview';
import ESignFingerprintSign from '../components/esign/ESignFingerprintSign';
import ESignDownload from '../components/esign/ESignDownload';
import ESignPayment from '../components/esign/ESignPayment';

type Step = 1 | 2 | 3 | 4 | 5 | 6;

export default function ESignProcess({ adminMode }: { adminMode?: boolean }) {
    const [currentStep, setCurrentStep] = useState<Step>(1);
    const [orderId, setOrderId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        mobile: '',
        email: '',
        state: '',
        city: ''
    });
    const [formData, setFormData] = useState({
        docType: '',
        details: '',
        affidavitType: '',
        purpose: '',
        address: ''
    });
    const [isSigning, setIsSigning] = useState(false);
    const [consentChecked, setConsentChecked] = useState(false);
    const [signatureFile, setSignatureFile] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        if (orderId) {
            navigator.clipboard.writeText(orderId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const steps = [
        { number: 1, title: 'Identity', icon: User },
        { number: 2, title: 'Form', icon: FileText },
        { number: 3, title: 'Pay', icon: CreditCard },
        { number: 4, title: 'Review', icon: ClipboardCheck },
        { number: 5, title: 'eSign', icon: Fingerprint },
        { number: 6, title: 'Done', icon: Download },
    ];

    // 1. Initial Identity Form Submission
    const handleBasicInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await esignService.createOrder(userData, formData.docType || 'Legal Document');
            setOrderId(data._id);
            setCurrentStep(2);
        } catch (err) {
            console.error('Error creating order:', err);
        } finally {
            setLoading(false);
        }
    };

    // 2. Document Details Submission
    const handleDocDetailsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!orderId) return;
        setLoading(true);
        try {
            await esignService.updateFormData(orderId, formData);
            setCurrentStep(3);
        } catch (err) {
            console.error('Error updating form:', err);
        } finally {
            setLoading(false);
        }
    };

    // 3. Document Preview -> Payment

    // 4. Payment recorded
    const handlePaymentComplete = async (txId: string) => {
        if (!orderId) return;
        setLoading(true);
        try {
            await esignService.recordPayment(orderId, txId, 499);
            setCurrentStep(4);
        } catch (err) {
            console.error('Error recording payment:', err);
        } finally {
            setLoading(false);
        }
    };

    // 5. Signature Upload & Complete
    const handleSignComplete = async () => {
        if (!orderId || !signatureFile || !consentChecked) return;
        setLoading(true);
        try {
            await esignService.uploadSignature(orderId, signatureFile);
            setCurrentStep(6);
        } catch (err: any) {
            console.error('Error uploading signature:', err);
            alert("Signature upload failed: " + (err.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header Area */}
            <section className="bg-black text-white pt-12 pb-24 md:pt-16 md:pb-32 px-4 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="max-w-4xl mx-auto relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                        <Link to="/esign" className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all group">
                            <ArrowLeft className="h-6 w-6 text-white group-hover:-translate-x-1 transition-transform" />
                        </Link>
                        <div>
                            <div className="flex items-center space-x-2">
                                <Shield className="h-5 w-5 text-green-500" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Secure eSign Protocol Z-2026</p>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Legal Execution Room_</h1>
                        </div>
                    </div>

                    {/* Progress Tracker */}
                    <div className="grid grid-cols-6 gap-2 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-white/10 -translate-y-1/2 hidden md:block"></div>
                        {steps.map((step) => {
                            const isActive = currentStep === step.number;
                            const isCompleted = currentStep > step.number;
                            const Icon = step.icon;
                            return (
                                <div key={step.number} className="relative z-10 flex flex-col items-center">
                                    <div className={`
                                        w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-500
                                        ${isActive ? 'bg-white text-black scale-110 shadow-xl' : isCompleted ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-500'}
                                    `}>
                                        {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                    </div>
                                    <p className={`mt-2 text-[8px] font-black uppercase tracking-widest hidden md:block ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                        {step.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>

                    {orderId && (
                        <div className="mt-8 flex justify-center">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/20 flex items-center space-x-4 animate-fade-in group hover:bg-white/20 transition-all">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Order Reference</p>
                                    <p className="font-mono font-bold text-white tracking-widest">{orderId}</p>
                                </div>
                                <button
                                    onClick={copyToClipboard}
                                    className="p-2 bg-white/10 rounded-lg hover:bg-white text-gray-400 hover:text-black transition-all"
                                    title="Copy Order ID"
                                >
                                    {copied ? <Check className="h-4 w-4 text-green-400" /> : <Copy className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Content Area */}
            <section className="flex-grow flex items-start justify-center px-4 -mt-16 pb-20 relative z-20">
                <div className="w-full max-w-4xl bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 min-h-[500px]">

                    {loading && (
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                            <div className="flex flex-col items-center">
                                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                                <p className="mt-4 font-black text-[10px] uppercase tracking-widest">Processing Secure Transaction_</p>
                            </div>
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {currentStep === 1 && (
                            <form onSubmit={handleBasicInfoSubmit} className="space-y-6 animate-fade-in">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-black uppercase tracking-tight">Step 1: Your Identity_</h2>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Enter details to initiate legal order.</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Name (As per Aadhaar)</label>
                                        <input required type="text" value={userData.name} onChange={e => setUserData({ ...userData, name: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none" placeholder="Rahul Kumar" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Aadhaar Linked Mobile</label>
                                        <input required type="tel" value={userData.mobile} onChange={e => setUserData({ ...userData, mobile: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none" placeholder="+91 00000 00000" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Email Address</label>
                                        <input required type="email" value={userData.email} onChange={e => setUserData({ ...userData, email: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none" placeholder="rahul@example.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Document Type</label>
                                        <select required value={formData.docType} onChange={e => setFormData({ ...formData, docType: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none">
                                            <option value="">Select Service</option>
                                            <option value="Affidavit">Affidavit</option>
                                            <option value="Rent Agreement">Rent Agreement</option>
                                            <option value="Legal Notice">Legal Notice</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">State</label>
                                        <input required type="text" value={userData.state} onChange={e => setUserData({ ...userData, state: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none" placeholder="Uttar Pradesh" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">City</label>
                                        <input required type="text" value={userData.city} onChange={e => setUserData({ ...userData, city: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none" placeholder="Lucknow" />
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center group">
                                    Next: Document Details <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                                </button>
                            </form>
                        )}

                        {currentStep === 2 && (
                            <form onSubmit={handleDocDetailsSubmit} className="space-y-6 animate-fade-in">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-black uppercase tracking-tight">Step 2: Document Info_</h2>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Provide specific details for {formData.docType}.</p>
                                </div>
                                <div className="space-y-6">
                                    {formData.docType === 'Affidavit' && (
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Affidavit Type</label>
                                            <select required value={formData.affidavitType} onChange={e => setFormData({ ...formData, affidavitType: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none">
                                                <option value="">Select Type</option>
                                                <option value="Gap Year">Gap Year Affidavit</option>
                                                <option value="Name Change">Name Change</option>
                                                <option value="Address Proof">Address Proof</option>
                                                <option value="Income Certificate">Income Certificate</option>
                                            </select>
                                        </div>
                                    )}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Purpose / Content</label>
                                        <textarea required rows={4} value={formData.purpose} onChange={e => setFormData({ ...formData, purpose: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none resize-none" placeholder="Describe the purpose of this document..." />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Full Address for Delivery</label>
                                        <textarea required rows={2} value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full bg-gray-50 border-2 border-transparent focus:border-black rounded-xl p-4 font-bold outline-none resize-none" placeholder="House No, Street, Landmark..." />
                                    </div>
                                </div>
                                <div className="flex space-x-4">
                                    <button type="button" onClick={() => setCurrentStep(1)} className="flex-1 bg-gray-100 text-black py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-200">Back</button>
                                    <button type="submit" className="flex-[2] bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 flex items-center justify-center group">
                                        Next: Payment <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1" />
                                    </button>
                                </div>
                            </form>
                        )}

                        {currentStep === 3 && (
                            <ESignPayment
                                amount={499}
                                docType={formData.docType}
                                userData={{
                                    name: userData.name,
                                    email: userData.email,
                                    mobile: userData.mobile
                                }}
                                adminMode={adminMode}
                                onBack={() => setCurrentStep(2)}
                                onNext={handlePaymentComplete}
                            />
                        )}

                        {currentStep === 4 && (
                            <ESignPreview
                                data={{ ...userData, ...formData }}
                                onBack={() => setCurrentStep(3)}
                                onNext={() => setCurrentStep(5)}
                            />
                        )}

                        {currentStep === 5 && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="mb-8">
                                    <h2 className="text-2xl font-black uppercase tracking-tight">Step 5: Consent & Signature_</h2>
                                    <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">Aadhaar Bypass: Digital Consent Protocol.</p>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-200">
                                        <div className="flex items-start space-x-4">
                                            <div className="mt-1">
                                                <input
                                                    type="checkbox"
                                                    id="consent"
                                                    checked={consentChecked}
                                                    onChange={(e) => setConsentChecked(e.target.checked)}
                                                    className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                                                />
                                            </div>
                                            <label htmlFor="consent" className="text-sm font-bold text-gray-700 leading-relaxed cursor-pointer">
                                                I hereby declare that I have read the document and provide my voluntary consent to ZoyaLegal to process this execution. I understand this replaces physical Aadhaar e-Sign with digital declaration.
                                            </label>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase text-gray-400 ml-1">Upload Photo of your Signature</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setSignatureFile(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            />
                                            <div className="px-8 py-10 border-3 border-gray-100 border-dashed rounded-3xl bg-gray-50 hover:bg-gray-100 transition-all flex flex-col items-center justify-center text-center">
                                                {signatureFile ? (
                                                    <div className="space-y-4">
                                                        <img src={signatureFile} alt="Signature Preview" className="h-20 object-contain mx-auto rounded-lg shadow-sm" />
                                                        <p className="text-[10px] font-black text-green-600 uppercase">Signature Captured_</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <Upload className="h-8 w-8 text-gray-300 mb-2" />
                                                        <p className="text-gray-900 font-bold text-sm">Upload Signature Photo</p>
                                                        <p className="text-gray-400 text-[8px] font-black uppercase tracking-widest">PNG, JPG (Max 5MB)</p>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSignComplete}
                                    disabled={!consentChecked || !signatureFile || loading}
                                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 transition-all ${(!consentChecked || !signatureFile || loading) ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-gray-800 shadow-xl'}`}
                                >
                                    <span>Complete Execution_</span>
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        )}

                        {currentStep === 6 && (
                            <ESignDownload data={{ ...userData, ...formData }} orderId={orderId} />
                        )}
                    </div>
                </div>
            </section>

            {isSigning && (
                <ESignFingerprintSign
                    mobile={userData.mobile}
                    onSuccess={handleSignComplete}
                    onCancel={() => setIsSigning(false)}
                />
            )
            }

            <footer className="bg-white py-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-6">
                        <span className="flex items-center"><Shield className="h-3 w-3 mr-1 text-green-500" /> End-to-End Encrypted</span>
                        <span className="flex items-center"><CheckSquare className="h-3 w-3 mr-1 text-blue-500" /> Digital Consent Protocol</span>
                        <span className="flex items-center"><FileText className="h-3 w-3 mr-1 text-purple-500" /> IT Act 2000 Compliant</span>
                    </div>
                </div>
            </footer>
        </div >
    );
}
