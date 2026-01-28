export interface BlogPost {
    _id?: string;
    id?: number; // for backward compatibility
    title: string;
    description: string;
    content: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    createdAt?: string;
}

export interface Advocate {
    _id: string;
    name: string;
    phone: string;
    court: string;
    photo?: string;
    createdAt?: string;
}

export interface Act {
    _id: string;
    name: string;
    sections: string;
    category: 'Central' | 'State';
    pdfUrl?: string;
    createdAt?: string;
}

export interface Judgment {
    _id: string;
    title: string;
    court: string;
    date: string;
    simpleExplanation: string;
    pdfUrl?: string;
    createdAt?: string;
}

export interface SiteSettings {
    whatsapp: string;
    phone: string;
    email: string;
    address: string;
    socialLinks: {
        instagram: string;
        twitter: string;
        facebook: string;
    };
}
