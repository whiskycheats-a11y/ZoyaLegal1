import { useEffect, useState } from 'react';
import { Users, Phone, MapPin, Search, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import SkeletonAdvocate from '../components/SkeletonAdvocate';
import TopProgressBar from '../components/TopProgressBar';


import { useBlogs } from '../context/BlogContext';

export default function Advocates() {
    const { advocates, loading, fetchAdvocates } = useBlogs();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchAdvocates();
    }, []);

    const filteredAdvocates = advocates.filter(adv =>
        adv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adv.court.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <TopProgressBar />
            {/* Hero Section */}
            <section className="bg-black text-white py-12 md:py-16 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Users className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 md:mb-6 opacity-80 animate-bounce" />
                    <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight animate-fade-in">Our Registered Advocates</h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay">
                        Connect with experienced legal professionals from across India. Verified experts for all your legal needs.
                    </p>

                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-black transition-all duration-300" />
                        <input
                            type="text"
                            placeholder="Search by name or court..."
                            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-xl border-2 border-gray-700 focus:border-white bg-gray-900 focus:bg-black text-white shadow-2xl transition-all duration-300 outline-none placeholder:text-gray-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Advocates Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
                {loading && filteredAdvocates.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <SkeletonAdvocate key={n} />
                        ))}
                    </div>
                ) : filteredAdvocates.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredAdvocates.map((advocate) => (
                            <div key={advocate._id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-gray-200 group hover:border-black transform hover:-translate-y-2 animate-fade-in">
                                <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
                                    {advocate.photo ? (
                                        <img
                                            src={advocate.photo}
                                            alt={advocate.name}
                                            loading="lazy"
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <Users className="h-20 w-20 text-gray-400" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-black/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center">
                                            <Shield className="h-3.5 w-3.5 mr-1.5" /> Verified Profile
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8">
                                    <h3 className="text-xl md:text-2xl font-black text-black mb-1 group-hover:text-gray-700 transition-colors duration-300">{advocate.name}</h3>
                                    <div className="flex items-center text-gray-600 font-bold text-sm mb-6">
                                        <MapPin className="h-4 w-4 mr-1.5" />
                                        {advocate.court}
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <a
                                            href={`tel:${advocate.phone}`}
                                            className="flex items-center justify-center border-2 border-black text-black px-6 py-3 rounded-xl font-bold hover:bg-black hover:text-white transition-all duration-300 group/btn"
                                        >
                                            View Profile
                                            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </a>
                                    </div>

                                    <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-3">
                                        <a
                                            href={`https://wa.me/${advocate.phone.replace(/[^0-9]/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-[#25D366] text-white py-4 rounded-2xl font-bold hover:bg-[#128C7E] hover:shadow-lg hover:shadow-green-100 transition-all text-center flex items-center justify-center"
                                        >
                                            <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-3.32c1.53.914 3.041 1.387 4.707 1.388 5.647 0 10.243-4.595 10.247-10.242 0-2.735-1.064-5.307-2.996-7.238-1.93-1.931-4.498-2.997-7.234-2.997-5.644 0-10.24 4.594-10.244 10.242-.001 1.83.496 3.623 1.439 5.2l-.906 3.307 3.396-.89zm12.066-10.833c-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.668.149-.198.297-.766.966-.941 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.075-.124-.272-.198-.57-.347z" /></svg>
                                            WhatsApp
                                        </a>
                                        <a
                                            href={`tel:${advocate.phone}`}
                                            className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg group/btn"
                                        >
                                            <Phone className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                                            Call Now
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-sm border border-gray-100">
                        <Users className="h-20 w-20 mx-auto mb-6 text-gray-200" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Advocates Found</h3>
                        <p className="text-gray-500">We couldn't find any advocates matching your search.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-6 text-blue-600 font-bold hover:underline"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </div>

            {/* Register CTA */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
                <div className="bg-black rounded-[2.5rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between shadow-3xl relative overflow-hidden group border border-gray-800">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50"></div>
                    <div className="relative z-10 mb-8 md:mb-0 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">Are you an Advocate?</h2>
                        <p className="text-gray-400 text-lg md:text-xl opacity-90 font-bold">Join our premier network and connect with clients across India.</p>
                    </div>
                    <Link
                        to="/advocate-registration"
                        className="relative z-10 bg-white text-black px-10 py-5 rounded-2xl font-black hover:bg-gray-100 transition-all flex items-center shadow-2xl hover:-translate-y-1 transform active:scale-95 uppercase tracking-widest"
                    >
                        Register Profile Now
                        <ArrowRight className="h-6 w-6 ml-3" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
