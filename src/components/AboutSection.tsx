import { Link } from 'react-router-dom';
import { Shield, Zap, Globe2, MapPin, CheckCircle2, Cpu, ArrowRight } from 'lucide-react';

export default function AboutSection() {
    return (
        <section className="py-24 bg-white overflow-hidden relative font-sans">
            {/* Background Decorative Elements - High Performance Blurs */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] opacity-60 -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-50/50 rounded-full blur-[120px] opacity-60 translate-y-1/2 -translate-x-1/4 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                    {/* Left Side: 3D Perspective Card Container */}
                    <div className="lg:w-1/2 relative perspective-1000 group">
                        <div className="relative z-10 bg-white p-1 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.08)] border border-gray-100 transform transition-all duration-700 ease-out group-hover:rotate-y-6 group-hover:rotate-x-2 group-hover:scale-[1.03] group-hover:shadow-[0_80px_150px_rgba(37,99,235,0.12)]">
                            <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-[2.8rem] p-10 md:p-14">
                                <div className="flex items-center space-x-5 mb-10">
                                    <div className="h-16 w-16 bg-black rounded-2xl flex items-center justify-center transform -rotate-12 group-hover:rotate-0 transition-all duration-500 shadow-xl group-hover:bg-blue-600">
                                        <Shield className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-3xl font-black text-black tracking-tighter uppercase italic">Zoya Shield_</h3>
                                        <div className="h-1 w-12 bg-blue-600 rounded-full mt-1"></div>
                                    </div>
                                </div>

                                <p className="text-gray-600 font-bold leading-relaxed mb-10 text-xl tracking-tight">
                                    Based in <span className="text-black bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100 uppercase italic text-lg">Husain Ganj, Lucknow</span>, we provide specialized multi-service support through a network of verified professionals.
                                </p>

                                <div className="grid grid-cols-2 gap-5">
                                    {[
                                        { icon: Zap, label: 'Fast Response', desc: 'Real-time AI support' },
                                        { icon: Globe2, label: 'PAN India', desc: 'Digital & On-ground' },
                                        { icon: MapPin, label: 'Expert Verified', desc: 'Certified advocates' },
                                        { icon: Cpu, label: 'AI Powered', desc: 'Secure technology' }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-white p-5 rounded-3xl border border-gray-100 flex flex-col space-y-2 group/item hover:border-black hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1">
                                            <div className="p-2 bg-gray-50 rounded-xl w-fit group-hover/item:bg-black transition-colors">
                                                <item.icon className="h-5 w-5 text-black group-hover/item:text-white" />
                                            </div>
                                            <div>
                                                <div className="text-black font-black text-sm uppercase tracking-wider">{item.label}</div>
                                                <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{item.desc}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 3D Visual Layers (Floating behind) */}
                        <div className="absolute -top-10 -right-10 w-full h-full bg-blue-600/5 rounded-[3rem] -z-10 transform rotate-6 scale-95 blur-sm transition-transform duration-700 group-hover:rotate-12"></div>
                        <div className="absolute -bottom-10 -left-10 w-full h-full bg-black/5 rounded-[3rem] -z-20 transform -rotate-3 scale-90 transition-transform duration-700 group-hover:-rotate-6"></div>

                        {/* Floating Badge */}
                        <div className="absolute -bottom-4 -right-4 bg-black text-white p-6 rounded-3xl shadow-2xl z-20 border border-gray-800 animate-bounce cursor-default hidden md:block group-hover:bg-blue-600 transition-colors duration-500">
                            <div className="text-2xl font-black italic">100%</div>
                            <div className="text-[8px] font-black tracking-[0.3em] uppercase opacity-70">Secured_</div>
                        </div>
                    </div>

                    {/* Right Side: High-Impact Typography & Content */}
                    <div className="lg:w-1/2 flex flex-col justify-center">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-2xl text-xs font-black tracking-[0.2em] uppercase mb-8 border border-blue-100 shadow-sm animate-pulse">
                            <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
                            <span>About Us – ZoyaLegal</span>
                        </div>

                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-black tracking-tighter mb-10 leading-[0.9] uppercase italic">
                            CSC + Advocate <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-200">Multi-Service Center_</span>
                        </h2>

                        <div className="space-y-8">
                            <div className="bg-gradient-to-r from-gray-50 to-white p-8 rounded-[2rem] border-l-8 border-black shadow-sm group hover:shadow-xl transition-all duration-500 transform hover:scale-[1.01]">
                                <p className="text-gray-700 text-lg md:text-xl font-bold leading-relaxed italic">
                                    "ZoyaLegal is a trusted legal, CSC, and business support platform providing AI-powered solutions to individuals, startups, and businesses across India."
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                                {[
                                    { title: 'Law & Technology', desc: 'Fast, accurate, and client-focused solutions.' },
                                    { title: 'Multi-Service Hub', desc: 'From GST to Gulf Visa assistance.' }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex space-x-4 group/box p-4 rounded-2xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-200">
                                        <div className="mt-1">
                                            <div className="h-10 w-10 bg-black rounded-xl flex items-center justify-center group-hover/box:scale-110 transition-transform">
                                                <CheckCircle2 className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h4 className="font-black text-black uppercase tracking-tight mb-1">{item.title}</h4>
                                            <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-widest">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-10 flex flex-wrap gap-4">
                                <Link to="/advocates" className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl flex items-center group">
                                    Explore Hub
                                    <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                                </Link>
                                <div className="flex -space-x-3 items-center ml-4">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-12 w-12 rounded-2xl border-4 border-white bg-gray-200 flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Expert" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                    <div className="pl-6 text-gray-400 font-black text-[10px] tracking-widest uppercase italic">
                                        Backed by <br />
                                        Experts_
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* CSS for 3D Perspective - Adding via inline style for safety */}
            <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-6 {
          transform: rotateY(6deg);
        }
        .rotate-x-2 {
          transform: rotateX(2deg);
        }
      `}</style>
        </section>
    );
}
