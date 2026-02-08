import { Download, CheckCircle, Share2, Mail, ExternalLink, ShieldCheck, FileText, ChevronRight } from 'lucide-react';
import { generateLegalPDF } from '../../utils/pdfGenerator';
import { Link } from 'react-router-dom';

interface FormData {
    name: string;
    mobile: string;
    email: string;
    docType: string;
    affidavitType?: string;
    purpose?: string;
    address?: string;
    state?: string;
    city?: string;
}

interface Props {
    data: FormData;
    orderId: string | null;
}

import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ESignDownload({ data, orderId }: Props) {
    const [status, setStatus] = useState<string>('ESIGN_COMPLETED');
    const [orderData, setOrderData] = useState<any>(null);

    useEffect(() => {
        if (orderId) {
            const interval = setInterval(async () => {
                try {
                    const res = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`);
                    setStatus(res.data.status);
                    setOrderData(res.data);
                    if (res.data.status === 'COMPLETED') {
                        clearInterval(interval);
                    }
                } catch (err) {
                    console.error("Status fetch error:", err);
                }
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [orderId]);

    const timestamp = new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const isCompleted = status === 'COMPLETED';

    return (
        <div className="animate-fade-in">
            <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center p-4 rounded-full mb-6 ${isCompleted ? 'bg-green-50' : 'bg-blue-50'}`}>
                    {isCompleted ? <CheckCircle className="h-16 w-16 text-green-500" /> : <ShieldCheck className="h-16 w-16 text-blue-500 animate-pulse" />}
                </div>
                <h2 className="text-4xl font-black text-black uppercase tracking-tight mb-4">
                    {isCompleted ? 'Final Document Ready!_' : 'Sent for Notarization_'}
                </h2>
                <p className="text-gray-500 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
                    {isCompleted
                        ? 'Your document has been signed and notarized successfully. You can now download the final legally binding version.'
                        : 'Aadhaar eSign is complete. Your document is now being forwarded to our authorized notary for final sealing and delivery.'}
                </p>
            </div>

            <div className="bg-white rounded-3xl border-2 border-black shadow-xl overflow-hidden mb-12">
                <div className="bg-black text-white p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-1">Signed Document</p>
                            <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter">{data.docType}</h3>
                        </div>
                        <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-md">
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">Order ID (Reference)</p>
                            <p className="font-mono font-bold text-white uppercase">{orderId || 'PENDING'}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        <div className="space-y-4">
                            <div className="flex border-b border-gray-100 pb-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-32">Signatory</p>
                                <p className="font-bold text-black">{data.name}</p>
                            </div>
                            <div className="flex border-b border-gray-100 pb-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-32">Mobile</p>
                                <p className="font-bold text-black">{data.mobile}</p>
                            </div>
                            <div className="flex border-b border-gray-100 pb-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-32">Email</p>
                                <p className="font-bold text-black lowercase">{data.email}</p>
                            </div>
                            <div className="flex border-b border-gray-100 pb-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-32">Location</p>
                                <p className="font-bold text-black">{data.city}, {data.state}</p>
                            </div>
                            <div className="flex border-b border-gray-100 pb-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-32">Address</p>
                                <p className="font-bold text-black">{data.address}</p>
                            </div>
                            <div className="flex border-b border-gray-100 pb-3">
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 w-32">Timestamp</p>
                                <p className="font-bold text-black">{timestamp}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col items-center justify-center text-center">
                            <ShieldCheck className="h-12 w-12 text-green-600 mb-4" />
                            <p className="text-sm font-bold text-black mb-1">Legal Validity Verified</p>
                            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest">Digital Audit Trail Embedded</p>
                        </div>
                    </div>

                    {orderData?.documents?.uploadedSignature && (
                        <div className="mb-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 border-2 border-green-200">
                            <div className="flex items-center space-x-2 mb-4">
                                <ShieldCheck className="h-5 w-5 text-green-600" />
                                <h3 className="text-xs font-black uppercase tracking-wider text-gray-700">Digital Consent Proof_</h3>
                            </div>
                            <div className="bg-white rounded-xl p-4 border border-gray-200 flex items-center justify-center">
                                <img
                                    src={orderData.documents.uploadedSignature}
                                    alt="Your Signature"
                                    className="h-24 object-contain cursor-pointer hover:scale-110 transition-transform"
                                    onClick={() => window.open(orderData.documents.uploadedSignature, '_blank')}
                                />
                            </div>
                            <p className="mt-3 text-[10px] font-bold text-center text-gray-600 uppercase tracking-widest">
                                ✓ Signature Verified & Recorded on {timestamp}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        <button
                            disabled={!isCompleted}
                            onClick={async () => {
                                await generateLegalPDF({
                                    orderId: orderId || 'FINAL-X',
                                    userName: data.name,
                                    docType: data.docType,
                                    date: timestamp,
                                    formData: data,
                                    isDraft: false,
                                    signatureUrl: orderData?.documents?.uploadedSignature
                                });
                            }}
                            className="flex-1 bg-black text-white py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-2xl flex items-center justify-center group active:scale-[0.98] disabled:bg-gray-200 disabled:shadow-none"
                        >
                            <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                            {isCompleted ? 'Download Final PDF' : 'Final Processing...'}
                        </button>
                        <button className="flex-1 border-2 border-black text-black py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center group active:scale-[0.98]">
                            <Share2 className="mr-2 h-5 w-5" />
                            Share Link
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 group hover:border-blue-300 transition-colors">
                    <Mail className="h-8 w-8 text-blue-600 mb-4" />
                    <h4 className="font-bold text-black mb-2">Email Delivery</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">A copy of the signed document has been sent to your email address: {data.email}</p>
                </div>
                <div className="bg-purple-50 p-6 rounded-2xl border border-purple-100 group hover:border-purple-300 transition-colors">
                    <FileText className="h-8 w-8 text-purple-600 mb-4" />
                    <h4 className="font-bold text-black mb-2">Document Log</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">You can access this and other documents anytime from your Client Portal.</p>
                </div>
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100 group hover:border-orange-300 transition-colors">
                    <ExternalLink className="h-8 w-8 text-orange-600 mb-4" />
                    <h4 className="font-bold text-black mb-2">Legal Verification</h4>
                    <p className="text-xs text-gray-600 leading-relaxed font-medium">Scan the QR code on the signed PDF to verify its authenticity online.</p>
                </div>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-100 text-center">
                <Link
                    to="/"
                    className="inline-flex items-center text-black font-black uppercase tracking-widest hover:underline group"
                >
                    Back to Home
                    <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}
