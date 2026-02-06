import { Link } from 'react-router-dom';
import {
    ShieldCheck,
    Fingerprint,
    FileText,
    ChevronRight,
    CheckCircle,
    Scale,
    ArrowRight,
    Stamp,
    Lock,
    Zap,
    Clock,
    Briefcase
} from 'lucide-react';

export default function ESignServices() {
    const benefits = [
        {
            icon: ShieldCheck,
            title: 'Legally Binding',
            desc: 'Recognized under IT Act 2000, valid for all legal agreements and court matters.'
        },
        {
            icon: Lock,
            title: 'Tamper-Proof',
            desc: 'Digital signatures use hash-based encryption that breaks if the document is altered.'
        },
        {
            icon: Zap,
            title: 'Instant Execution',
            desc: 'Sign and deliver documents in seconds via Aadhaar OTP, no physical presence needed.'
        },
        {
            icon: Clock,
            title: 'Audit Trail',
            desc: 'Every signature includes a precise timestamp, IP address, and transaction log.'
        }
    ];

    const useCases = [
        { title: 'Rent Agreements', icon: Briefcase },
        { title: 'Legal Notices', icon: Scale },
        { title: 'Affidavits', icon: Stamp },
        { title: 'Business Contracts', icon: FileText }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-black text-white pt-24 pb-32 md:pb-48 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] -mr-96 -mt-96"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md animate-fade-in">
                            <Fingerprint className="h-5 w-5 text-green-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Aadhaar eSign Integration_</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 tracking-tighter leading-tight animate-slide-up">
                            Paperless <span className="text-gray-500 italic">Legal_</span> <br />
                            <span className="text-green-500 underline decoration-white/20 underline-offset-8">Execution.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-gray-400 mb-12 animate-fade-in-delay leading-relaxed font-medium">
                            Aadhaar eSign is fully valid under India’s IT Act 2000.
                            Digitally sign Rent Agreements, Notices, and Affidavits legally, securely, and hassle-free.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 animate-slide-up">
                            <Link
                                to="/esign/process"
                                className="w-full sm:w-auto bg-green-500 text-black px-12 py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-green-400 transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_50px_rgba(34,197,94,0.5)] transform hover:-translate-y-1 flex items-center justify-center group"
                            >
                                Sign Document Now
                                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <div className="flex items-center space-x-4">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-widest text-left">
                                    Trusted by <br />
                                    <span className="text-white">5,000+ Clients_</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="bg-gray-50 py-12 -mt-16 relative z-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 border border-black/5 grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="group border-r border-gray-100 last:border-0 pr-4">
                                <div className="p-3 bg-gray-50 rounded-xl inline-block mb-4 group-hover:bg-black group-hover:text-white transition-all duration-300">
                                    <benefit.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-black text-black uppercase tracking-tight text-sm mb-2">{benefit.title}</h3>
                                <p className="text-xs text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 space-y-4 md:space-y-0 text-center md:text-left">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Applications_</p>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Perfect for all <br />Legal Services_</h2>
                        </div>

                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {useCases.map((use, idx) => (
                            <div key={idx} className="bg-gray-50 p-8 rounded-3xl border border-transparent hover:border-black transition-all group relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <use.icon className="h-20 w-20" />
                                </div>
                                <use.icon className="h-10 w-10 text-black mb-6" />
                                <h3 className="text-xl font-black text-black mb-4 uppercase tracking-tight">{use.title}</h3>
                                <Link to="/esign/process" className="flex items-center text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                                    Create & Sign <ChevronRight className="ml-1 h-3 w-3" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-black text-white py-24 relative">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">How it works_</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest">Client → Document → eSign → Download</p>
                    </div>


                </div>
            </section>

            {/* Cost/CTA Section */}
            <section className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="bg-white rounded-[3rem] p-8 md:p-20 shadow-2xl border-2 border-black flex flex-col lg:flex-row items-center justify-between space-y-12 lg:space-y-0 lg:space-x-12 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -ml-32 -mt-32"></div>

                        <div className="max-w-xl relative z-10">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-none">
                                Get started with <br />
                                <span className="text-green-600">eSign Today_</span>
                            </h2>
                            <p className="text-gray-500 font-medium mb-8">
                                Approx cost per signature is ₹15 – ₹40.
                                Aap client se document ke hisaab se service fee charge kar sakte hain.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="font-bold uppercase tracking-widest text-[10px]">No Physical Document Storage</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="h-5 w-5 text-green-500" />
                                    <span className="font-bold uppercase tracking-widest text-[10px]">100% Secure & Tamper-Proof</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-96 relative z-10">
                            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-inner">
                                <div className="text-center mb-8">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-2">Service Fee</p>
                                    <p className="text-5xl font-black text-black">₹500<span className="text-sm font-bold text-gray-500">/onwards</span></p>
                                </div>
                                <Link
                                    to="/esign/process"
                                    className="w-full bg-black text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center group"
                                >
                                    Create Document
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                                <p className="text-[8px] text-gray-400 text-center mt-6 font-black uppercase tracking-[0.2em]">ZoyaLegal Trusted Services</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final Safety Mention */}
            <footer className="py-12 bg-white text-center">
                <div className="max-w-7xl mx-auto px-4 border-t border-gray-100 pt-12">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">Aadhaar • API • Secure • Legal • Zoya_</p>
                </div>
            </footer>
        </div>
    );
}
