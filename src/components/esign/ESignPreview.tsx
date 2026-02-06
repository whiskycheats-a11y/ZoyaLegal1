import { Eye, FileCheck, ChevronLeft, ShieldCheck } from 'lucide-react';

interface FormData {
    name: string;
    mobile: string;
    email: string;
    docType: string;
    details: string;
}

interface Props {
    data: FormData;
    onNext: () => void;
    onBack: () => void;
}

export default function ESignPreview({ data, onNext, onBack }: Props) {
    const currentDate = new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-2">Step 2: Document Preview_</h2>
                <p className="text-gray-500 text-sm font-medium uppercase tracking-widest">Review your document details before digital signing.</p>
            </div>

            {/* Simulated PDF Preview */}
            <div className="bg-gray-100 p-4 md:p-8 rounded-2xl border-2 border-dashed border-gray-300 mb-8 overflow-hidden">
                <div className="bg-white shadow-2xl rounded-sm min-h-[600px] w-full max-w-2xl mx-auto p-8 md:p-12 relative">
                    {/* Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none overflow-hidden rotate-[-45deg]">
                        <h3 className="text-6xl font-black uppercase tracking-[0.5em]">DRAFT DRAFT DRAFT_</h3>
                    </div>

                    {/* Document Header */}
                    <div className="border-b-2 border-black pb-6 mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter text-black">{data.docType}</h1>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">Ref: ZLY-2026-SIGN-{(Math.random() * 1000).toFixed(0)}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-black text-black">{currentDate}</p>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">ZoyaLegal Digital Desk</p>
                        </div>
                    </div>

                    {/* Document Body */}
                    <div className="space-y-8 text-sm md:text-base leading-relaxed text-gray-800 font-medium">
                        <p className="font-bold underline uppercase">TO WHOMSOEVER IT MAY CONCERN</p>

                        <div>
                            <p className="mb-4">This document is prepared on behalf of <span className="font-black text-black underline">{data.name}</span>, having registered mobile number <span className="font-bold text-black">{data.mobile}</span> and email <span className="font-bold text-black">{data.email}</span>.</p>

                            <p className="mb-4">The party has requested the drafting and digital execution of a <span className="font-bold text-black italic">{data.docType}</span> based on the following provided details:</p>

                            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 italic text-gray-700">
                                "{data.details}"
                            </div>
                        </div>

                        <p>
                            By proceeding with the Aadhaar eSign process, the signatory acknowledges that this digital signature is
                            legally binding under the <span className="font-bold">Information Technology Act, 2000 (India)</span>.
                            The signature will be timestamped and audit-trailed for legal validity.
                        </p>

                        <div className="pt-20 flex justify-between items-end opacity-40">
                            <div className="border-t border-gray-400 w-40 pt-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Signatory: {data.name}</p>
                            </div>
                            <div className="w-32 h-32 border-2 border-gray-200 rounded-lg flex flex-col items-center justify-center">
                                <ShieldCheck className="h-8 w-8 text-gray-300 mb-2" />
                                <p className="text-[8px] font-bold text-center uppercase text-gray-400">Place Digital Signature Here</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                    onClick={onBack}
                    className="bg-white border-2 border-black text-black py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-gray-50 transition-all active:scale-[0.98] flex items-center justify-center"
                >
                    <ChevronLeft className="mr-2 h-5 w-5" />
                    Edit Details
                </button>
                <button
                    onClick={onNext}
                    className="bg-black text-white py-4 rounded-xl font-black text-lg uppercase tracking-widest hover:bg-gray-800 shadow-xl hover:shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center transform hover:-translate-y-1 group"
                >
                    Sign Digitally (Aadhaar)
                    <FileCheck className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                </button>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-100">
                <div className="flex items-center justify-center space-x-6">
                    <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <ShieldCheck className="h-4 w-4 mr-2" />
                        Legal Validity Attached
                    </div>
                    <div className="flex items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <Eye className="h-4 w-4 mr-2" />
                        256-bit Encryption
                    </div>
                </div>
            </div>
        </div>
    );
}
