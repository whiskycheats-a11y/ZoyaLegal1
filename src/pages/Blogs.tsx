import { ArrowRight, Calendar, User, Clock, Search, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useBlogs } from '../context/BlogContext';
import SkeletonBlog from '../components/SkeletonBlog';
import TopProgressBar from '../components/TopProgressBar';

export default function Blogs() {
    const { blogs, loading, language, setLanguage } = useBlogs();
    const [searchTerm, setSearchTerm] = useState("");

    const getTranslation = (en: string, hi: string) => language === 'hi' ? hi : en;

    const translateCategory = (cat: string) => {
        if (language === 'en') return cat;
        const mappings: Record<string, string> = {
            'Legal Insights': 'कानूनी अंतर्दृष्टि',
            'Digital Privacy': 'डिजिटल गोपनीयता',
            'Business Support': 'व्यापार सहायता',
            'Innovation': 'नवाचार'
        };
        return mappings[cat] || cat;
    };

    const translateReadTime = (time: string) => {
        if (language === 'en') return time;
        return time.replace('min read', 'मिनट की पढ़ाई')
            .replace('4', '4')
            .replace('5', '5')
            .replace('6', '6')
            .replace('7', '7');
    };

    const translateAuthor = (author: string) => {
        if (language === 'en') return author;
        const mappings: Record<string, string> = {
            'Zoya Legal Team': 'ज़ोया लीगल टीम',
            'Tech Support Unit': 'टेक सपोर्ट यूनिट',
            'Corporate Desk': 'कॉर्पोरेट डेस्क'
        };
        return mappings[author] || author;
    };

    const translateDate = (dateStr: string) => {
        if (language === 'en') return dateStr;
        const months: Record<string, string> = {
            'Jan': 'जनवरी', 'Feb': 'फरवरी', 'Mar': 'मार्च', 'Apr': 'अप्रैल',
            'May': 'मई', 'Jun': 'जून', 'Jul': 'जुलाई', 'Aug': 'अगस्त',
            'Sep': 'सितंबर', 'Oct': 'अक्टूबर', 'Nov': 'नवंबर', 'Dec': 'दिसंबर'
        };
        let translated = dateStr;
        Object.entries(months).forEach(([en, hi]) => {
            translated = translated.replace(en, hi);
        });
        return translated;
    };

    const filteredPosts = blogs.filter(post => {
        const title = language === 'en' ? post.title : (post.title_hi || post.title);
        const description = language === 'en' ? post.description : (post.description_hi || post.description);
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
                            placeholder={language === 'en' ? "Search articles, categories..." : "लेख, श्रेणियां खोजें..."}
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-gray-900/50 border-2 border-gray-800 text-white shadow-2xl transition-all duration-300 outline-none focus:border-white focus:bg-black placeholder:text-gray-600 font-bold"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Language Switcher */}
                    <div className="flex bg-gray-100/10 p-1.5 rounded-2xl w-fit mx-auto mt-10 border border-gray-800 backdrop-blur-sm">
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${language === 'en' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => setLanguage('hi')}
                            className={`px-8 py-3 rounded-xl font-black uppercase text-xs tracking-widest transition-all ${language === 'hi' ? 'bg-white text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                            हिन्दी
                        </button>
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
                                            {language === 'hi' && post.title_hi ? post.title_hi : post.title}
                                        </h2>

                                        <p className="text-gray-600 text-lg leading-relaxed font-bold">
                                            {language === 'hi' && post.description_hi ? post.description_hi : post.description}
                                        </p>

                                        <Link
                                            to={`/blogs/${post._id}`}
                                            className="inline-flex items-center text-black font-black uppercase tracking-widest group/link transition-all"
                                        >
                                            {language === 'en' ? 'Read Full Article' : 'पूरा लेख पढ़ें'}
                                            <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-2 transition-transform duration-300" />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <Search className="h-20 w-20 mx-auto mb-6 text-gray-200" />
                            <h3 className="text-2xl font-black text-black mb-2 uppercase">{getTranslation('No articles found', 'कोई लेख नहीं मिला')}</h3>
                            <p className="text-gray-500 font-bold mb-8">{getTranslation("We couldn't find any articles matching your search.", "हमें आपकी खोज से मेल खाने वाला कोई लेख नहीं मिला।")}</p>
                            <button
                                onClick={() => setSearchTerm("")}
                                className="text-black font-black hover:underline underline-offset-4"
                            >
                                {getTranslation('Clear Search', 'खोज साफ़ करें')}
                            </button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-20 bg-black text-white border-t border-gray-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter uppercase italic">{getTranslation('Stay Informed_', 'सूचित रहें_')}</h2>
                    <p className="text-xl text-gray-400 mb-10 font-bold">
                        {language === 'en' ? 'Subscribe to our newsletter for exclusive insights.' : 'विशेष अंतर्दृष्टि के लिए हमारे न्यूज़लेटर की सदस्यता लें।'}
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="email"
                            placeholder={language === 'en' ? "Enter your email" : "अपना ईमेल दर्ज करें"}
                            className="flex-1 px-8 py-5 rounded-2xl bg-gray-900 border-2 border-gray-800 text-white outline-none focus:border-white focus:bg-black transition-all font-bold shadow-2xl"
                            required
                        />
                        <button
                            type="submit"
                            className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-gray-100 transition-all shadow-2xl transform active:scale-95"
                        >
                            {language === 'en' ? 'Subscribe' : 'सब्सक्राइब करें'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
