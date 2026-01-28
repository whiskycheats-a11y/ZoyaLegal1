import { useState } from 'react';
import { Search, Book, Scale, Download, Share2, FileText, Eye, X } from 'lucide-react';
import { useBlogs } from '../context/BlogContext';
import SkeletonAct from '../components/SkeletonAct';
import TopProgressBar from '../components/TopProgressBar';

export default function ActsJudgments() {
    const { acts, judgments, loading } = useBlogs();
    const [activeTab, setActiveTab] = useState<'acts' | 'judgments'>('acts');
    const [searchTerm, setSearchTerm] = useState('');
    const [actCategory, setActCategory] = useState<'All' | 'Central' | 'State'>('All');
    const [courtFilter, setCourtFilter] = useState('All');
    const [selectedItem, setSelectedItem] = useState<{ title: string, content: string, type: 'Act' | 'Judgment' } | null>(null);

    const filteredActs = acts.filter(act => {
        const matchesSearch = (act.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (act.sections?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesCategory = actCategory === 'All' || act.category === actCategory;
        return matchesSearch && matchesCategory;
    });

    const filteredJudgments = judgments.filter(j => {
        const matchesSearch = (j.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (j.court?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
            (j.simpleExplanation?.toLowerCase() || '').includes(searchTerm.toLowerCase());
        const matchesCourt = courtFilter === 'All' || j.court?.includes(courtFilter);
        return matchesSearch && matchesCourt;
    });

    const courts = ['All', 'Supreme Court', 'High Court'];

    const handleWhatsAppShare = (title: string) => {
        const text = `Check out this Judgment on ZoyaLegal: ${title}\nVisit: ${window.location.href}`;
        window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <TopProgressBar />
            {/* Hero Section */}
            <section className="bg-black text-white py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black opacity-60"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <Scale className="h-16 w-16 mx-auto mb-6 text-white animate-pulse" />
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic italic">Acts & Judgments_</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-bold">
                        Access a comprehensive database of Central & State Acts alongside landmark Judgments explained in simple language.
                    </p>
                </div>
            </section>

            {/* Filter & Search Bar */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-2xl border border-gray-100">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <div className="flex-1 relative w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder={`Search through ${activeTab === 'acts' ? 'Acts & Sections' : 'Judgments & Courts'}...`}
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-black outline-none transition-all font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex bg-gray-100 p-1.5 rounded-2xl w-full md:w-auto">
                            <button
                                onClick={() => setActiveTab('acts')}
                                className={`flex-1 md:w-32 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'acts' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:text-black'}`}
                            >
                                Acts
                            </button>
                            <button
                                onClick={() => setActiveTab('judgments')}
                                className={`flex-1 md:w-32 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'judgments' ? 'bg-black text-white shadow-lg' : 'text-gray-500 hover:text-black'}`}
                            >
                                Judgments
                            </button>
                        </div>
                    </div>

                    {/* Secondary Filters */}
                    <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                        {activeTab === 'acts' ? (
                            ['All', 'Central', 'State'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActCategory(cat as any)}
                                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${actCategory === cat ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-200'}`}
                                >
                                    {cat} Acts
                                </button>
                            ))
                        ) : (
                            courts.map(court => (
                                <button
                                    key={court}
                                    onClick={() => setCourtFilter(court)}
                                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${courtFilter === court ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:bg-gray-200'}`}
                                >
                                    {court}
                                </button>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <SkeletonAct key={i} />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {activeTab === 'acts' ? (
                            filteredActs.map(act => (
                                <div key={act._id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-transparent hover:border-b-black animate-fade-in">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-all">
                                            <Book className="h-6 w-6" />
                                        </div>
                                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${act.category === 'Central' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                            {act.category}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-black mb-4 leading-tight">{act.name}</h3>
                                    <p className="text-gray-500 text-sm font-bold mb-6 line-clamp-3 leading-relaxed">
                                        {act.sections || "Detailed sections and legal provisions for this act."}
                                    </p>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedItem({
                                                title: act.name,
                                                content: act.description || "Detailed content for this act is currently being updated. Please check back soon or view the PDF for full details.",
                                                type: 'Act'
                                            })}
                                            className="flex-1 bg-gray-50 text-black py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center hover:bg-black hover:text-white transition-all border border-gray-100"
                                        >
                                            <Eye className="h-4 w-4 mr-2" /> Read_
                                        </button>
                                        {act.pdfUrl && (
                                            <a href={act.pdfUrl} target="_blank" className="bg-black text-white px-6 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center hover:bg-gray-800 transition-all">
                                                <Download className="h-4 w-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            filteredJudgments.map(j => (
                                <div key={j._id} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all group animate-fade-in">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-3 bg-gray-50 rounded-2xl group-hover:bg-black group-hover:text-white transition-all">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <span className="text-[10px] font-black uppercase text-gray-400">
                                            {j.date}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-black text-black mb-2 leading-tight">{j.title}</h3>
                                    <div className="text-[10px] font-black uppercase text-blue-600 mb-6 flex items-center">
                                        <Scale className="h-3 w-3 mr-1" /> {j.court}
                                    </div>

                                    <div className="bg-gray-50 p-4 rounded-2xl mb-8">
                                        <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Simple Explanation_</p>
                                        <p className="text-gray-700 text-sm font-bold leading-relaxed">
                                            {j.simpleExplanation}
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setSelectedItem({
                                                title: j.title,
                                                content: j.simpleExplanation,
                                                type: 'Judgment'
                                            })}
                                            className="flex-1 bg-gray-50 text-black py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center hover:bg-black hover:text-white transition-all border border-gray-100"
                                        >
                                            <Eye className="h-3.5 w-3.5 mr-2" /> Read_
                                        </button>
                                        {j.pdfUrl && (
                                            <a href={j.pdfUrl} target="_blank" className="bg-black text-white px-5 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center hover:bg-gray-800 transition-all">
                                                <Download className="h-3.5 w-3.5" />
                                            </a>
                                        )}
                                        <button
                                            onClick={() => handleWhatsAppShare(j.title)}
                                            className="px-6 bg-[#25D366] text-white rounded-xl hover:bg-[#128C7E] transition-all flex items-center justify-center"
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {!loading && (activeTab === 'acts' ? filteredActs.length : filteredJudgments.length) === 0 && (
                    <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
                        <Search className="h-16 w-16 mx-auto mb-4 text-gray-200" />
                        <h3 className="text-2xl font-black text-black uppercase tracking-tighter">No results found_</h3>
                        <p className="text-gray-400 font-bold">Try adjusting your search or filters.</p>
                    </div>
                )}
            </div>

            {/* Reader Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setSelectedItem(null)}></div>
                    <div className="relative bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                        <div className="p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                            <div className="flex justify-between items-start mb-10">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-4 block">
                                        Zoya Legal {selectedItem.type} Reader_
                                    </span>
                                    <h2 className="text-3xl md:text-5xl font-black text-black leading-none tracking-tighter uppercase italic">{selectedItem.title}</h2>
                                </div>
                                <button onClick={() => setSelectedItem(null)} className="p-4 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all group">
                                    <X className="h-6 w-6 group-hover:rotate-90 transition-all duration-300" />
                                </button>
                            </div>

                            <div className="prose prose-lg max-w-none">
                                <div className="space-y-6 text-gray-700 font-medium leading-relaxed">
                                    {selectedItem.content.split('\n').map((para, i) => (
                                        <p key={i} className="text-lg md:text-xl">{para}</p>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-center">
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="bg-black text-white px-12 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-all shadow-xl active:scale-95"
                                >
                                    Close Reader_
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
