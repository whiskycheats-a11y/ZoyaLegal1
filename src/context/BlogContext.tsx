import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface BlogPost {
    _id?: string;
    id?: number; // for backward compatibility with local data
    title: string;
    description: string;
    content: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
}

interface Settings {
    whatsapp: string;
    phone: string;
    email: string;
    address: string;
    socialLinks: {
        instagram: string;
        twitter: string;
        facebook: string;
    }
}

interface BlogContextType {
    blogs: BlogPost[];
    settings: Settings | null;
    loading: boolean;
    error: string | null;
    fetchBlogs: () => Promise<void>;
    addBlog: (blog: Omit<BlogPost, '_id'>) => Promise<void>;
    updateBlog: (id: string, blog: Partial<BlogPost>) => Promise<void>;
    deleteBlog: (id: string) => Promise<void>;
    fetchSettings: () => Promise<void>;
    updateSettings: (settings: Partial<Settings>) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [settings, setSettings] = useState<Settings | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/api/blogs`);
            setBlogs(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch blogs');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchSettings = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/settings`);
            setSettings(response.data);
        } catch (err) {
            console.error('Error fetching settings:', err);
        }
    };

    useEffect(() => {
        fetchBlogs();
        fetchSettings();
    }, []);

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

    const updateSettings = async (newSettings: Partial<Settings>) => {
        try {
            const response = await axios.post(`${API_URL}/api/settings`, newSettings);
            setSettings(response.data);
        } catch (err) {
            console.error('Error updating settings:', err);
            throw err;
        }
    };

    return (
        <BlogContext.Provider value={{
            blogs,
            settings,
            loading,
            error,
            fetchBlogs,
            addBlog,
            updateBlog,
            deleteBlog,
            fetchSettings,
            updateSettings
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
