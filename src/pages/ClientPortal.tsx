import React, { useState, useEffect } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader2, ShieldCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function ClientPortal() {
    const [clientName, setClientName] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<{ data: string; fileName: string; fileType: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    useEffect(() => {
        console.log("Client Portal Mounted");
    }, []);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const newFiles: { data: string; fileName: string; fileType: string }[] = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];

            // Basic size check (10MB)
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

                newFiles.push({
                    data: fileContent,
                    fileName: file.name,
                    fileType: file.type
                });
            } catch (err) {
                console.error("Error reading file:", err);
            }
        }

        setFiles(prev => [...prev, ...newFiles]);
        if (status.type === 'error') setStatus({ type: null, message: '' });
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName.trim()) {
            setStatus({ type: 'error', message: 'Please provide your full name or case reference.' });
            return;
        }
        if (files.length === 0) {
            setStatus({ type: 'error', message: 'Please upload at least one file.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        try {
            await axios.post(`${API_BASE_URL}/api/submissions`, {
                clientName,
                description,
                files
            });

            setStatus({ type: 'success', message: 'Your documents have been securely submitted to ZoyaLegal. We will review them shortly.' });
            setClientName('');
            setDescription('');
            setFiles([]);
        } catch (err: any) {
            console.error('Upload failed:', err);
            let errorMessage = err.response?.data?.message || err.message || 'Failed to submit files.';

            if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
                errorMessage = 'Backend Server Offline. Please ensure the ZoyaLegal server is running.';
            }

            setStatus({ type: 'error', message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-20 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
            >
                <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
                    <div className="bg-black p-10 text-center relative overflow-hidden">
                        <div className="relative z-10">
                            <div className="inline-flex p-3 bg-white/10 rounded-2xl mb-4 backdrop-blur-sm">
                                <ShieldCheck className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Client Portal_</h1>
                            <p className="text-gray-400 text-xs font-black uppercase tracking-[0.2em]">Secure Document Submission</p>
                        </div>
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24 blur-2xl"></div>
                    </div>

                    <div className="p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {status.type && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className={`mb-8 p-5 rounded-2xl flex items-start space-x-4 ${status.type === 'success'
                                        ? 'bg-green-50 text-green-800 border-2 border-green-100'
                                        : 'bg-red-50 text-red-800 border-2 border-red-100'
                                        }`}
                                >
                                    {status.type === 'success'
                                        ? <CheckCircle className="h-6 w-6 shrink-0 mt-0.5" />
                                        : <AlertCircle className="h-6 w-6 shrink-0 mt-0.5" />
                                    }
                                    <div>
                                        <p className="font-black uppercase tracking-wider text-xs mb-1">
                                            {status.type === 'success' ? 'Success' : 'Submission Error'}
                                        </p>
                                        <p className="font-bold text-sm leading-relaxed">{status.message}</p>
                                    </div>
                                    <button onClick={() => setStatus({ type: null, message: '' })} className="shrink-0 opacity-50 hover:opacity-100 transition-opacity">
                                        <X className="h-5 w-5" />
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Full Name / Case Reference</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g., John Doe / SL-12345"
                                        value={clientName}
                                        onChange={(e) => setClientName(e.target.value)}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black transition-all font-bold placeholder:text-gray-300 text-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Additional Details (Optional)</label>
                                    <textarea
                                        placeholder="Describe the attached documents..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={4}
                                        className="w-full px-6 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-black transition-all font-bold placeholder:text-gray-300 resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">Upload Documents & Evidence</label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="px-8 py-12 border-3 border-gray-100 border-dashed rounded-[2rem] bg-gray-50 hover:bg-gray-100 hover:border-black/20 transition-all group flex flex-col items-center justify-center text-center">
                                            <div className="p-4 bg-white rounded-2xl shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                                <Upload className="h-8 w-8 text-gray-400 group-hover:text-black transition-colors" />
                                            </div>
                                            <p className="text-gray-900 font-black text-sm mb-1">Click to select or drag and drop</p>
                                            <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">PDF, Images, Videos (Max 10MB)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {files.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="space-y-3"
                                    >
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Queue ({files.length} items)</p>
                                        <div className="grid gap-3">
                                            {files.map((file, index) => (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    key={index}
                                                    className="flex items-center justify-between p-4 bg-gray-50 border-2 border-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                                                >
                                                    <div className="flex items-center space-x-4 overflow-hidden">
                                                        <div className="p-2.5 bg-black rounded-xl shrink-0 shadow-lg">
                                                            <FileText className="h-5 w-5 text-white" />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-black text-gray-900 truncate">{file.fileName}</p>
                                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">{file.fileType || 'binary/data'}</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFile(index)}
                                                        className="p-2 hover:bg-red-50 hover:text-red-500 rounded-xl transition-all"
                                                    >
                                                        <X className="h-5 w-5" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="bg-white p-6 rounded-[2rem] border-2 border-gray-100 mb-6 relative overflow-hidden group shadow-[0_10px_30px_rgba(37,99,235,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-700 transform hover:-translate-y-1">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-blue-500/10 transition-colors duration-700"></div>
                                <p className="text-[12px] text-gray-600 font-medium leading-relaxed relative z-10">
                                    <span className="text-black font-black uppercase tracking-[0.2em] mb-2 flex items-center">
                                        <ShieldCheck className="h-4 w-4 mr-2 text-blue-600 animate-pulse" /> Secure Processing_
                                    </span>
                                    Document upload karne ke baad, <span className="text-black font-black italic">ZoyaLegal Team</span> dwara <span className="text-black font-extrabold underline decoration-blue-500/30">24 ghante</span> ke andar aapke email par jawab diya jayega.
                                    (Kripya sunishchit karein ki aapne <span className="text-blue-600 font-black underline decoration-2 underline-offset-4">Payment</span> kar diya hai). Thank you!
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 transition-all ${isSubmitting
                                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                    : 'bg-black text-white hover:bg-gray-800 shadow-xl hover:shadow-2xl active:scale-[0.98] group'
                                    }`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-6 w-6 animate-spin" />
                                        <span>Encrypting & Sending...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Submit Documents</span>
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                <p className="text-center mt-8 text-[11px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                    End-to-End Encrypted & Secure Portal
                </p>
            </motion.div>
        </div>
    );
}

