import { ArrowRight, Calendar, User, Clock, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useBlogs } from '../context/BlogContext';
import SkeletonBlog from '../components/SkeletonBlog';
import TopProgressBar from '../components/TopProgressBar';

export default function Blogs() {
    const { blogs, loading, language, cleanHindi, t } = useBlogs();
    const [searchTerm, setSearchTerm] = useState("");

    const translateCategory = (cat: string) => t(cat);
    const translateReadTime = (time: string) => time.replace('min read', t('min read'));
    const translateAuthor = (author: string) => t(author);

    const translateDate = (dateStr: string) => {
        let translated = dateStr;
        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].forEach(m => {
            translated = translated.replace(m, t(m));
        });
        return translated;
    };

    const filteredPosts = blogs.filter(post => {
        const title = language === 'en' ? post.title : cleanHindi(post.title_hi || post.title);
        const description = language === 'en' ? post.description : cleanHindi(post.description_hi || post.description);
        return title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.category.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="min-h-screen bg-white">
            <TopProgressBar />
            {/* Hero Section */}
            <section className="bg-black text-white py-20 md:py-24 border-b border-gray-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 to-black opacity-50"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <BookOpen className="h-16 w-16 mx-auto mb-6 text-white animate-pulse" />
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase italic">
                        {language === 'en' ? 'Zoya Legal' : 'ज़ोया लीगल'}<span className="text-gray-500">{language === 'en' ? '_Insights' : '_इनसाइट्स'}</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-bold mb-10">
                        {language === 'en' ? 'Expert legal analysis, digital trends, and professional advice.' : 'विशेषज्ञ कानूनी विश्लेषण, डिजिटल रुझान और पेशेवर सलाह।'}
                    </p>

                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5 group-focus-within:text-white transition-all duration-300" />
                        <input
                            type="text"
                            placeholder={t("Search articles, categories...")}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {[1, 2, 3, 4].map(i => <SkeletonBlog key={i} />)}
                        </div>
                    ) : filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {filteredPosts.map((post) => (
                                <div key={post._id} className="group cursor-pointer animate-fade-in">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-3xl mb-6 bg-gray-100 border border-gray-200 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-black transform group-hover:-translate-y-2">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            loading="lazy"
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="bg-black text-white text-[10px] font-black tracking-widest py-1.5 px-4 rounded-full uppercase">
                                                {translateCategory(post.category)}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4 text-xs font-black text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center">
                                                <Calendar className="h-3.5 w-3.5 mr-1.5" />
                                                {translateDate(post.date)}
                                            </div>
                                            <div className="flex items-center text-black">
                                                <User className="h-3.5 w-3.5 mr-1.5" />
                                                {translateAuthor(post.author)}
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-3.5 w-3.5 mr-1.5" />
                                                {translateReadTime(post.readTime)}
                                            </div>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-black text-black group-hover:underline decoration-4 underline-offset-8 decoration-gray-200 transition-all">
                                            {language === 'hi' && post.title_hi ? cleanHindi(post.title_hi) : post.title}
                                        </h2>

                                        <p className="text-gray-600 text-lg leading-relaxed font-bold">
                                            {language === 'hi' && post.description_hi ? cleanHindi(post.description_hi) : post.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-4">
                                            <Link
                                                to={`/blogs/${post._id}`}
                                                className="inline-flex items-center text-black font-black uppercase tracking-widest group/link transition-all h-fit"
                                            >
                                                {t('Read Full Article')}
                                                <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-2 transition-transform duration-300" />
                                            </Link>

                                            {/* Premium 3D Promotional Block */}
                                            <div className="card-3d-wrap max-w-[300px]">
                                                <div className="card-3d-inner glass-card p-5 rounded-2xl border-l-4 border-l-blue-600 shadow-xl group/promo hover:shadow-blue-500/10 transition-all">
                                                    <p className="text-[14px] font-black text-black leading-tight mb-2">
                                                        क्या आप इस समस्या से परेशान हैं?
                                                    </p>
                                                    <p className="text-[11px] font-bold text-gray-500 leading-snug mb-3">
                                                        अगर आपकी स्थिति अलग है या मामला गंभीर है, तो सही कानूनी सलाह बहुत ज़रूरी है।
                                                    </p>
                                                    <Link
                                                        to="/contact"
                                                        className="flex items-center justify-between bg-black text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all group-hover/promo:scale-105"
                                                    >
                                                        ZoyaLegal एक्सपर्ट से परामर्श लें
                                                        <ArrowRight className="h-3 w-3 ml-2" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Search className="h-20 w-20 mx-auto mb-6 text-gray-200" />
                            <h3 className="text-2xl font-black text-black mb-2 uppercase">{t('No articles found')}</h3>
                            <p className="text-gray-500 font-bold mb-8">{t("We couldn't find any articles matching your search.")}</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="text-black font-black hover:underline underline-offset-4"
                            >
                                {t('Clear Search')}
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
