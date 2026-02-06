import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

import { BlogPost, Advocate, Act, Judgment, SiteSettings, Testimonial } from '../types/legal';

interface BlogContextType {
    blogs: BlogPost[];
    advocates: Advocate[];
    acts: Act[];
    judgments: Judgment[];
    settings: SiteSettings | null;
    testimonials: Testimonial[];
    loading: boolean;
    error: string | null;
    fetchBlogs: () => Promise<void>;
    addBlog: (blog: Omit<BlogPost, '_id'>) => Promise<void>;
    updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    fetchTestimonials: () => Promise<void>;
    addTestimonial: (testimonial: Omit<Testimonial, '_id'>) => Promise<void>;
    deleteTestimonial: (id: string) => Promise<void>;
    fetchAdvocates: () => Promise<void>;
    deleteAdvocate: (id: string) => Promise<void>;
    fetchActs: () => Promise<void>;
    addAct: (act: Omit<Act, '_id'>) => Promise<void>;
    updateAct: (id: string, act: Partial<Act>) => Promise<void>;
    deleteAct: (id: string) => Promise<void>;
    fetchJudgments: () => Promise<void>;
    addJudgment: (judgment: Omit<Judgment, '_id'>) => Promise<void>;
    updateJudgment: (id: string, judgment: Partial<Judgment>) => Promise<void>;
    deleteJudgment: (id: string) => Promise<void>;
    fetchSettings: () => Promise<void>;
    updateSettings: (settings: Partial<SiteSettings>) => Promise<void>;
    translateText: (text: string, type?: 'text' | 'html') => Promise<string>;
    cleanHindi: (text: string | undefined) => string;
    language: 'en' | 'hi';
    setLanguage: (lang: 'en' | 'hi') => void;
    t: (key: string) => string;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [acts, setActs] = useState<Act[]>([]);
    const [judgments, setJudgments] = useState<Judgment[]>([]);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState<'en' | 'hi'>((localStorage.getItem('preferredLanguage') as any) || 'en');

    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
        // Force refetch and clear cache when switching to Hindi to catch background repairs
        if (language === 'hi') {
            sessionStorage.removeItem('zoya_blogs_cache');
            fetchBlogs();
        }
    }, [language]);

    const fetchBlogs = async () => {
        try {
            // Load from cache first
            const cachedBlogs = sessionStorage.getItem('zoya_blogs_cache');
            if (cachedBlogs) {
                setBlogs(JSON.parse(cachedBlogs));
                setLoading(false);
            }

            setLoading(true);
            const response = await axios.get(`${API_URL}/api/blogs?t=${Date.now()}`);
            setBlogs(response.data);
            sessionStorage.setItem('zoya_blogs_cache', JSON.stringify(response.data));
            setError(null);
        } catch (err) {
            setError('Failed to fetch blogs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchAdvocates = async () => {
        try {
            const cachedAdvocates = sessionStorage.getItem('zoya_advocates_cache');
            if (cachedAdvocates) {
                setAdvocates(JSON.parse(cachedAdvocates));
                setLoading(false);
            }

            setLoading(true);
            const response = await axios.get(`${API_URL}/api/advocates?t=${Date.now()}`);
            const optimizedData = response.data.map((adv: Advocate) => ({
                ...adv,
                photo: adv.photo ? adv.photo.replace('/upload/', '/upload/q_auto,f_auto,w_500,c_fill,g_face/') : adv.photo
            }));
            setAdvocates(optimizedData);
            sessionStorage.setItem('zoya_advocates_cache', JSON.stringify(optimizedData));
        } catch (err) {
            console.error('Error fetching advocates:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchActs = async () => {
        try {
            const cachedActs = sessionStorage.getItem('zoya_acts_cache');
            if (cachedActs) {
                setActs(JSON.parse(cachedActs));
            }
            const response = await axios.get(`${API_URL}/api/acts?t=${Date.now()}`);
            const sanitizedData = response.data.map((act: any) => {
                let url = act.pdfUrl;
                if (url && url.includes('lscontent.nic.in')) {
                    if (url.includes('A2023-45.pdf')) url = "https://prsindia.org/files/bills_acts/acts_parliament/2023/The%20Bharatiya%20Nyaya%20Sanhita,%202023.pdf";
                    else if (url.includes('A2023-46.pdf')) url = "https://prsindia.org/files/bills_acts/acts_parliament/2023/The%20Bharatiya%20Nagarik%20Suraksha%20Sanhita,%202023.pdf";
                    else if (url.includes('A2023-47.pdf')) url = "https://prsindia.org/files/bills_acts/acts_parliament/2023/The%20Bharatiya%20Sakshya%20Adhiniyam,%202023.pdf";
                    else if (act.name.includes('Constitution')) url = "https://www.indiacode.nic.in/bitstream/123456789/15240/1/constitution_of_india.pdf";
                    else url = `https://www.indiacode.nic.in/simple-search?query=${encodeURIComponent(act.name)}`;
                }
                return { ...act, pdfUrl: url };
            });
            setActs(sanitizedData);
            sessionStorage.setItem('zoya_acts_cache', JSON.stringify(sanitizedData));
        } catch (err) {
            console.error('Error fetching acts:', err);
        }
    };

    const fetchJudgments = async () => {
        try {
            const cachedJudgments = sessionStorage.getItem('zoya_judgments_cache');
            if (cachedJudgments) {
                setJudgments(JSON.parse(cachedJudgments));
            }
            const response = await axios.get(`${API_URL}/api/judgments?t=${Date.now()}`);
            const sanitizedData = response.data.map((j: any) => {
                let url = j.pdfUrl;
                if (url === "#" || !url) {
                    if (j.title.includes('Kesavananda Bharati')) url = "https://www.scobserver.in/wp-content/uploads/2021/10/Kesavananda-Bharati-Judgment.pdf";
                    else if (j.title.includes('Maneka Gandhi')) url = "https://www.scobserver.in/wp-content/uploads/2021/10/Maneka-Gandhi-v.-Union-of-India.pdf";
                }
                return { ...j, pdfUrl: url };
            });
            setJudgments(sanitizedData);
            sessionStorage.setItem('zoya_judgments_cache', JSON.stringify(sanitizedData));
        } catch (err) {
            console.error('Error fetching judgments:', err);
        }
    };

    const fetchSettings = async () => {
        try {
            const cachedSiteSettings = sessionStorage.getItem('zoya_settings_cache');
            if (cachedSiteSettings) {
                setSettings(JSON.parse(cachedSiteSettings));
            }

            const response = await axios.get(`${API_URL}/api/settings?t=${Date.now()}`);
            setSettings(response.data);
            sessionStorage.setItem('zoya_settings_cache', JSON.stringify(response.data));
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    };

    const fetchTestimonials = async () => {
        try {
            const cachedTestimonials = sessionStorage.getItem('zoya_testimonials_cache');
            if (cachedTestimonials) {
                setTestimonials(JSON.parse(cachedTestimonials));
            }

            const response = await axios.get(`${API_URL}/api/testimonials?t=${Date.now()}`);
            setTestimonials(response.data);
            sessionStorage.setItem('zoya_testimonials_cache', JSON.stringify(response.data));
        } catch (err) {
            console.error('Error fetching testimonials:', err);
        }
    };

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                await Promise.all([
                    fetchBlogs(),
                    fetchAdvocates(),
                    fetchActs(),
                    fetchJudgments(),
                    fetchSettings(),
                    fetchTestimonials()
                ]);
            } catch (err) {
                console.error("Error in initial fetch:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const addAct = async (act: Omit<Act, '_id'>) => {
        try {
            const response = await axios.post(`${API_URL}/api/acts`, act);
            const updated = [response.data, ...acts];
            setActs(updated);
            sessionStorage.setItem('zoya_acts_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error adding act:', err);
            throw err;
        }
    };

    const updateAct = async (id: string, act: Partial<Act>) => {
        try {
            const response = await axios.put(`${API_URL}/api/acts/${id}`, act);
            const updated = acts.map(a => a._id === id ? response.data : a);
            setActs(updated);
            sessionStorage.setItem('zoya_acts_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error updating act:', err);
            throw err;
        }
    };

    const deleteAct = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/acts/${id}`);
            const updated = acts.filter(a => a._id !== id);
            setActs(updated);
            sessionStorage.setItem('zoya_acts_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error deleting act:', err);
            throw err;
        }
    };

    const addJudgment = async (judgment: Omit<Judgment, '_id'>) => {
        try {
            const response = await axios.post(`${API_URL}/api/judgments`, judgment);
            const updated = [response.data, ...judgments];
            setJudgments(updated);
            sessionStorage.setItem('zoya_judgments_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error adding judgment:', err);
            throw err;
        }
    };

    const updateJudgment = async (id: string, judgment: Partial<Judgment>) => {
        try {
            const response = await axios.put(`${API_URL}/api/judgments/${id}`, judgment);
            const updated = judgments.map(j => j._id === id ? response.data : j);
            setJudgments(updated);
            sessionStorage.setItem('zoya_judgments_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error updating judgment:', err);
            throw err;
        }
    };

    const deleteJudgment = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/judgments/${id}`);
            const updated = judgments.filter(j => j._id !== id);
            setJudgments(updated);
            sessionStorage.setItem('zoya_judgments_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error deleting judgment:', err);
            throw err;
        }
    };

    const deleteAdvocate = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/advocates/${id}`);
            const updatedAdvocates = advocates.filter(a => a._id !== id);
            setAdvocates(updatedAdvocates);
            sessionStorage.setItem('zoya_advocates_cache', JSON.stringify(updatedAdvocates));
        } catch (err) {
            console.error('Error deleting advocate:', err);
            throw err;
        }
    };

    const addBlog = async (blog: Omit<BlogPost, '_id'>) => {
        try {
            const response = await axios.post(`${API_URL}/api/blogs`, blog);
            const updatedBlogs = [response.data, ...blogs];
            setBlogs(updatedBlogs);
            sessionStorage.setItem('zoya_blogs_cache', JSON.stringify(updatedBlogs));
        } catch (err) {
            console.error('Error adding blog:', err);
            throw err;
        }
    };

    const updateBlog = async (id: string, blog: Partial<BlogPost>) => {
        try {
            const response = await axios.put(`${API_URL}/api/blogs/${id}`, blog);
            const updatedBlogs = blogs.map(b => b._id === id ? response.data : b);
            setBlogs(updatedBlogs);
            sessionStorage.setItem('zoya_blogs_cache', JSON.stringify(updatedBlogs));
        } catch (err) {
            console.error('Error updating blog:', err);
            throw err;
        }
    };

    const deleteBlog = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/blogs/${id}`);
            const updatedBlogs = blogs.filter(b => b._id !== id);
            setBlogs(updatedBlogs);
            sessionStorage.setItem('zoya_blogs_cache', JSON.stringify(updatedBlogs));
        } catch (err) {
            console.error('Error deleting blog:', err);
            throw err;
        }
    };

    const updateSettings = async (newSiteSettings: Partial<SiteSettings>) => {
        try {
            const response = await axios.post(`${API_URL}/api/settings`, newSiteSettings);
            setSettings(response.data);
            sessionStorage.setItem('zoya_settings_cache', JSON.stringify(response.data));
        } catch (err) {
            console.error('Error updating settings:', err);
            throw err;
        }
    };

    const addTestimonial = async (testimonial: Omit<Testimonial, '_id'>) => {
        try {
            const response = await axios.post(`${API_URL}/api/testimonials`, testimonial);
            const updated = [response.data, ...testimonials];
            setTestimonials(updated);
            sessionStorage.setItem('zoya_testimonials_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error adding testimonial:', err);
            throw err;
        }
    };

    const deleteTestimonial = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/testimonials/${id}`);
            const updated = testimonials.filter(t => t._id !== id);
            setTestimonials(updated);
            sessionStorage.setItem('zoya_testimonials_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error deleting testimonial:', err);
            throw err;
        }
    };

    const translateText = async (text: string, type: 'text' | 'html' = 'text'): Promise<string> => {
        try {
            const response = await axios.post(`${API_URL}/api/translate`, { text, type });
            return response.data.translation;
        } catch (err) {
            console.error('Translation error:', err);
            throw new Error('Failed to translate text');
        }
    };

    const cleanHindi = (text: string | undefined): string => {
        if (!text) return "";
        return text.replace(/<(?:HINDI|hindi)>|<\/(?:HINDI|hindi)>/g, "").trim();
    };

    const translations: Record<'en' | 'hi', Record<string, string>> = {
        en: {
            // General UI
            'Home': 'Home',
            'Advocates': 'Advocates',
            'Acts & Judgments': 'Acts & Judgments',
            'Blogs': 'Blogs',
            'Payment': 'Payment',
            'Contact': 'Contact',
            'Services': 'Services',
            'Pay Now': 'Pay Now',
            'Read Full Article': 'Read Full Article',
            'Back to Articles': 'Back to Articles',
            'Suggested Reading_': 'Suggested Reading_',
            'Stay Informed_': 'Stay Informed_',
            'Search articles, categories...': 'Search articles, categories...',
            'Senior Contributor': 'Senior Contributor',
            'min read': 'min read',
            'No articles found': 'No articles found',
            "We couldn't find any articles matching your search.": "We couldn't find any articles matching your search.",
            'Clear Search': 'Clear Search',
            'Subscribe': 'Subscribe',
            'Enter your email': 'Enter your email',
            'Read_': 'Read_',
            'All Acts': 'All Acts',
            'Central Acts': 'Central Acts',
            'State Acts': 'State Acts',
            'Search through Acts & Sections...': 'Search through Acts & Sections...',
            'Search through Judgments & Courts...': 'Search through Judgments & Courts...',
            'Post Not Found': 'Post Not Found',
            'Back to Blogs': 'Back to Blogs',
            'Loading Article...': 'Loading Article...',
            'Share Article': 'Share Article',
            'Link copied to clipboard!': 'Link copied to clipboard!',
            'Removed from bookmarks': 'Removed from bookmarks',
            'Article saved successfully!': 'Article saved successfully!',
            'Remove Bookmark': 'Remove Bookmark',
            'Save Article': 'Save Article',
            'View PDF Document': 'View PDF Document',
            'Enjoyed this article?': 'Enjoyed this article?',
            'Share your thoughts or spread the knowledge.': 'Share your thoughts or spread the knowledge.',
            'More Insights': 'More Insights',

            // Categories & Teams
            'Legal Insights': 'Legal Insights',
            'Digital Privacy': 'Digital Privacy',
            'Business Support': 'Business Support',
            'Innovation': 'Innovation',
            'Zoya Legal Team': 'Zoya Legal Team',
            'Tech Support Unit': 'Tech Support Unit',
            'Corporate Desk': 'Corporate Desk',

            // Dates
            'Jan': 'Jan', 'Feb': 'Feb', 'Mar': 'Mar', 'Apr': 'Apr', 'May': 'May', 'Jun': 'Jun',
            'Jul': 'Jul', 'Aug': 'Aug', 'Sep': 'Sep', 'Oct': 'Oct', 'Nov': 'Nov', 'Dec': 'Dec'
        },
        hi: {
            // General UI
            'Home': 'होम',
            'Advocates': 'अधिवक्ता',
            'Acts & Judgments': 'अधिनियम और निर्णय',
            'Blogs': 'ब्लॉग',
            'Payment': 'भुगतान',
            'Contact': 'संपर्क',
            'Services': 'सेवाएं',
            'Pay Now': 'अभी भुगतान करें',
            'Read Full Article': 'पूरा लेख पढ़ें',
            'Back to Articles': 'वापस लेखों पर',
            'Suggested Reading_': 'सुझाए गए लेख_',
            'Stay Informed_': 'सूचित रहें_',
            'Search articles, categories...': 'लेख, श्रेणियां खोजें...',
            'Senior Contributor': 'वरिष्ठ योगदानकर्ता',
            'min read': 'मिनट की पढ़ाई',
            'No articles found': 'कोई लेख नहीं मिला',
            "We couldn't find any articles matching your search.": "हमें आपकी खोज से मेल खाने वाला कोई लेख नहीं मिला।",
            'Clear Search': 'खोज साफ़ करें',
            'Subscribe': 'सब्सक्राइब करें',
            'Enter your email': 'अपना ईमेल दर्ज करें',
            'Read_': 'पढ़ें_',
            'All Acts': 'सभी अधिनियम',
            'Central Acts': 'केंद्रीय अधिनियम',
            'State Acts': 'राज्य अधिनियम',
            'Search through Acts & Sections...': 'अधिनियम और अनुभागों में खोजें...',
            'Search through Judgments & Courts...': 'निर्णयों और न्यायालयों में खोजें...',
            'Post Not Found': 'लेख नहीं मिला',
            'Back to Blogs': 'ब्लॉग पर वापस जाएं',
            'Loading Article...': 'लेख लोड हो रहा है...',
            'Share Article': 'लेख साझा करें',
            'Link copied to clipboard!': 'लिंक क्लिपबोर्ड पर कॉपी किया गया!',
            'Removed from bookmarks': 'बुकमार्क से हटा दिया गया',
            'Article saved successfully!': 'लेख सफलतापूर्वक सहेजा गया!',
            'Remove Bookmark': 'बुकमार्क हटाएं',
            'Save Article': 'लेख सहेजें',
            'View PDF Document': 'PDF दस्तावेज़ देखें',
            'Enjoyed this article?': 'क्या आपको यह लेख पसंद आया?',
            'Share your thoughts or spread the knowledge.': 'अपने विचार साझा करें या ज्ञान फैलाएं।',
            'More Insights': 'अधिक जानकारी',

            // Categories & Teams
            'Legal Insights': 'कानूनी अंतर्दृष्टि',
            'Digital Privacy': 'डिजिटल गोपनीयता',
            'Business Support': 'व्यापार सहायता',
            'Innovation': 'नवाचार',
            'Zoya Legal Team': 'ज़ोया लीगल टीम',
            'Tech Support Unit': 'टेक सपोर्ट यूनिट',
            'Corporate Desk': 'कॉर्पोरेट डेस्क',

            // Dates
            'Jan': 'जनवरी', 'Feb': 'फरवरी', 'Mar': 'मार्च', 'Apr': 'अप्रैल', 'May': 'मई', 'Jun': 'जून',
            'Jul': 'जुलाई', 'Aug': 'अगस्त', 'Sep': 'सितंबर', 'Oct': 'अक्टूबर', 'Nov': 'नवंबर', 'Dec': 'दिसंबर'
        }
    };

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <BlogContext.Provider value={{
            blogs, advocates, acts, judgments, settings, loading, error,
            fetchBlogs, addBlog, updateBlog, deleteBlog,
            fetchAdvocates, deleteAdvocate,
            fetchActs, addAct, updateAct, deleteAct,
            fetchJudgments, addJudgment, updateJudgment, deleteJudgment,
            fetchSettings, updateSettings,
            testimonials, fetchTestimonials, addTestimonial, deleteTestimonial,
            translateText,
            cleanHindi,
            language, setLanguage,
            t
        }}>
            {children}
        </BlogContext.Provider>
    );
}

export function useBlogs() {
    const context = useContext(BlogContext);
    if (context === undefined) {
        throw new Error('useBlogs must be used within a BlogProvider');
    }
    return context;
}
