import React, { useEffect, useState } from 'react';
import { Users, Phone, MapPin, Search, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Advocate {
    _id: string;
    name: string;
    phone: string;
    court: string;
    photo?: string;
}

export default function Advocates() {
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        fetch(`${API_BASE_URL}/api/advocates`)
            .then(res => res.json())
            .then(data => {
                setAdvocates(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching advocates:', err);
                setLoading(false);
            });
    }, []);

    const filteredAdvocates = advocates.filter(adv =>
        adv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adv.court.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-700 to-blue-900 text-white py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Users className="h-12 w-12 md:h-16 md:w-16 mx-auto mb-4 md:mb-6 opacity-80 animate-pulse" />
                    <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Our Registered Advocates</h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                        Connect with experienced legal professionals from across India. Verified experts for all your legal needs.
                    </p>

                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search by name or court..."
                            className="w-full pl-12 pr-4 py-3 md:py-4 rounded-2xl border-2 border-transparent focus:border-blue-400 focus:ring-0 text-gray-900 shadow-2xl transition-all outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Advocates Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-12">
                {loading ? (
                    <div className="flex flex-col justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600 mb-4"></div>
                        <p className="text-gray-500 font-medium animat-pulse">Finding advocates...</p>
                    </div>
                ) : filteredAdvocates.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filteredAdvocates.map((advocate) => (
                            <div key={advocate._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group">
                                <div className="relative h-64 md:h-72 overflow-hidden">
                                    {advocate.photo ? (
                                        <img
                                            src={advocate.photo}
                                            alt={advocate.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
                                            <Users className="h-20 w-20 text-blue-200" />
                                        </div>
                                    )}
                                    <div className="absolute top-4 right-4">
                                        <div className="bg-white/90 backdrop-blur-md text-blue-600 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center border border-blue-50">
                                            <Shield className="h-3.5 w-3.5 mr-1.5" /> Verified Profile
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 md:p-8">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{advocate.name}</h3>
                                    <div className="flex items-center text-blue-600 font-semibold text-sm mb-6">
                                        <MapPin className="h-4 w-4 mr-1.5" />
                                        {advocate.court}
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        <a
                                            href={`tel:${advocate.phone}`}
                                            className="flex items-center p-3 bg-gray-50 rounded-2xl text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all group/link"
                                        >
                                            <Phone className="h-5 w-5 mr-3 text-gray-400 group-hover/link:text-blue-500 transition-colors" />
                                            <span className="font-bold">{advocate.phone}</span>
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
                                            className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-100 transition-all text-center flex items-center justify-center"
                                        >
                                            <Phone className="w-5 h-5 mr-2" />
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
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-[2.5rem] p-8 md:p-16 text-white flex flex-col md:flex-row items-center justify-between shadow-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-[0.03] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10 mb-8 md:mb-0 text-center md:text-left">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">Are you an Advocate?</h2>
                        <p className="text-blue-100 text-lg md:text-xl opacity-90">Join our premier network and connect with clients across India.</p>
                    </div>
                    <Link
                        to="/advocate-registration"
                        className="relative z-10 bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-blue-50 transition-all flex items-center shadow-2xl hover:-translate-y-1 transform active:scale-95"
                    >
                        Register Profile Now
                        <ArrowRight className="h-6 w-6 ml-3" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
