import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBlogs } from '../context/BlogContext';
import { Quote, ChevronLeft, ChevronRight, User, Star, ArrowRight } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
    const { testimonials, language } = useBlogs();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying || testimonials.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, testimonials.length]);

    if (testimonials.length === 0) return null;

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        setIsAutoPlaying(false);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setIsAutoPlaying(false);
    };

    return (
        <section className="py-24 bg-white overflow-hidden relative">
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gray-50 rounded-bl-[10rem] -z-10" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-gray-50 rounded-tr-[8rem] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-full mb-6">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">{language === 'en' ? 'Client Trust' : 'ग्राहक का विश्वास'}</span>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter uppercase italic leading-[0.9]">
                            {language === 'en' ? 'Voices of_' : 'ग्राहकों की_'}<br />
                            <span className="text-gray-300">{language === 'en' ? 'Satisfaction' : 'संतुष्टि'}</span>
                        </h2>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            onClick={prev}
                            className="h-14 w-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-95"
                        >
                            <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button
                            onClick={next}
                            className="h-14 w-14 rounded-2xl border-2 border-gray-100 flex items-center justify-center hover:bg-black hover:text-white transition-all active:scale-95"
                        >
                            <ChevronRight className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute -top-10 -left-10 opacity-[0.03] rotate-[-15deg]">
                        <Quote className="h-64 w-64 text-black fill-current" />
                    </div>

                    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                        {/* Image Side */}
                        <div className="lg:col-span-5 relative">
                            <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl relative">
                                {testimonials.map((t, i) => (
                                    <div
                                        key={t._id}
                                        className={`absolute inset-0 transition-all duration-1000 transform ${i === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'
                                            }`}
                                    >
                                        {t.image ? (
                                            <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                <User className="h-32 w-32 text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-8 rounded-[2rem] shadow-xl border border-gray-50 hidden md:block">
                                <div className="flex items-center space-x-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} className="h-4 w-4 text-black fill-current" />
                                    ))}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-black">Verified Client Review</p>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="lg:col-span-7 flex flex-col justify-center">
                            <div className="relative h-[300px] md:h-[400px]">
                                {testimonials.map((t, i) => (
                                    <div
                                        key={t._id}
                                        className={`absolute inset-0 transition-all duration-700 transform ${i === currentIndex ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12 pointer-events-none'
                                            }`}
                                    >
                                        <div className="h-1 w-20 bg-black mb-12" />
                                        <p className="text-2xl md:text-4xl font-black text-black leading-tight mb-12 italic">
                                            "{t.content}"
                                        </p>
                                        <div>
                                            <h4 className="text-xl font-black text-black uppercase tracking-tighter italic">{t.name}_</h4>
                                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mt-2">{t.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Indicators */}
                            <div className="flex items-center justify-between mt-10 border-t border-gray-100 pt-8">
                                <div className="flex space-x-3">
                                    {testimonials.map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => {
                                                setCurrentIndex(i);
                                                setIsAutoPlaying(false);
                                            }}
                                            className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-12 bg-black' : 'w-4 bg-gray-200'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <Link
                                    to="/write-review"
                                    className="hidden md:flex items-center text-sm font-black uppercase tracking-widest text-black hover:text-blue-600 transition-colors group"
                                >
                                    Share Your Experience
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Mobile Only Button */}
                            <Link
                                to="/write-review"
                                className="md:hidden mt-8 w-full bg-black text-white py-4 rounded-xl flex items-center justify-center font-bold uppercase tracking-widest text-sm"
                            >
                                Share Your Experience
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
