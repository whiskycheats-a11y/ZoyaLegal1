import React, { useState } from 'react';
import { Upload, X, FileText, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export default function ClientPortal() {
    const [clientName, setClientName] = useState('');
    const [description, setDescription] = useState('');
    const [files, setFiles] = useState<{ data: string; fileName: string; fileType: string }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles) return;

        const newFiles: { data: string; fileName: string; fileType: string }[] = [];

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const reader = new FileReader();

            const fileContent = await new Promise<string>((resolve) => {
                reader.onload = (e) => resolve(e.target?.result as string);
                reader.readAsDataURL(file);
            });

            newFiles.push({
                data: fileContent,
                fileName: file.name,
                fileType: file.type
            });
        }

        setFiles([...files, ...newFiles]);
    };

    const removeFile = (index: number) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!clientName || files.length === 0) {
            setStatus({ type: 'error', message: 'Please provide your name and at least one file.' });
            return;
        }

        setIsSubmitting(true);
        setStatus({ type: null, message: '' });

        try {
            await axios.post(`${API_BASE_URL}/submissions`, {
                clientName,
                description,
                files
            });

            setStatus({ type: 'success', message: 'Your files have been submitted successfully! We will review them shortly.' });
            setClientName('');
            setDescription('');
            setFiles([]);
        } catch (err: any) {
            console.error('Upload failed:', err);
            let errorMessage = err.response?.data?.message || err.message || 'Failed to upload files.';

            if (err.message === 'Network Error') {
                errorMessage = 'Backend Server Offline. Please make sure the server is running (cd server && npm run dev).';
            }

            setStatus({ type: 'error', message: errorMessage });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="bg-black p-8 text-center">
                        <h1 className="text-3xl font-black text-white mb-2">Client Submission Portal</h1>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">Upload your documents & evidence securely</p>
                    </div>

                    <div className="p-8">
                        {status.type && (
                            <div className={`mb-8 p-4 rounded-xl flex items-center space-x-3 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                {status.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                                <p className="font-bold text-sm">{status.message}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Full Name / Case Title</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name or case reference"
                                    value={clientName}
                                    onChange={(e) => setClientName(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold placeholder:text-gray-300"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Case Description (Optional)</label>
                                <textarea
                                    placeholder="Briefly describe what these files are for..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-transparent transition-all font-bold placeholder:text-gray-300 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2 px-1">Upload Files (Photos, Videos, PDFs)</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-200 border-dashed rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer relative">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                    />
                                    <div className="space-y-1 text-center">
                                        <Upload className="mx-auto h-12 w-12 text-gray-300 group-hover:text-black transition-colors" />
                                        <div className="flex text-sm text-gray-600 font-bold">
                                            <span>Click or drag to upload multiple files</span>
                                        </div>
                                        <p className="text-xs text-gray-400 uppercase font-black">Photos, Videos & Documents up to 10MB each</p>
                                    </div>
                                </div>
                            </div>

                            {files.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">Selected Files ({files.length})</p>
                                    <div className="grid gap-2">
                                        {files.map((file, index) => (
                                            <div key={index} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                                                <div className="flex items-center space-x-3 overflow-hidden">
                                                    <div className="p-2 bg-gray-50 rounded-lg shrink-0">
                                                        <FileText className="h-4 w-4 text-gray-600" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-sm font-bold text-gray-900 truncate">{file.fileName}</p>
                                                        <p className="text-[10px] text-gray-400 font-black uppercase">{file.fileType}</p>
                                                    </div>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(index)}
                                                    className="p-1.5 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors ml-2"
                                                >
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full py-4 rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-2 transition-all ${isSubmitting ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl active:scale-95'}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span>Uploading Files...</span>
                                    </>
                                ) : (
                                    <span>Submit to ZoyaLegal</span>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
