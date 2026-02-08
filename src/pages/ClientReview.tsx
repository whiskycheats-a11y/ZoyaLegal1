import { useState, useRef } from 'react';
import { Star, Upload, User, MapPin, Phone, Mail, Send, CheckCircle2, ChevronRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const isProd = import.meta.env.PROD;
const API_BASE_URL = import.meta.env.VITE_API_URL || (isProd ? '' : 'http://localhost:5000');

export default function ClientReview() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        location: '',
        content: '',
        rating: 5,
        image: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post(`${API_BASE_URL}/api/testimonials`, formData);
            setIsSuccess(true);
            window.scrollTo(0, 0);
        } catch (err) {
            console.error('Failed to submit review:', err);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const StarRating = () => {
        return (
            <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="transition-transform hover:scale-110 focus:outline-none"
                    >
                        <Star
                            className={`h-8 w-8 ${star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                                } transition-colors duration-200`}
                        />
                    </button>
                ))}
            </div>
        );
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-gray-50 rounded-[2.5rem] p-12 text-center shadow-2xl border border-gray-100 animate-scale-in">
                    <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-200">
                        <CheckCircle2 className="h-12 w-12 text-white" />
                    </div>
                    <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Thank You!</h2>
                    <p className="text-gray-500 font-medium mb-8">
                        Your review has been submitted successfully. We appreciate your feedback!
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center w-full bg-black text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all group"
                    >
                        Back to Home
                        <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section className="bg-black text-white pt-24 pb-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full mb-8 backdrop-blur-md">
                        <MessageSquare className="h-4 w-4 text-yellow-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300">Client Feedback_</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                        Share Your <span className="text-gray-500 italic">Experience_</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg font-medium">
                        Help us improve by sharing your honest feedback. Your review helps others make informed decisions.
                    </p>
                </div>
            </section>

            {/* Form Section */}
            <section className="-mt-20 pb-24 relative z-20 px-4">
                <div className="max-w-3xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
                    <form onSubmit={handleSubmit} className="p-8 md:p-16 space-y-8">

                        {/* Rating */}
                        <div className="text-center mb-12">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-4">Rate your experience</p>
                            <div className="flex justify-center">
                                <StarRating />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ex. Rahul Kumar"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-bold placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">City / Location</label>
                                <div className="relative group">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        required
                                        type="text"
                                        placeholder="Ex. Lucknow, UP"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-bold placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Mobile Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+91 00000 00000"
                                        value={formData.mobile}
                                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-bold placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        required
                                        type="email"
                                        placeholder="you@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl py-4 pl-12 pr-4 transition-all outline-none font-bold placeholder:text-gray-300"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Review</label>
                            <textarea
                                required
                                rows={4}
                                placeholder="Share your experience with our services..."
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-2xl p-6 transition-all outline-none font-medium placeholder:text-gray-300 resize-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Your Photo (Optional)</label>
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-black hover:bg-gray-50 transition-all group"
                            >
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="h-full w-full object-contain rounded-xl" />
                                ) : (
                                    <>
                                        <div className="p-3 bg-gray-100 rounded-full mb-2 group-hover:bg-white transition-colors">
                                            <Upload className="h-5 w-5 text-gray-400 group-hover:text-black" />
                                        </div>
                                        <p className="text-xs font-bold text-gray-400 group-hover:text-black">Click to upload photo</p>
                                    </>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="pt-8">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest text-lg hover:bg-gray-900 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] transform hover:-translate-y-1"
                            >
                                {isSubmitting ? (
                                    'Publishing Review...'
                                ) : (
                                    <>
                                        Submit Review
                                        <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </>
                                )}
                            </button>
                            <p className="text-[10px] text-gray-400 text-center mt-4 font-bold uppercase tracking-widest">
                                By submitting, you agree to allow us to feature your review on our website.
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
}
