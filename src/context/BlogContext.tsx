import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

import { BlogPost, Advocate, Act, Judgment, SiteSettings } from '../types/legal';

interface BlogContextType {
    blogs: BlogPost[];
    advocates: Advocate[];
    acts: Act[];
    judgments: Judgment[];
    settings: SiteSettings | null;
    loading: boolean;
    error: string | null;
    fetchBlogs: () => Promise<void>;
    addBlog: (blog: Omit<BlogPost, '_id'>) => Promise<void>;
    updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
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
    language: 'en' | 'hi';
    setLanguage: (lang: 'en' | 'hi') => void;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [advocates, setAdvocates] = useState<Advocate[]>([]);
    const [acts, setActs] = useState<Act[]>([]);
    const [judgments, setJudgments] = useState<Judgment[]>([]);
    const [settings, setSettings] = useState<SiteSettings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [language, setLanguage] = useState<'en' | 'hi'>((localStorage.getItem('preferredLanguage') as any) || 'en');

    useEffect(() => {
        localStorage.setItem('preferredLanguage', language);
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
            const response = await axios.get(`${API_URL}/api/blogs`);
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
            const response = await axios.get(`${API_URL}/api/advocates`);
            setAdvocates(response.data);
            sessionStorage.setItem('zoya_advocates_cache', JSON.stringify(response.data));
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
            const response = await axios.get(`${API_URL}/api/acts`);
            setActs(response.data);
            sessionStorage.setItem('zoya_acts_cache', JSON.stringify(response.data));
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
            const response = await axios.get(`${API_URL}/api/judgments`);
            setJudgments(response.data);
            sessionStorage.setItem('zoya_judgments_cache', JSON.stringify(response.data));
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

            const response = await axios.get(`${API_URL}/api/settings`);
            setSettings(response.data);
            sessionStorage.setItem('zoya_settings_cache', JSON.stringify(response.data));
        } catch (err) {
            console.error('Error fetching settings:', err);
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
                    fetchSettings()
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
            setActs(prev => [response.data, ...prev]);
        } catch (err) {
            console.error('Error adding act:', err);
            throw err;
        }
    };

    const updateAct = async (id: string, act: Partial<Act>) => {
        try {
            const response = await axios.put(`${API_URL}/api/acts/${id}`, act);
            setActs(prev => prev.map(a => a._id === id ? response.data : a));
        } catch (err) {
            console.error('Error updating act:', err);
            throw err;
        }
    };

    const deleteAct = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/acts/${id}`);
            setActs(prev => prev.filter(a => a._id !== id));
        } catch (err) {
            console.error('Error deleting act:', err);
            throw err;
        }
    };

    const addJudgment = async (judgment: Omit<Judgment, '_id'>) => {
        try {
            const response = await axios.post(`${API_URL}/api/judgments`, judgment);
            setJudgments(prev => [response.data, ...prev]);
        } catch (err) {
            console.error('Error adding judgment:', err);
            throw err;
        }
    };

    const updateJudgment = async (id: string, judgment: Partial<Judgment>) => {
        try {
            const response = await axios.put(`${API_URL}/api/judgments/${id}`, judgment);
            setJudgments(prev => prev.map(j => j._id === id ? response.data : j));
        } catch (err) {
            console.error('Error updating judgment:', err);
            throw err;
        }
    };

    const deleteJudgment = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/judgments/${id}`);
            setJudgments(prev => prev.filter(j => j._id !== id));
        } catch (err) {
            console.error('Error deleting judgment:', err);
            throw err;
        }
    };

    const deleteAdvocate = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/advocates/${id}`);
            setAdvocates(prev => prev.filter(a => a._id !== id));
            // Update cache
            const updated = advocates.filter(a => a._id !== id);
            sessionStorage.setItem('zoya_advocates_cache', JSON.stringify(updated));
        } catch (err) {
            console.error('Error deleting advocate:', err);
            throw err;
        }
    };

    const addBlog = async (blog: Omit<BlogPost, '_id'>) => {
        try {
            const response = await axios.post(`${API_URL}/api/blogs`, blog);
            setBlogs(prev => [response.data, ...prev]);
        } catch (err) {
            console.error('Error adding blog:', err);
            throw err;
        }
    };

    const updateBlog = async (id: string, blog: Partial<BlogPost>) => {
        try {
            const response = await axios.put(`${API_URL}/api/blogs/${id}`, blog);
            setBlogs(prev => prev.map(b => b._id === id ? response.data : b));
        } catch (err) {
            console.error('Error updating blog:', err);
            throw err;
        }
    };

    const deleteBlog = async (id: string) => {
        try {
            await axios.delete(`${API_URL}/api/blogs/${id}`);
            setBlogs(prev => prev.filter(b => b._id !== id));
        } catch (err) {
            console.error('Error deleting blog:', err);
            throw err;
        }
    };

    const updateSettings = async (newSiteSettings: Partial<SiteSettings>) => {
        try {
            const response = await axios.post(`${API_URL}/api/settings`, newSiteSettings);
            setSettings(response.data);
        } catch (err) {
            console.error('Error updating settings:', err);
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

    return (
        <BlogContext.Provider value={{
            blogs, advocates, acts, judgments, settings, loading, error,
            fetchBlogs, addBlog, updateBlog, deleteBlog,
            fetchAdvocates, deleteAdvocate,
            fetchActs, addAct, updateAct, deleteAct,
            fetchJudgments, addJudgment, updateJudgment, deleteJudgment,
            fetchSettings, updateSettings,
            translateText,
            language, setLanguage
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
