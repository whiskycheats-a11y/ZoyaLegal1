import { useState, useEffect } from 'react';
import { Search, Eye, Stamp, Truck, CheckCircle, Clock, AlertCircle, User, Fingerprint, Trash2 } from 'lucide-react';
import axios from 'axios';
import { generateLegalPDF } from '../utils/pdfGenerator';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export default function AdminESignOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [finalPdfUrl, setFinalPdfUrl] = useState("");

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${API_BASE_URL}/api/orders`);
            setOrders(res.data);
        } catch (err) {
            console.error("Fetch orders error:", err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (orderId: string, status: string) => {
        try {
            await axios.put(`${API_BASE_URL}/api/orders/${orderId}/status`, { status });
            fetchOrders();
            if (selectedOrder) {
                setSelectedOrder({ ...selectedOrder, status });
            }
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message;
            alert("Status update failed: " + msg);
            console.error("Status Update Error:", err);
        }
    };

    const deleteOrder = async (orderId: string) => {
        if (!window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) return;
        try {
            await axios.delete(`${API_BASE_URL}/api/orders/${orderId}`);
            fetchOrders();
            if (selectedOrder?._id === orderId) {
                setSelectedOrder(null);
            }
        } catch (err) {
            alert("Delete failed");
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-700';
            case 'ESIGN_COMPLETED': return 'bg-blue-100 text-blue-700';
            case 'PROCESSING': return 'bg-amber-100 text-amber-700';
            case 'PAYMENT_SUCCESS': return 'bg-purple-100 text-purple-700';
            case 'NOTARY_ASSIGNED': return 'bg-orange-100 text-orange-700';
            case 'INITIATED': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredOrders = orders.filter(o =>
        o.userData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.userData.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o._id.includes(searchTerm)
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div>
                    <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic mb-2">E-Sign Orders_</h1>
                    <div className="flex items-center space-x-2">
                        <div className="h-1 w-12 bg-black rounded-full"></div>
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Digital Execution Pipeline</p>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search orders..."
                            className="pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm focus:border-black outline-none transition-all font-bold text-sm w-64"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button onClick={fetchOrders} className="p-4 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all shadow-sm">
                        <Clock className="h-5 w-5 text-black" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Orders List */}
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Order/Client</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Service</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-gray-400">Status</th>
                                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-wider text-right text-gray-400">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr><td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">Syncing with Secure Node...</td></tr>
                                ) : filteredOrders.map(order => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-all group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center font-black text-black">
                                                    {order.userData.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-black text-black text-sm">{order.userData.name}</p>
                                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">ID: ...{order._id.slice(-6)}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 uppercase font-black text-[10px] tracking-widest text-gray-500">
                                            {order.serviceType}
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-2">
                                                <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                                {order.documents?.uploadedSignature && (
                                                    <div className="relative group">
                                                        <img
                                                            src={order.documents.uploadedSignature}
                                                            alt="Signature"
                                                            className="h-6 w-12 object-contain bg-white rounded border border-gray-200 cursor-pointer hover:scale-150 transition-transform"
                                                            title="Client Signature"
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => setSelectedOrder(order)}
                                                    className="p-2 bg-black text-white rounded-lg hover:scale-110 transition-transform"
                                                    title="View Details"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => deleteOrder(order._id)}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                                                    title="Delete Order"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Details Sidebar */}
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl p-8 sticky top-24">
                    {selectedOrder ? (
                        <div className="animate-fade-in space-y-8">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-100 pb-2">Order Intel_</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <User className="h-4 w-4 text-gray-300" />
                                        <p className="text-sm font-bold">{selectedOrder.userData.email}</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Truck className="h-4 w-4 text-gray-300" />
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{selectedOrder.userData.city}, {selectedOrder.userData.state}</p>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-100 pb-2">Execution Status_</h3>
                                <div className="space-y-2">
                                    {['PAYMENT_SUCCESS', 'PROCESSING', 'ESIGN_COMPLETED', 'NOTARY_ASSIGNED', 'COMPLETED'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => updateStatus(selectedOrder._id, status)}
                                            className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all font-bold uppercase text-xs tracking-wider flex items-center justify-between ${selectedOrder.status === status ? 'bg-black text-white border-black' : 'border-gray-50 text-gray-400 hover:border-black/10'}`}
                                        >
                                            {status.replace('_', ' ')}
                                            {selectedOrder.status === status && <CheckCircle className="h-4 w-4" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-100 pb-2">Document Management_</h3>
                                <div className="space-y-6">
                                    {/* Draft PDF Section */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase text-gray-400">Draft PDF (Auto-Generated by Default)</label>

                                        {/* Auto-Draft Button */}
                                        <button
                                            onClick={() => {
                                                generateLegalPDF({
                                                    orderId: selectedOrder._id,
                                                    userName: selectedOrder.userData?.name || 'Client',
                                                    docType: selectedOrder.serviceType || 'Document',
                                                    date: new Date(selectedOrder.createdAt).toLocaleDateString(),
                                                    formData: selectedOrder.formData,
                                                    isDraft: true,
                                                    signatureUrl: selectedOrder.documents?.uploadedSignature
                                                });
                                            }}
                                            className="w-full py-3 bg-white border-2 border-dashed border-gray-300 text-gray-500 rounded-xl font-black uppercase text-[10px] tracking-widest hover:border-black hover:text-black transition-all mb-2 flex items-center justify-center"
                                        >
                                            <Eye className="h-4 w-4 mr-2" />
                                            View Auto-Generated Draft
                                        </button>
                                    </div>

                                    {/* Final PDF Section */}
                                    <div className="space-y-3 pt-4 border-t border-gray-100">
                                        <label className="text-[10px] font-black uppercase text-gray-400">Final Notarized PDF (Completed)</label>
                                        <input
                                            type="text"
                                            placeholder="Paste FINAL Notarized PDF URL..."
                                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 text-[10px] font-bold outline-none focus:border-black transition-all"
                                            value={finalPdfUrl}
                                            onChange={(e) => setFinalPdfUrl(e.target.value)}
                                        />
                                        <button
                                            onClick={async () => {
                                                if (!finalPdfUrl) return alert("Please enter a URL");
                                                try {
                                                    await axios.put(`${API_BASE_URL}/api/orders/${selectedOrder._id}/status`, {
                                                        finalPdf: finalPdfUrl,
                                                        status: 'COMPLETED'
                                                    });
                                                    alert("Final PDF set & Order marked as COMPLETED");
                                                    fetchOrders();
                                                    // Update local state to reflect change immediately
                                                    setSelectedOrder({
                                                        ...selectedOrder,
                                                        status: 'COMPLETED',
                                                        documents: { ...selectedOrder.documents, finalPdf: finalPdfUrl }
                                                    });
                                                } catch (err: any) {
                                                    const msg = err.response?.data?.message || err.message;
                                                    alert("Final update failed: " + msg);
                                                }
                                            }}
                                            className="w-full py-3 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
                                        >
                                            Set Final Link & Complete Order
                                        </button>
                                        {selectedOrder.documents.finalPdf && (
                                            <p className="text-[8px] text-gray-400 font-bold truncate">Current: {selectedOrder.documents.finalPdf}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-100 pb-2">Client Signature_</h3>
                                {selectedOrder.documents.uploadedSignature ? (
                                    <div className="bg-gray-50 p-4 rounded-2xl border-2 border-gray-100 overflow-hidden group">
                                        <img
                                            src={selectedOrder.documents.uploadedSignature}
                                            alt="Client Signature"
                                            className="w-full h-32 object-contain rounded-lg hover:scale-110 transition-transform cursor-zoom-in"
                                            onClick={() => window.open(selectedOrder.documents.uploadedSignature, '_blank')}
                                        />
                                        <p className="mt-2 text-[8px] font-black text-center text-green-600 uppercase tracking-widest">Consent Verified by Client_</p>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 p-6 rounded-2xl border-2 border-dashed border-gray-100 text-center">
                                        <Fingerprint className="h-6 w-6 text-gray-200 mx-auto mb-2" />
                                        <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Awaiting Signature Scan_</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4 border-b border-gray-100 pb-2">Documents_</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => selectedOrder.documents.signedPdf && window.open(selectedOrder.documents.signedPdf, '_blank')}
                                        className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all group disabled:opacity-50"
                                        disabled={!selectedOrder.documents.signedPdf}
                                    >
                                        <Fingerprint className="h-6 w-6 mb-2 text-gray-300 group-hover:text-white" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Signed PDF</span>
                                    </button>
                                    <button
                                        onClick={() => selectedOrder.documents.finalPdf && window.open(selectedOrder.documents.finalPdf, '_blank')}
                                        className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all group disabled:opacity-50"
                                        disabled={!selectedOrder.documents.finalPdf}
                                    >
                                        <Stamp className="h-6 w-6 mb-2 text-gray-300 group-hover:text-white" />
                                        <span className="text-xs font-bold uppercase tracking-wider">Notarized</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                            <AlertCircle className="h-12 w-12 text-gray-100 mb-4" />
                            <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Select an order to view intelligence_</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
