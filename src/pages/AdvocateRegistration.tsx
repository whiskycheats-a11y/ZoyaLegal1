import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Phone, Gavel, Image as ImageIcon, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function AdvocateRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        court: '',
        photo: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, photo: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/api/advocates`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setTimeout(() => navigate('/advocates'), 3000);
            } else {
                alert('Failed to register. Please try again.');
            }
        } catch (err) {
            console.error('Error registering advocate:', err);
            alert('Error connecting to server. Please ensure backend is running.');
        } finally {
            setSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 text-center border border-blue-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-green-500"></div>
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">Your profile has been saved to our database. Redirecting you to the list...</p>
                    <button
                        onClick={() => navigate('/advocates')}
                        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-100"
                    >
                        Go to Advocates List
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 md:py-16 px-4">
            <div className="max-w-2xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-500 hover:text-blue-600 mb-6 md:mb-8 transition-colors font-bold group"
                >
                    <div className="p-2 bg-white rounded-xl shadow-sm mr-3 group-hover:bg-blue-50 transition-colors">
                        <ArrowLeft className="h-5 w-5" />
                    </div>
                    Back to List
                </button>

                <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 md:p-12 text-white relative">
                        <ShieldCheck className="absolute top-10 right-10 h-20 w-20 opacity-10 animate-pulse" />
                        <h1 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight">Advocate Registration</h1>
                        <p className="text-blue-100 text-lg opacity-90 leading-relaxed">Join India's premier legal network and connect with clients seeking expert representation.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                            {/* Name */}
                            <div className="space-y-2.5">
                                <label className="text-sm font-bold text-gray-700 flex items-center ml-1">
                                    <User className="h-4 w-4 mr-2 text-blue-500" /> Full Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Adv. Rajesh Sharma"
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-medium text-gray-900 shadow-sm"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>

                            {/* Phone */}
                            <div className="space-y-2.5">
                                <label className="text-sm font-bold text-gray-700 flex items-center ml-1">
                                    <Phone className="h-4 w-4 mr-2 text-blue-500" /> Phone Number
                                </label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="e.g. +91 9454950104"
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-medium text-gray-900 shadow-sm"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Court */}
                        <div className="space-y-2.5">
                            <label className="text-sm font-bold text-gray-700 flex items-center ml-1">
                                <Gavel className="h-4 w-4 mr-2 text-blue-500" /> Court / Jurisdiction
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="e.g. High Court Lucknow / Supreme Court"
                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-50 bg-gray-50 focus:bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-50/50 transition-all outline-none font-medium text-gray-900 shadow-sm"
                                value={formData.court}
                                onChange={(e) => setFormData({ ...formData, court: e.target.value })}
                            />
                        </div>

                        {/* Photo Upload */}
                        <div className="space-y-3">
                            <label className="text-sm font-bold text-gray-700 flex items-center ml-1">
                                <ImageIcon className="h-4 w-4 mr-2 text-blue-500" /> Professional Profile Photo
                            </label>
                            <div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-4 sm:space-y-0 p-6 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 group-hover:border-blue-200 transition-colors">
                                <div className="w-28 h-28 rounded-2xl bg-white shadow-xl flex items-center justify-center overflow-hidden flex-shrink-0 border-4 border-white ring-1 ring-gray-100">
                                    {formData.photo ? (
                                        <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center">
                                            <ImageIcon className="h-10 w-10 text-gray-200 mx-auto" />
                                            <span className="text-[10px] text-gray-400 font-bold uppercase mt-1 block">Preview</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 text-center sm:text-left">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                            id="photo-upload"
                                        />
                                        <label
                                            htmlFor="photo-upload"
                                            className="cursor-pointer bg-white text-blue-600 px-6 py-3 rounded-xl border-2 border-blue-50 font-bold hover:bg-blue-600 hover:text-white transition-all shadow-sm inline-block"
                                        >
                                            Choose Profile Image
                                        </label>
                                    </div>
                                    <p className="mt-3 text-sm text-gray-400 font-medium">Clear face photo recommended. Max size 2MB.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-5 rounded-2xl font-bold text-white shadow-2xl transition-all transform active:scale-[0.98] flex items-center justify-center text-lg ${submitting
                                    ? 'bg-blue-400 cursor-wait'
                                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-blue-100 hover:-translate-y-1'
                                    }`}
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                                        Registering Profile...
                                    </>
                                ) : 'Complete Advocate Registration'}
                            </button>
                        </div>

                        <p className="text-center text-sm text-gray-400 font-medium">
                            By registering, you agree to connect with clients seeking legal services through ZoyaLegal.
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
