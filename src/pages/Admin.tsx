import { useState, useEffect, useRef } from 'react';
import { useBlogs } from '../context/BlogContext';
import { Act, Judgment } from '../types/legal';
import {
    Plus, Edit2, Trash2, X, Image as ImageIcon, Search, LayoutDashboard,
    Settings as SettingsIcon, MessageSquare, Globe, Phone, Users, Book, Scale,
    Bold, List, ListOrdered, Heading2, Heading3, Type, Code
} from 'lucide-react';

const EDITOR_STYLES = `
  .editor-content h2 { font-size: 1.5rem; font-weight: 900; margin-top: 1.5rem; margin-bottom: 0.5rem; }
  .editor-content h3 { font-size: 1.25rem; font-weight: 800; margin-top: 1.25rem; margin-bottom: 0.5rem; }
  .editor-content p { margin-bottom: 1rem; }
  .editor-content ul { list-style-type: disc; margin-left: 1.5rem; margin-bottom: 1rem; }
  .editor-content ol { list-style-type: decimal; margin-left: 1.5rem; margin-bottom: 1rem; }
  .editor-content blockquote { border-left: 4px solid #000; padding-left: 1rem; font-style: italic; margin-bottom: 1rem; }
`;

export default function Admin() {
    const {
        blogs, addBlog, updateBlog, deleteBlog,
        advocates, deleteAdvocate,
        acts, addAct, updateAct, deleteAct,
        judgments, addJudgment, updateJudgment, deleteJudgment,
        loading, settings, updateSettings
    } = useBlogs();
    const [activeTab, setActiveTab] = useState<'blogs' | 'settings' | 'advocates' | 'acts' | 'judgments'>('blogs');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isCodeView, setIsCodeView] = useState(false);

    // Editor Ref
    const editorRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "", // This will still hold the HTML string
        image: "",
        category: "Legal Insights",
        author: "Zoya Legal Team",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: "5 min read"
    });

    const [settingsData, setSettingsData] = useState({
        whatsapp: "",
        phone: "",
        email: "",
        address: "",
        socialLinks: {
            instagram: "",
            twitter: "",
            facebook: ""
        }
    });

    const [actFormData, setActFormData] = useState({
        name: "",
        category: "Central" as "Central" | "State",
        sections: "",
        description: "",
        pdfUrl: ""
    });

    const [judgmentFormData, setJudgmentFormData] = useState({
        title: "",
        court: "",
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        simpleExplanation: "",
        pdfUrl: ""
    });

    useEffect(() => {
        if (settings) {
            setSettingsData(settings);
        }
    }, [settings]);

    // Update editor content when editing starts or modal opens with data
    useEffect(() => {
        if (isModalOpen && editorRef.current && !isCodeView) {
            // Only set innerHTML if it's different to avoid cursor jumps
            if (editorRef.current.innerHTML !== formData.content) {
                editorRef.current.innerHTML = formData.content;
            }
        }
    }, [isModalOpen, formData.content, isCodeView]);

    const handleEditorChange = () => {
        if (editorRef.current) {
            setFormData(prev => ({ ...prev, content: editorRef.current!.innerHTML }));
        }
    };

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        handleEditorChange();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (activeTab === 'blogs') {
                if (editingId) {
                    await updateBlog(editingId, formData);
                } else {
                    await addBlog(formData);
                }
            } else if (activeTab === 'acts') {
                if (editingId) {
                    await updateAct(editingId, actFormData);
                } else {
                    await addAct(actFormData);
                }
            } else if (activeTab === 'judgments') {
                if (editingId) {
                    await updateJudgment(editingId, judgmentFormData);
                } else {
                    await addJudgment(judgmentFormData);
                }
            }
            resetForm();
        } catch (err) {
            console.error("Submit error:", err);
            alert("Error saving data");
        }
    };

    const handleSettingsSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateSettings(settingsData);
            alert("Settings updated successfully!");
        } catch (err) {
            alert("Error updating settings");
        }
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            content: "",
            image: "",
            category: "Legal Insights",
            author: "Zoya Legal Team",
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            readTime: "5 min read"
        });
        setActFormData({
            name: "",
            category: "Central",
            sections: "",
            description: "",
            pdfUrl: ""
        });
        setJudgmentFormData({
            title: "",
            court: "",
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            simpleExplanation: "",
            pdfUrl: ""
        });
        setEditingId(null);
        setIsModalOpen(false);
        setIsCodeView(false);
    };

    const handleEdit = (blog: any) => {
        setFormData({
            title: blog.title,
            description: blog.description,
            content: blog.content,
            image: blog.image,
            category: blog.category,
            author: blog.author,
            date: blog.date,
            readTime: blog.readTime
        });
        setEditingId(blog._id);
        setIsModalOpen(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditAct = (act: Act) => {
        setActFormData({
            name: act.name,
            category: act.category,
            sections: act.sections,
            description: act.description || "",
            pdfUrl: act.pdfUrl || ""
        });
        setEditingId(act._id);
        setIsModalOpen(true);
    };

    const handleEditJudgment = (j: Judgment) => {
        setJudgmentFormData({
            title: j.title,
            court: j.court,
            date: j.date,
            simpleExplanation: j.simpleExplanation,
            pdfUrl: j.pdfUrl || ""
        });
        setEditingId(j._id);
        setIsModalOpen(true);
    };

    const filteredBlogs = blogs.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-72 bg-[#050505] text-white p-8 hidden md:flex flex-col border-r border-white/5">
                <div className="flex items-center space-x-3 mb-10 group cursor-pointer">
                    <div className="p-2 bg-gradient-to-br from-white to-gray-400 rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:scale-110 transition-transform">
                        <LayoutDashboard className="h-6 w-6 text-black" />
                    </div>
                    <span className="text-2xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">Admin_</span>
                </div>
                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${activeTab === 'blogs' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                        <MessageSquare className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${activeTab === 'blogs' ? 'text-black' : 'text-gray-500'}`} />
                        <span className="font-extrabold uppercase text-[10px] tracking-[0.2em]">Articles</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('advocates')}
                        className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${activeTab === 'advocates' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                        <Users className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${activeTab === 'advocates' ? 'text-black' : 'text-gray-500'}`} />
                        <span className="font-extrabold uppercase text-[10px] tracking-[0.2em]">Advocates</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('acts')}
                        className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${activeTab === 'acts' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                        <Book className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${activeTab === 'acts' ? 'text-black' : 'text-gray-500'}`} />
                        <span className="font-extrabold uppercase text-[10px] tracking-[0.2em]">Legal Acts</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('judgments')}
                        className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${activeTab === 'judgments' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                        <Scale className={`h-5 w-5 transition-transform duration-300 group-hover:scale-110 ${activeTab === 'judgments' ? 'text-black' : 'text-gray-500'}`} />
                        <span className="font-extrabold uppercase text-[10px] tracking-[0.2em]">Judgments</span>
                    </button>

                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${activeTab === 'settings' ? 'bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.1)]' : 'text-gray-500 hover:text-white hover:bg-white/5'}`}
                    >
                        <SettingsIcon className={`h-5 w-5 transition-transform duration-300 group-hover:rotate-90 ${activeTab === 'settings' ? 'text-black' : 'text-gray-500'}`} />
                        <span className="font-extrabold uppercase text-[10px] tracking-[0.2em]">Settings</span>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Tabs */}
            <div className="md:hidden flex overflow-x-auto bg-black p-2 sticky top-0 z-40 border-b border-white/10 no-scrollbar">
                {[
                    { id: 'blogs', label: 'Articles', icon: MessageSquare },
                    { id: 'advocates', label: 'Advocates', icon: Users },
                    { id: 'acts', label: 'Acts', icon: Book },
                    { id: 'judgments', label: 'Judgments', icon: Scale },
                    { id: 'settings', label: 'Settings', icon: SettingsIcon }
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white text-black' : 'text-gray-400'}`}
                    >
                        <tab.icon className="h-4 w-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-1 p-6 lg:p-12 overflow-y-auto">
                {activeTab === 'blogs' && (
                    <>
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
                            <div>
                                <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic mb-2">Manage Content_</h1>
                                <div className="flex items-center space-x-2">
                                    <div className="h-1 w-12 bg-black rounded-full"></div>
                                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Articles & Publications</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { resetForm(); setIsModalOpen(true); }}
                                className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center group active:scale-95"
                            >
                                <Plus className="mr-3 h-5 w-5 transition-transform group-hover:rotate-90" />
                                Create New Post
                            </button>
                        </div>

                        <div className="mb-10 group max-w-2xl">
                            <div className="relative">
                                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-black transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search by title, category or keyword..."
                                    className="w-full pl-16 pr-8 py-5 rounded-2xl bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] focus:border-black outline-none transition-all font-bold placeholder:text-gray-300"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[750px]">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Article</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Date</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-right text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">Loading database...</td>
                                        </tr>
                                    ) : filteredBlogs.length > 0 ? (
                                        filteredBlogs.map((blog) => (
                                            <tr key={blog._id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-6">
                                                    <div className="flex items-center space-x-4">
                                                        <img src={blog.image} className="w-12 h-12 rounded-lg object-cover grayscale" />
                                                        <div>
                                                            <p className="font-black text-black leading-tight">{blog.title}</p>
                                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter mt-1">{blog.readTime}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-full uppercase">{blog.category}</span>
                                                </td>
                                                <td className="px-6 py-6 text-sm text-gray-500 font-bold">{blog.date}</td>
                                                <td className="px-6 py-6">
                                                    <div className="flex space-x-2">
                                                        <button onClick={() => handleEdit(blog)} className="p-2 hover:bg-black hover:text-white rounded-lg transition-all">
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button onClick={() => deleteBlog(blog._id!)} className="p-2 hover:bg-red-500 hover:text-white rounded-lg transition-all">
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">No articles found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'advocates' && (
                    <>
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
                            <div>
                                <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic mb-2">Advocates_</h1>
                                <div className="flex items-center space-x-2">
                                    <div className="h-1 w-12 bg-black rounded-full"></div>
                                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Directory Management</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[650px]">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Advocate</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Court</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Phone</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-right text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">Loading directory...</td>
                                        </tr>
                                    ) : advocates.length > 0 ? (
                                        advocates.map((adv) => (
                                            <tr key={adv._id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-200">
                                                            {adv.photo ? <img src={adv.photo} className="w-full h-full object-cover grayscale" /> : <Users className="h-6 w-6 text-gray-300" />}
                                                        </div>
                                                        <div>
                                                            <p className="font-extrabold text-black leading-tight">{adv.name}</p>
                                                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mt-1">Legit Profile</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 font-bold text-sm text-gray-600">
                                                    {adv.court}
                                                </td>
                                                <td className="px-8 py-6 text-sm text-gray-400 font-bold">{adv.phone}</td>
                                                <td className="px-8 py-6 text-right">
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm("Are you sure you want to delete this advocate?")) {
                                                                deleteAdvocate(adv._id);
                                                            }
                                                        }}
                                                        className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">No advocates registered yet</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'acts' && (
                    <>
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
                            <div>
                                <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic mb-2">Legal Acts_</h1>
                                <div className="flex items-center space-x-2">
                                    <div className="h-1 w-12 bg-black rounded-full"></div>
                                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Statute Management</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { resetForm(); setIsModalOpen(true); }}
                                className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center group active:scale-95"
                            >
                                <Plus className="mr-3 h-5 w-5 transition-transform group-hover:rotate-90" />
                                Add New Act
                            </button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Act Name</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Category</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-right text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={3} className="px-8 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">Loading acts...</td>
                                        </tr>
                                    ) : acts.length > 0 ? (
                                        acts.map((act) => (
                                            <tr key={act._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6 font-extrabold text-black">{act.name}</td>
                                                <td className="px-8 py-6">
                                                    <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase ${act.category === 'Central' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>{act.category}</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <button onClick={() => handleEditAct(act)} className="p-3 bg-gray-50 text-gray-500 hover:bg-black hover:text-white rounded-xl transition-all">
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (window.confirm("Are you sure you want to delete this act?")) {
                                                                    deleteAct(act._id!);
                                                                }
                                                            }}
                                                            className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-8 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">No legal acts added</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'judgments' && (
                    <>
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-12 gap-8">
                            <div>
                                <h1 className="text-5xl font-black text-black tracking-tighter uppercase italic mb-2">Judgments_</h1>
                                <div className="flex items-center space-x-2">
                                    <div className="h-1 w-12 bg-black rounded-full"></div>
                                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Ruling Repository</p>
                                </div>
                            </div>
                            <button
                                onClick={() => { resetForm(); setIsModalOpen(true); }}
                                className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex items-center group active:scale-95"
                            >
                                <Plus className="mr-3 h-5 w-5 transition-transform group-hover:rotate-90" />
                                Add Judgment
                            </button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-x-auto no-scrollbar">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Judgment Title</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Court</th>
                                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-right text-gray-400">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {loading ? (
                                        <tr>
                                            <td colSpan={3} className="px-8 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">Loading judgments...</td>
                                        </tr>
                                    ) : judgments.length > 0 ? (
                                        judgments.map((j) => (
                                            <tr key={j._id} className="hover:bg-gray-50/50 transition-colors">
                                                <td className="px-8 py-6 font-extrabold text-black">{j.title}</td>
                                                <td className="px-8 py-6 text-sm font-bold text-gray-500">{j.court}</td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex justify-end space-x-2">
                                                        <button onClick={() => handleEditJudgment(j)} className="p-3 bg-gray-50 text-gray-500 hover:bg-black hover:text-white rounded-xl transition-all">
                                                            <Edit2 className="h-4 w-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                if (window.confirm("Are you sure you want to delete this judgment?")) {
                                                                    deleteJudgment(j._id!);
                                                                }
                                                            }}
                                                            className="p-3 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={3} className="px-8 py-12 text-center text-gray-400 font-bold uppercase tracking-widest">No judgments recorded</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

                {activeTab === 'settings' && (
                    <div className="max-w-4xl">
                        <h1 className="text-4xl font-black text-black tracking-tighter uppercase italic mb-2">General Settings_</h1>
                        <p className="text-gray-500 font-bold mb-12">Update your site's contact info and social links.</p>

                        <form onSubmit={handleSettingsSubmit} className="space-y-8 bg-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <h3 className="text-lg font-black uppercase tracking-tight italic border-b border-gray-100 pb-2 flex items-center">
                                        <Phone className="h-5 w-5 mr-3 text-gray-400" /> Contact Info
                                    </h3>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">WhatsApp Number (For Redirects)</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={settingsData.whatsapp}
                                            onChange={e => setSettingsData({ ...settingsData, whatsapp: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Display Phone</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={settingsData.phone}
                                            onChange={e => setSettingsData({ ...settingsData, phone: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={settingsData.email}
                                            onChange={e => setSettingsData({ ...settingsData, email: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Office Address</label>
                                        <textarea
                                            rows={3}
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={settingsData.address}
                                            onChange={e => setSettingsData({ ...settingsData, address: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <h3 className="text-lg font-black uppercase tracking-tight italic border-b border-gray-100 pb-2 flex items-center">
                                        <Globe className="h-5 w-5 mr-3 text-gray-400" /> Social Links
                                    </h3>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Instagram Profile URL</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={settingsData.socialLinks.instagram}
                                            onChange={e => setSettingsData({ ...settingsData, socialLinks: { ...settingsData.socialLinks, instagram: e.target.value } })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Twitter (X) URL</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={settingsData.socialLinks.twitter}
                                            onChange={e => setSettingsData({ ...settingsData, socialLinks: { ...settingsData.socialLinks, twitter: e.target.value } })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Facebook Page URL</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={settingsData.socialLinks.facebook}
                                            onChange={e => setSettingsData({ ...settingsData, socialLinks: { ...settingsData.socialLinks, facebook: e.target.value } })}
                                        />
                                    </div>

                                    <div className="pt-10">
                                        <button
                                            type="submit"
                                            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.1)] active:scale-95"
                                        >
                                            Save All Settings_
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto pt-8 pb-20 md:pt-20">
                    <div className="bg-white w-full max-w-3xl rounded-3xl md:rounded-[2.5rem] shadow-2xl relative p-6 md:p-12">
                        <button
                            onClick={resetForm}
                            className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6 text-black" />
                        </button>

                        <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic mb-8">
                            {activeTab === 'acts' ? "New Act_" : activeTab === 'judgments' ? "New Judgment_" : editingId ? "Edit Article_" : "New Article_"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {activeTab === 'acts' && (
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Act Name</label>
                                        <input
                                            required
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={actFormData.name}
                                            onChange={e => setActFormData({ ...actFormData, name: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                                        <select
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={actFormData.category}
                                            onChange={e => setActFormData({ ...actFormData, category: e.target.value as any })}
                                        >
                                            <option value="Central">Central Act</option>
                                            <option value="State">State Act</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Summary / Sections</label>
                                        <input
                                            placeholder="e.g. 511 Sections"
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={actFormData.sections}
                                            onChange={e => setActFormData({ ...actFormData, sections: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Detailed Content (for Reading)</label>
                                        <textarea
                                            rows={8}
                                            placeholder="The full text or detailed summary of the act..."
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={actFormData.description}
                                            onChange={e => setActFormData({ ...actFormData, description: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">PDF URL (Optional)</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={actFormData.pdfUrl}
                                            onChange={e => setActFormData({ ...actFormData, pdfUrl: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-95">
                                        {editingId ? "Update Act_" : "Add Act_"}
                                    </button>
                                </div>
                            )}

                            {activeTab === 'judgments' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Judgment Title</label>
                                            <input
                                                required
                                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                                value={judgmentFormData.title}
                                                onChange={e => setJudgmentFormData({ ...judgmentFormData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Court</label>
                                            <input
                                                required
                                                placeholder="e.g. Supreme Court"
                                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                                value={judgmentFormData.court}
                                                onChange={e => setJudgmentFormData({ ...judgmentFormData, court: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Simple Explanation</label>
                                        <textarea
                                            required
                                            rows={4}
                                            placeholder="Explain the judgment in simple language..."
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={judgmentFormData.simpleExplanation}
                                            onChange={e => setJudgmentFormData({ ...judgmentFormData, simpleExplanation: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">PDF URL (Optional)</label>
                                        <input
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={judgmentFormData.pdfUrl}
                                            onChange={e => setJudgmentFormData({ ...judgmentFormData, pdfUrl: e.target.value })}
                                        />
                                    </div>
                                    <button type="submit" className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-95">
                                        {editingId ? "Update Judgment_" : "Add Judgment_"}
                                    </button>
                                </div>
                            )}

                            {(activeTab === 'blogs' || activeTab === 'advocates' || activeTab === 'settings') && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Title</label>
                                            <input
                                                required
                                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                                value={formData.title}
                                                onChange={e => setFormData({ ...formData, title: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Category</label>
                                            <select
                                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                                value={formData.category}
                                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                                            >
                                                <option>Legal Insights</option>
                                                <option>Digital Privacy</option>
                                                <option>Business Support</option>
                                                <option>Innovation</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Short Description</label>
                                        <input
                                            required
                                            className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                            value={formData.description}
                                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    {/* Visual Editor Section */}
                                    <div>
                                        <div className="flex justify-between items-center mb-2">
                                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500">Write Blog Content Here (Visual Editor)</label>
                                            <button
                                                type="button"
                                                onClick={() => setIsCodeView(!isCodeView)}
                                                className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-black flex items-center transition-all"
                                            >
                                                <Code className="h-3 w-3 mr-1" />
                                                {isCodeView ? "Switch to Visual" : "Switch to HTML"}
                                            </button>
                                        </div>

                                        {!isCodeView ? (
                                            <div className="border-2 border-gray-100 rounded-3xl overflow-hidden focus-within:border-black transition-all">
                                                {/* Toolbar */}
                                                <div className="bg-gray-50 p-2 border-b border-gray-100 flex flex-wrap gap-1">
                                                    <button type="button" onClick={() => execCommand('bold')} className="p-2 hover:bg-white rounded-lg transition-all" title="Bold">
                                                        <Bold className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" onClick={() => execCommand('formatBlock', 'h2')} className="p-2 hover:bg-white rounded-lg transition-all" title="Heading 2">
                                                        <Heading2 className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" onClick={() => execCommand('formatBlock', 'h3')} className="p-2 hover:bg-white rounded-lg transition-all" title="Heading 3">
                                                        <Heading3 className="h-4 w-4" />
                                                    </button>
                                                    <div className="w-px h-6 bg-gray-200 mx-1 self-center"></div>
                                                    <button type="button" onClick={() => execCommand('insertUnorderedList')} className="p-2 hover:bg-white rounded-lg transition-all" title="Bullet List">
                                                        <List className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" onClick={() => execCommand('insertOrderedList')} className="p-2 hover:bg-white rounded-lg transition-all" title="Numbered List">
                                                        <ListOrdered className="h-4 w-4" />
                                                    </button>
                                                    <button type="button" onClick={() => execCommand('formatBlock', 'p')} className="p-2 hover:bg-white rounded-lg transition-all" title="Normal Text">
                                                        <Type className="h-4 w-4" />
                                                    </button>
                                                </div>
                                                {/* Editable Area */}
                                                <style>{EDITOR_STYLES}</style>
                                                <div
                                                    ref={editorRef}
                                                    contentEditable
                                                    onInput={handleEditorChange}
                                                    className="editor-content min-h-[300px] p-6 outline-none prose prose-sm max-w-none font-medium text-gray-700 bg-white"
                                                    style={{ minHeight: '300px' }}
                                                />
                                            </div>
                                        ) : (
                                            <textarea
                                                required
                                                rows={12}
                                                className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-mono text-sm bg-gray-50"
                                                value={formData.content}
                                                onChange={e => setFormData({ ...formData, content: e.target.value })}
                                            />
                                        )}
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Cover Image</label>
                                            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-black transition-all group overflow-hidden relative">
                                                {formData.image ? (
                                                    <img src={formData.image} className="w-full h-full object-cover grayscale opacity-50" />
                                                ) : (
                                                    <div className="text-center">
                                                        <ImageIcon className="h-8 w-8 mx-auto text-gray-400 group-hover:text-black" />
                                                        <span className="text-xs font-bold text-gray-400 group-hover:text-black">Choose Image</span>
                                                    </div>
                                                )}
                                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Read Time</label>
                                                <input
                                                    placeholder="e.g. 5 min read"
                                                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                                    value={formData.readTime}
                                                    onChange={e => setFormData({ ...formData, readTime: e.target.value })}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-gray-800 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)] active:scale-95"
                                            >
                                                {editingId ? "Update Article_" : "Publish Article_"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
