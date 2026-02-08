import React, { useState, useEffect } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader2, ShieldCheck, ArrowRight, Search, CheckSquare, CreditCard, Download, Clock, Truck } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { generateLegalPDF } from '../utils/pdfGenerator';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ClientPortal() {
    const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

    // Submission State
    const [clientName, setClientName] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<{ data: string; fileName: string; fileType: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    // Tracking State
    const [trackOrderId, setTrackOrderId] = useState('');
    const [orderData, setOrderData] = useState<any>(null);
    const [isTracking, setIsTracking] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const newFiles: { data: string; fileName: string; fileType: string }[] = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            if (file.size > 10 * 1024 * 1024) {
                setStatus({ type: 'error', message: `File ${file.name} is too large. Max size is 10MB.` });
                continue;
            }
            const reader = new FileReader();
            try {
                const fileContent = await new Promise<string>((resolve, reject) => {
                    reader.onload = (e) => resolve(e.target?.result as string);
                    reader.onerror = () => reject(new Error("File read failed"));
                    reader.readAsDataURL(file);
                });
                newFiles.push({ data: fileContent, fileName: file.name, fileType: file.type });
            } catch (err) { console.error("Error reading file:", err); }
        }
        setFiles(prev => [...prev, ...newFiles]);
        if (status.type === 'error') setStatus({ type: null, message: '' });
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName.trim() || files.length === 0) {
            setStatus({ type: 'error', message: 'Please provide name and at least one file.' });
            return;
        }
        setIsSubmitting(true);
        setStatus({ type: null, message: '' });
        try {
            await axios.post(`${API_BASE_URL}/api/submissions`, { clientName, description, files });
            setStatus({ type: 'success', message: 'Documents submitted successfully!' });
            setClientName(''); setDescription(''); setFiles([]);
        } catch (err: any) {
            setStatus({ type: 'error', message: err.response?.data?.message || 'Submission failed' });
        } finally { setIsSubmitting(false); }
    };

    const handleTrackOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!trackOrderId.trim()) return;
        setIsTracking(true);
        setOrderData(null);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/orders/${trackOrderId}`);
            setOrderData(res.data);
        } catch (err) {
            setStatus({ type: 'error', message: 'Order not found. Please check your ID.' });
        } finally { setIsTracking(false); }
    };

    const handleDownloadPDF = async (isDraft: boolean) => {
        if (!orderData) return;

        // 1. DRAFT PDF LOGIC
        if (isDraft) {
            // If Admin has set a specific draft URL, use it (BUT ignore the old sample demo URL)
            const draftUrl = orderData.documents?.draftPdf;
            if (draftUrl?.startsWith('http') && !draftUrl.includes('sample.pdf') && !draftUrl.includes('mock-esign')) {
                window.open(draftUrl, '_blank');
                return;
            }
            // Otherwise (or if it was the sample URL), generate it dynamically locally
            await generateLegalPDF({
                orderId: orderData._id,
                userName: orderData.userData?.name || 'Valued Client',
                docType: orderData.serviceType || 'Legal Document',
                date: new Date(orderData.createdAt).toLocaleDateString(),
                formData: orderData.formData,
                isDraft: true,
                signatureUrl: orderData.documents?.uploadedSignature
            });
            return;
        }

        // 2. FINAL PDF LOGIC
        // If Admin has provided the Final PDF Link, OPEN IT.
        if (orderData.documents?.finalPdf && orderData.documents.finalPdf.length > 5) {
            let url = orderData.documents.finalPdf;
            if (!url.startsWith('http')) {
                url = 'https://' + url;
            }
            window.open(url, '_blank');
            return;
        }

        // Fallback: Generate a final PDF locally (only if no link exists)
        // This is usually just for testing if the admin hasn't pasted a link yet
        await generateLegalPDF({
            orderId: orderData._id,
            userName: orderData.userData?.name || 'Valued Client',
            docType: orderData.serviceType || 'Legal Document',
            date: new Date(orderData.createdAt).toLocaleDateString(),
            formData: orderData.formData,
            isDraft: false,
            signatureUrl: orderData.documents?.uploadedSignature
        });
    };

    const getStatusStep = (status: string) => {
        switch (status) {
            case 'PENDING': return 0;
            case 'FORM_SUBMITTED': return 1;
            case 'PAYMENT_SUCCESS': return 2;
            case 'PROCESSING': return 3;
            case 'ESIGN_COMPLETED': return 4;
            case 'COMPLETED': return 5;
            default: return 0;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4 mt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl mx-auto">

                {/* Tab Switcher */}
                <div className="flex p-1.5 bg-gray-200/50 backdrop-blur-md rounded-2xl mb-8 w-fit mx-auto border border-gray-200 shadow-sm">
                    <button
                        onClick={() => setActiveTab('submit')}
                        className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'submit' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:text-black'}`}
                    >
                        Submit Documents
                    </button>
                    <button
                        onClick={() => setActiveTab('track')}
                        className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${activeTab === 'track' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:text-black'}`}
                    >
                        Track e-Sign Order
                    </button>
                </div>

                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-black p-10 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="inline-flex p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
                                {activeTab === 'submit' ? <ShieldCheck className="h-8 w-8 text-white" /> : <Search className="h-8 w-8 text-white" />}
                            </div>
                            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                                {activeTab === 'submit' ? 'Client Portal_' : 'Track Order_'}
                            </h1>
                            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">
                                {activeTab === 'submit' ? 'Secure Document Submission' : 'Live Status Tracking'}
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>
                    </div>

                    <div className="p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {status.type && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                                    className={`mb-8 p-5 rounded-2xl flex items-start space-x-4 ${status.type === 'success' ? 'bg-green-50 text-green-800 border-2 border-green-100' : 'bg-red-50 text-red-800 border-2 border-red-100'}`}
                                >
                                    {status.type === 'success' ? <CheckCircle className="h-6 w-6 shrink-0 mt-0.5" /> : <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />}
                                    <div className="flex-1">
                                        <p className="font-black uppercase tracking-wider text-xs mb-1">{status.type === 'success' ? 'Success' : 'Error'}</p>
                                        <p className="font-bold text-sm leading-relaxed">{status.message}</p>
                                    </div>
                                    <button onClick={() => setStatus({ type: null, message: '' })}><X className="h-5 w-5 opacity-40 hover:opacity-100" /></button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {activeTab === 'submit' ? (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Submission Form Content */}
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Full Name / Case Reference</label>
                                        <input type="text" required placeholder="e.g., John Doe / SL-12345" value={clientName} onChange={(e) => setClientName(e.target.value)}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black transition-all font-bold placeholder:text-gray-300 text-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Additional Details (Optional)</label>
                                        <textarea placeholder="Describe the attached documents..." value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black transition-all font-bold placeholder:text-gray-300 resize-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Upload Documents</label>
                                        <div className="relative">
                                            <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                            <div className="px-8 py-12 border-3 border-gray-100 border-dashed rounded-[2rem] bg-gray-50 hover:bg-gray-100 hover:border-black/20 transition-all group flex flex-col items-center justify-center text-center">
                                                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                                    <Upload className="h-8 w-8 text-gray-400 group-hover:text-black transition-colors" />
                                                </div>
                                                <p className="text-gray-900 font-black text-sm mb-1">Click to select or drag and drop</p>
                                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">PDF, Images (Max 10MB)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <AnimatePresence>
                                    {files.length > 0 && (
                                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                                            {files.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-white rounded-2xl shadow-sm">
                                                    <div className="flex items-center space-x-4 overflow-hidden">
                                                        <FileText className="h-5 w-5 text-black shrink-0" />
                                                        <p className="text-sm font-black text-gray-900 truncate">{file.fileName}</p>
                                                    </div>
                                                    <button type="button" onClick={() => removeFile(index)} className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-all"><X className="h-5 w-5" /></button>
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button type="submit" disabled={isSubmitting} className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 transition-all ${isSubmitting ? 'bg-gray-100 text-gray-400' : 'bg-black text-white hover:bg-gray-800 shadow-xl group'}`}>
                                    {isSubmitting ? <Loader2 className="h-6 w-6 animate-spin" /> : <><span>Submit Documents</span><ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" /></>}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-12">
                                <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 relative group">
                                        <input
                                            type="text"
                                            required
                                            placeholder="Enter Order ID (e.g., 65c...)"
                                            value={trackOrderId}
                                            onChange={(e) => setTrackOrderId(e.target.value)}
                                            autoComplete="off"
                                            spellCheck={false}
                                            className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black transition-all font-bold placeholder:text-gray-300 pr-24"
                                        />
                                        <button
                                            type="button"
                                            onClick={async () => {
                                                try {
                                                    const text = await navigator.clipboard.readText();
                                                    setTrackOrderId(text);
                                                } catch (err) {
                                                    alert("Browser blocked clipboard access. Please manually paste or type.");
                                                }
                                            }}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-200 hover:bg-black hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                                        >
                                            Paste
                                        </button>
                                    </div>
                                    <button type="submit" disabled={isTracking} className="bg-black text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center disabled:bg-gray-200 shadow-xl active:scale-[0.98]">
                                        {isTracking ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Track Order'}
                                    </button>
                                </form>

                                {orderData && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                        <div className="flex justify-end">
                                            <button
                                                onClick={(e) => handleTrackOrder(e)}
                                                className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                                            >
                                                <Clock className="h-4 w-4" />
                                                <span>Refresh Status</span>
                                            </button>
                                        </div>
                                        {/* Dashboard Metrics */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                                <h4 className="font-black text-black uppercase tracking-tighter text-xl">{orderData.status.replace(/_/g, ' ')}</h4>
                                            </div>
                                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Document</p>
                                                <h4 className="font-black text-black uppercase tracking-tighter text-xl truncate">{orderData.formData?.docType || 'Legal Doc'}</h4>
                                            </div>
                                            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment</p>
                                                <h4 className={`font-black uppercase tracking-tighter text-xl ${orderData.payment?.status === 'SUCCESS' ? 'text-green-600' : 'text-orange-600'}`}>
                                                    {orderData.payment?.status || 'PENDING'}
                                                </h4>
                                            </div>
                                        </div>

                                        {/* Progress Timeline */}
                                        <div className="relative pt-8 pb-4 px-4 overflow-hidden">
                                            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 rounded-full"></div>
                                            <div
                                                className="absolute top-1/2 left-0 h-1 bg-black -translate-y-1/2 rounded-full transition-all duration-1000"
                                                style={{ width: `${(getStatusStep(orderData.status) / 5) * 100}%` }}
                                            ></div>

                                            <div className="relative flex justify-between">
                                                {[
                                                    { icon: FileText, label: 'Form' },
                                                    { icon: CreditCard, label: 'Pay' },
                                                    { icon: Search, label: 'Draft' },
                                                    { icon: CheckSquare, label: 'Consent' },
                                                    { icon: Truck, label: 'Notary' },
                                                    { icon: CheckCircle, label: 'Done' }
                                                ].map((step, i) => {
                                                    const isActive = getStatusStep(orderData.status) >= i;
                                                    return (
                                                        <div key={i} className="flex flex-col items-center">
                                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 z-10 ${isActive ? 'bg-black text-white scale-110 shadow-lg' : 'bg-gray-100 text-gray-400 ring-4 ring-white'}`}>
                                                                <step.icon className="h-5 w-5" />
                                                            </div>
                                                            <p className={`mt-3 text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-black' : 'text-gray-400'}`}>{step.label}</p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        {/* Quick Actions */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                disabled={!orderData}
                                                onClick={() => handleDownloadPDF(true)}
                                                className="p-5 rounded-2xl bg-gray-100 text-black font-black uppercase tracking-widest hover:bg-gray-200 transition-all flex items-center justify-center disabled:opacity-40"
                                            >
                                                <Download className="h-5 w-5 mr-3" />
                                                Download Draft
                                            </button>
                                            <button
                                                disabled={orderData.status !== 'COMPLETED'}
                                                onClick={() => handleDownloadPDF(false)}
                                                className="p-5 rounded-2xl bg-black text-white font-black uppercase tracking-widest hover:bg-gray-800 transition-all flex items-center justify-center disabled:opacity-40"
                                            >
                                                <ShieldCheck className="h-5 w-5 mr-3" />
                                                Final Document
                                            </button>
                                        </div>

                                        {/* Status Message */}
                                        <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start space-x-4">
                                            <Clock className="h-6 w-6 text-blue-600 shrink-0 mt-1" />
                                            <div>
                                                <h5 className="font-black text-blue-900 uppercase tracking-tight mb-1">Current Status Detail_</h5>
                                                <p className="text-sm text-blue-800 font-medium leading-relaxed">
                                                    {orderData.status === 'COMPLETED' ? 'Your legal document has been notarized and is ready for download.' :
                                                        orderData.status === 'NOTARY_ASSIGNED' ? 'Notary has been assigned and is verifying the signed document.' :
                                                            orderData.status === 'ESIGN_COMPLETED' ? 'eSign process is complete. Waiting for notary assignment.' :
                                                                'Your order is in progress. Please complete any pending steps.'}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-center mt-8 text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    End-to-End Encrypted & Secure Portal
                </p>
            </motion.div>
        </div>
    );
}

