import { ArrowRight, Calendar, User, Clock, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useBlogs } from '../context/BlogContext';

export default function Blogs() {
    const { blogs, loading } = useBlogs();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPosts = blogs.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-black text-white py-20 md:py-24 border-b border-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <BookOpen className="h-16 w-16 mx-auto mb-6 text-white animate-pulse" />
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase italic">
                        Zoya Legal<span className="text-gray-500">_Insights</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-bold mb-10">
                        Expert legal analysis, digital trends, and professional advice delivered weekly.
                    </p>

                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 group-focus-within:text-white transition-all duration-300" />
                        <input
                            type="text"
                            placeholder="Search articles, categories..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-800 text-white shadow-2xl transition-all duration-300 outline-none focus:border-white focus:bg-black placeholder:text-gray-600 font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="font-black uppercase tracking-widest text-sm text-gray-400">Loading database...</p>
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {filteredPosts.map((post) => (
                                <div key={post._id} className="group cursor-pointer">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6 bg-gray-100 border border-gray-200 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-black transform group-hover:-translate-y-2">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-black text-white text-[10px] font-black tracking-widest py-1.5 px-4 rounded-full uppercase">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center">
                                                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                                {post.date}
                                            </div>
                                            <div className="flex items-center text-black">
                                                <User className="h-3.5 w-3.5 mr-1.5" />
                                                {post.author}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                                {post.readTime}
                                            </div>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-black text-black group-hover:underline decoration-4 underline-offset-8 decoration-gray-200 transition-all">
                                            {post.title}
                                        </h2>

                                        <p className="text-gray-600 text-lg leading-relaxed font-bold">
                                            {post.description}
                                        </p>

                                        <Link
                                            to={`/blogs/${post._id}`}
                                            className="inline-flex items-center text-black font-black uppercase tracking-widest group/link transition-all"
                                        >
                                            Read Full Article
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-2 transition-transform duration-300" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Search className="h-20 w-20 mx-auto mb-6 text-gray-200" />
                            <h3 className="text-2xl font-black text-black mb-2 uppercase">No articles found</h3>
                            <p className="text-gray-500 font-bold mb-8">We couldn't find any articles matching your search.</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="text-black font-black hover:underline underline-offset-4"
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-black text-white border-t border-gray-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase italic">Stay Informed_</h2>
                    <p className="text-xl text-gray-400 mb-10 font-bold">
                        Subscribe to our newsletter for exclusive insights and legal updates.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-8 py-5 rounded-2xl bg-gray-900 border-2 border-gray-800 text-white outline-none focus:border-white focus:bg-black transition-all font-bold shadow-2xl"
                            required
                        />
                        <button
                            type="submit"
                            className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl transform active:scale-95"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
