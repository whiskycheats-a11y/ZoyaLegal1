import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Bookmark, Check } from 'lucide-react';
import { useBlogs } from '../context/BlogContext';
import { useEffect, useState } from 'react';

export default function BlogDetail() {
    const { id } = useParams();
    const { blogs, loading: globalLoading, language, setLanguage, cleanHindi } = useBlogs();
    const post = blogs.find(p => p._id === id);
    const [isSaved, setIsSaved] = useState(false);
    const [showNotification, setShowNotification] = useState<{ show: boolean, message: string }>({ show: false, message: "" });

    // Scroll to top and check bookmark status on mount
    useEffect(() => {
        window.scrollTo(0, 0);
        const saved = localStorage.getItem(`saved_blog_${id}`);
        setIsSaved(!!saved);
    }, [id]);

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
        return time.replace('min read', 'मिनट की पढ़ाई');
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

    const handleShare = async () => {
        if (post && navigator.share) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.description,
                    url: window.location.href,
                });
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error("Error sharing:", err);
                }
            }
        } else {
            navigator.clipboard.writeText(window.location.href);
            setShowNotification({ show: true, message: getTranslation("Link copied to clipboard!", "लिंक क्लिपबोर्ड पर कॉपी किया गया!") });
            setTimeout(() => setShowNotification({ show: false, message: "" }), 3000);
        }
    };

    const handleSave = () => {
        if (isSaved) {
            localStorage.removeItem(`saved_blog_${id}`);
            setIsSaved(false);
            setShowNotification({ show: true, message: getTranslation("Removed from bookmarks", "बुकमार्क से हटा दिया गया") });
        } else {
            localStorage.setItem(`saved_blog_${id}`, JSON.stringify(post));
            setIsSaved(true);
            setShowNotification({ show: true, message: getTranslation("Article saved successfully!", "लेख सफलतापूर्वक सहेजा गया!") });
        }
        setTimeout(() => setShowNotification({ show: false, message: "" }), 3000);
    };

    if (globalLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="font-black uppercase tracking-widest text-sm text-gray-400">{getTranslation('Loading Article...', 'लेख लोड हो रहा है...')}</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-black mb-4">{getTranslation('Post Not Found', 'लेख नहीं मिला')}</h1>
                    <Link to="/blogs" className="text-black font-bold hover:underline">{getTranslation('Back to Blogs', 'ब्लॉग पर वापस जाएं')}</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white relative">
            {/* Notification Toast */}
            {showNotification.show && (
                <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[100] bg-black text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-2xl flex items-center space-x-3 border-2 border-white/20 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-white/20 p-1 rounded-full">
                        <Check className="h-4 w-4" />
                    </div>
                    <span>{showNotification.message}</span>
                </div>
            )}

            {/* Header Image */}
            <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
                    <Link
                        to="/blogs"
                        className="inline-flex items-center text-white/80 hover:text-white mb-6 font-bold transition-colors group"
                    >
                        <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                        {language === 'en' ? 'Back to Articles' : 'वापस लेखों पर'}
                    </Link>
                    <div className="max-w-4xl">
                        <span className="bg-white text-black text-[10px] font-black tracking-widest py-1.5 px-4 rounded-full uppercase mb-4 inline-block">
                            {translateCategory(post.category)}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter uppercase italic leading-tight mb-6">
                            {language === 'hi' && post.title_hi ? cleanHindi(post.title_hi) : post.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/80 uppercase tracking-widest">
                            <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-2" />
                                {translateDate(post.date)}
                            </div>
                            <div className="flex items-center">
                                <User className="h-4 w-4 mr-2" />
                                {translateAuthor(post.author)}
                            </div>
                            <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                {translateReadTime(post.readTime)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="max-w-4xl mx-auto px-4 py-16 md:py-24">
                <div className="flex justify-between items-center mb-12 border-b border-gray-100 pb-8">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-black text-xl shadow-lg">
                            {post.author[0]}
                        </div>
                        <div>
                            <p className="font-black text-black text-lg">{translateAuthor(post.author)}</p>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest italic">{getTranslation('Senior Contributor', 'वरिष्ठ योगदानकर्ता')}</p>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <div className="flex space-x-2 items-center">
                            <div className="flex bg-gray-100 p-1.5 rounded-2xl mr-4 border border-gray-200">
                                <button
                                    onClick={() => setLanguage('en')}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${language === 'en' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                                >
                                    English
                                </button>
                                <button
                                    onClick={() => setLanguage('hi')}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${language === 'hi' ? 'bg-black text-white shadow-lg' : 'text-gray-400 hover:text-black'}`}
                                >
                                    हिन्दी
                                </button>
                            </div>
                            <button
                                onClick={handleShare}
                                className="p-3 rounded-full hover:bg-gray-100 transition-colors group"
                                title={getTranslation('Share Article', 'लेख साझा करें')}
                            >
                                <Share2 className="h-5 w-5 text-gray-400 group-hover:text-black" />
                            </button>
                            <button
                                onClick={handleSave}
                                className={`p-3 rounded-full transition-colors group ${isSaved ? 'bg-black text-white' : 'hover:bg-gray-100'}`}
                                title={isSaved ? getTranslation("Remove Bookmark", "बुकमार्क हटाएं") : getTranslation("Save Article", "लेख सहेजें")}
                            >
                                <Bookmark className={`h-5 w-5 ${isSaved ? 'text-white' : 'text-gray-400 group-hover:text-black'}`} />
                            </button>
                            {post.pdfUrl && (
                                <a
                                    href={post.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-black text-white rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-gray-800 transition-all flex items-center gap-2"
                                    title={getTranslation("View PDF Document", "PDF दस्तावेज़ देखें")}
                                >
                                    📄 PDF
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-bold editor-content"
                    dangerouslySetInnerHTML={{ __html: (language === 'hi' && post.content_hi && post.content_hi.trim() !== "") ? cleanHindi(post.content_hi) : post.content }}
                />

                {/* Action Bottom */}
                <div className="mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <h4 className="text-xl font-black text-black uppercase tracking-tighter italic mb-2">
                            {language === 'en' ? 'Enjoyed this article?' : 'क्या आपको यह लेख पसंद आया?'}
                        </h4>
                        <p className="text-gray-500 font-bold">
                            {language === 'en' ? 'Share your thoughts or spread the knowledge.' : 'अपने विचार साझा करें या ज्ञान फैलाएं।'}
                        </p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <button
                            onClick={handleShare}
                            className="flex-1 md:flex-none px-8 py-4 bg-black text-white rounded-xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 flex items-center justify-center"
                        >
                            <Share2 className="mr-2 h-5 w-5" />
                            {language === 'en' ? 'Share Article' : 'लेख साझा करें'}
                        </button>
                        <Link to="/blogs" className="flex-1 md:flex-none px-8 py-4 border-2 border-black text-black rounded-xl font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all text-center">
                            {language === 'en' ? 'More Insights' : 'अधिक जानकारी'}
                        </Link>
                    </div>
                </div>
            </article>

            {/* Suggested Reading */}
            <section className="bg-gray-50 py-20 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-black mb-12 text-black tracking-tighter uppercase italic underline decoration-4 underline-offset-8 decoration-gray-200">{getTranslation('Suggested Reading_', 'सुझाए गए लेख_')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {blogs.filter(p => p._id !== post._id).slice(0, 3).map(p => (
                            <Link key={p._id} to={`/blogs/${p._id}`} className="group block bg-white p-6 rounded-3xl border border-gray-100 hover:border-black transition-all shadow-sm hover:shadow-xl">
                                <span className="text-[10px] font-black tracking-widest uppercase text-gray-400 mb-2 block">{translateCategory(p.category)}</span>
                                <h3 className="text-xl font-black text-black group-hover:underline decoration-2 underline-offset-4 mb-3">{language === 'hi' && p.title_hi ? cleanHindi(p.title_hi) : p.title}</h3>
                                <div className="flex items-center text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <Clock className="h-3 w-3 mr-1.5" /> {translateReadTime(p.readTime)}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div >
    );
}
