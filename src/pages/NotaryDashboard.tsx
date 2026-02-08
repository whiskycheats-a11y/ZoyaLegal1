import { useState, useEffect } from 'react';
import { Shield, FileCheck, Upload, CheckCircle, Clock, User, Fingerprint, AlertCircle, Info, ArrowRight, Play } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function NotaryDashboard() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTask, setSelectedTask] = useState<any | null>(null);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/orders`);
            setTasks(res.data.filter((o: any) => o.status === 'NOTARY_ASSIGNED'));
        } catch (err) {
            console.error("Fetch tasks error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadFinal = async (orderId: string) => {
        if (orderId.startsWith('demo-')) {
            setUploading(true);
            setTimeout(() => {
                alert("Demo notarization complete!");
                setTasks(prev => prev.filter(t => t._id !== orderId));
                setSelectedTask(null);
                setUploading(false);
            }, 1500);
            return;
        }

        setUploading(true);
        try {
            const finalPdf = `https://res.cloudinary.com/demo/image/upload/v1/sample.pdf`;
            await axios.put(`${API_BASE_URL}/api/orders/${orderId}/status`, { finalPdf });
            alert("Document notarized and completed!");
            fetchTasks();
            setSelectedTask(null);
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const addDemoTask = () => {
        const demoTask = {
            _id: `demo-${Math.random().toString(36).substr(2, 9)}`,
            serviceType: 'Rental Agreement (Affidavit)',
            userData: { name: 'Rahul Sharma (Demo Client)' },
            status: 'NOTARY_ASSIGNED',
            notary: { assignmentDate: new Date() },
            formData: { purpose: 'Residential Lease for 11 Months in Mumbai' }
        };
        setTasks([demoTask, ...tasks]);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col p-6 md:p-12 mt-8">
            <div className="max-w-7xl mx-auto w-full">

                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
                    <div>
                        <div className="flex items-center space-x-2 mb-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Notary Execution Hub Z-2026</p>
                        </div>
                        <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic">Notary Dashboard_</h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={addDemoTask}
                            className="bg-white border-2 border-black text-black px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all flex items-center shadow-lg"
                        >
                            <Play className="h-4 w-4 mr-2" />
                            Launch Demo Task
                        </button>
                        <div className="bg-black text-white px-6 py-3 rounded-2xl flex items-center space-x-4 shadow-2xl">
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold">N</div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-gray-400">Authorized Notary</p>
                                <p className="text-xs font-bold leading-none">Adv. Mahesh Pathak</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Tasks and Guide */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Queue Listing */}
                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                            <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Pending Execution Queue_</h3>
                                <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                                    {tasks.length} Active
                                </div>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {loading ? (
                                    <div className="p-12 text-center text-gray-300 font-bold uppercase text-[10px] tracking-widest animate-pulse">Scanning Secure Vault...</div>
                                ) : tasks.length > 0 ? (
                                    tasks.map(task => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            key={task._id}
                                            className="p-8 hover:bg-gray-50/80 transition-all flex items-center justify-between group"
                                        >
                                            <div className="flex items-center space-x-6">
                                                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                    <FileCheck className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <p className="text-xl font-black text-black tracking-tight">{task.serviceType}</p>
                                                    <div className="flex items-center space-x-4 mt-1">
                                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
                                                            <User className="h-3 w-3 mr-1" /> {task.userData.name}
                                                        </span>
                                                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest flex items-center">
                                                            <Clock className="h-3 w-3 mr-1" /> {new Date(task.notary.assignmentDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => setSelectedTask(task)}
                                                className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-xl hover:shadow-2xl"
                                            >
                                                Execute
                                            </button>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="p-20 text-center">
                                        <CheckCircle className="h-16 w-16 text-green-100 mx-auto mb-6" />
                                        <p className="text-lg font-black text-black mb-2 uppercase italic">Vault is Empty_</p>
                                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">New assignments will appear here automatically</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Workflow Guide */}
                        <div className="bg-black rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="relative z-10">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 mb-6 flex items-center">
                                    <Info className="h-4 w-4 mr-2" /> How it Works_
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        { step: '01', title: 'Receive', desc: 'Orders assigned by Admin appear in your queue.' },
                                        { step: '02', title: 'Verify', desc: 'Review e-Sign integrity and user-provided details.' },
                                        { step: '03', title: 'Execute', desc: 'Upload notarized PDF to complete execution.' }
                                    ].map((s, i) => (
                                        <div key={i} className="space-y-3">
                                            <p className="text-3xl font-black italic text-white/20 select-none">{s.step}</p>
                                            <h4 className="font-black uppercase tracking-tighter text-xl">{s.title}</h4>
                                            <p className="text-xs text-gray-400 font-bold leading-relaxed">{s.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
                        </div>
                    </div>

                    {/* Task Execution Workspace */}
                    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 h-fit sticky top-12">
                        {selectedTask ? (
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedTask._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-8"
                                >
                                    <div className="pb-6 border-b border-gray-100">
                                        <h3 className="text-2xl font-black text-black tracking-tight mb-2 uppercase italic">{selectedTask.serviceType}_</h3>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">ID: {selectedTask._id}</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">E-Signed Payload</p>
                                            <div className="flex items-center text-green-600 space-x-3 bg-white p-3 rounded-xl border border-green-100">
                                                <Fingerprint className="h-5 w-5" />
                                                <span className="text-[10px] font-black uppercase tracking-widest">Digital Integrity Verified</span>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3">Purpose Statement</p>
                                            <p className="text-sm font-bold text-gray-600 leading-relaxed italic">"{selectedTask.formData?.purpose || 'Standard legal filing'}"</p>
                                        </div>
                                    </div>

                                    <div className="pt-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Final Notarization Seal_</h3>
                                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl p-10 text-center group hover:bg-black hover:border-black transition-all cursor-pointer">
                                            <Upload className="h-10 w-10 text-gray-300 mx-auto mb-3 group-hover:text-white group-hover:animate-bounce" />
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest group-hover:text-white">Upload Notarized Version</p>
                                        </div>
                                        <button
                                            disabled={uploading}
                                            onClick={() => handleUploadFinal(selectedTask._id)}
                                            className="w-full mt-8 bg-black text-white py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:bg-gray-300 flex items-center justify-center"
                                        >
                                            {uploading ? 'Processing Secure Vault...' : (
                                                <>
                                                    Notarize & Close Task
                                                    <ArrowRight className="h-5 w-5 ml-2" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        ) : (
                            <div className="h-80 flex flex-col items-center justify-center text-center py-20 grayscale opacity-40">
                                <AlertCircle className="h-12 w-12 text-gray-300 mb-4" />
                                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">System Standby_</h4>
                                <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-2 px-12 leading-relaxed">Select a task from the queue to process legal execution</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
