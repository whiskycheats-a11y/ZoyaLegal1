import { useState, useEffect } from 'react';
import { useBlogs } from '../context/BlogContext';
import { Plus, Edit2, Trash2, X, Image as ImageIcon, Search, LayoutDashboard, Settings as SettingsIcon, MessageSquare, Globe, Phone } from 'lucide-react';

export default function Admin() {
    const { blogs, addBlog, updateBlog, deleteBlog, loading, settings, updateSettings } = useBlogs();
    const [activeTab, setActiveTab] = useState<'blogs' | 'settings'>('blogs');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        content: "",
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

    useEffect(() => {
        if (settings) {
            setSettingsData(settings);
        }
    }, [settings]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingId) {
                await updateBlog(editingId, formData);
            } else {
                await addBlog(formData);
            }
            resetForm();
        } catch (err) {
            alert("Error saving post");
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
        setEditingId(null);
        setIsModalOpen(false);
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

    const filteredBlogs = blogs.filter(b =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className="w-64 bg-black text-white p-6 hidden md:block">
                <div className="flex items-center space-x-2 mb-12">
                    <LayoutDashboard className="h-8 w-8 text-white" />
                    <span className="text-xl font-black tracking-tighter uppercase italic">Admin.</span>
                </div>
                <nav className="space-y-2">
                    <button
                        onClick={() => setActiveTab('blogs')}
                        className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all ${activeTab === 'blogs' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-black uppercase text-xs tracking-widest">Blogs</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`w-full flex items-center space-x-3 p-4 rounded-2xl transition-all ${activeTab === 'settings' ? 'bg-white text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                    >
                        <SettingsIcon className="h-5 w-5" />
                        <span className="font-black uppercase text-xs tracking-widest">Settings</span>
                    </button>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-12 overflow-y-auto">
                {activeTab === 'blogs' ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                            <div>
                                <h1 className="text-4xl font-black text-black tracking-tighter uppercase italic">Manage Content_</h1>
                                <p className="text-gray-500 font-bold">Add, Edit or Delete blog articles in real-time.</p>
                            </div>
                            <button
                                onClick={() => { resetForm(); setIsModalOpen(true); }}
                                className="bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl flex items-center"
                            >
                                <Plus className="mr-2 h-5 w-5" />
                                Create New Post
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="mb-8 relative max-w-xl">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                placeholder="Search articles..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-black outline-none transition-all font-bold"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-black text-white text-[10px] font-black uppercase tracking-widest">
                                        <th className="px-6 py-4">Article</th>
                                        <th className="px-6 py-4">Category</th>
                                        <th className="px-6 py-4">Date</th>
                                        <th className="px-6 py-4">Actions</th>
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
                ) : (
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
                                            className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200"
                                        >
                                            Save All Settings
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
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
                    <div className="bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl relative p-8 md:p-12 my-8">
                        <button
                            onClick={resetForm}
                            className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6 text-black" />
                        </button>

                        <h2 className="text-3xl font-black text-black tracking-tighter uppercase italic mb-8">
                            {editingId ? "Edit Article_" : "New Article_"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
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

                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Full Content (HTML Supported)</label>
                                <textarea
                                    required
                                    rows={6}
                                    className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-black outline-none transition-all font-bold"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                />
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
                                        className="w-full bg-black text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl"
                                    >
                                        {editingId ? "Update Article" : "Publish Article"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
