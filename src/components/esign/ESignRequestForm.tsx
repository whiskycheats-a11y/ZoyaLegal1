import React, { useState } from 'react';
import { User, Phone, Mail, FileText, ChevronRight } from 'lucide-react';

interface FormData {
    name: string;
    mobile: string;
    email: string;
    docType: string;
    details: string;
}

interface Props {
    onNext: (data: FormData) => void;
    initialData: FormData;
}

export default function ESignRequestForm({ onNext, initialData }: Props) {
    const [formData, setFormData] = useState<FormData>(initialData);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onNext(formData);
    };

    const docTypes = [
        'Rent Agreement',
        'Legal Notice',
        'Affidavit',
        'Partnership Deed',
        'Employment Contract',
        'Other Legal Document'
    ];

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-2">Step 1: Document Details_</h2>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Please provide the necessary information for the document.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name (As per Aadhaar)</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                required
                                type="text"
                                placeholder="Ex. Rahul Kumar"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl py-4 pl-12 pr-4 transition-all outline-none font-bold placeholder:text-gray-300 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Aadhaar Linked Mobile</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                required
                                type="tel"
                                placeholder="Ex. +91 98765 43210"
                                value={formData.mobile}
                                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl py-4 pl-12 pr-4 transition-all outline-none font-bold placeholder:text-gray-300 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <input
                                required
                                type="email"
                                placeholder="Ex. rahul@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl py-4 pl-12 pr-4 transition-all outline-none font-bold placeholder:text-gray-300 shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Document Type</label>
                        <div className="relative">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <select
                                required
                                value={formData.docType}
                                onChange={(e) => setFormData({ ...formData, docType: e.target.value })}
                                className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl py-4 pl-12 pr-4 transition-all outline-none font-bold appearance-none shadow-sm cursor-pointer"
                            >
                                <option value="">Select Document Type</option>
                                {docTypes.map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Document Details (Brief)</label>
                    <textarea
                        required
                        placeholder="Please enter key details (Address, Rent amount, Parties involved, etc.)"
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        rows={4}
                        className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-xl py-4 px-4 transition-all outline-none font-bold placeholder:text-gray-300 shadow-sm resize-none"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center transform hover:-translate-y-1 group"
                    >
                        Generate Preview
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                    🛡️ Your data is encrypted and secure. We do not store Aadhaar numbers.
                </p>
            </form>
        </div>
    );
}
