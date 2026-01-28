export interface BlogPost {
    _id?: string;
    id?: number; // for backward compatibility
    title: string;
    title_hi?: string;
    description: string;
    description_hi?: string;
    content: string;
    content_hi?: string;
    image: string;
    category: string;
    author: string;
    date: string;
    readTime: string;
    createdAt?: string;
}

export interface Advocate {
    _id?: string;
    name: string;
    name_hi?: string;
    phone: string;
    court: string;
    court_hi?: string;
    post: string;
    post_hi?: string;
    image: string;
    photo?: string;
    barCouncilId?: string;
    createdAt?: string;
}

export interface Act {
    _id?: string;
    name: string;
    name_hi?: string;
    sections: string;
    sections_hi?: string;
    category: 'Central' | 'State';
    description?: string;
    description_hi?: string;
    pdfUrl?: string;
    createdAt?: string;
}

export interface Judgment {
    _id?: string;
    title: string;
    title_hi?: string;
    court: string;
    court_hi?: string;
    date: string;
    date_hi?: string;
    simpleExplanation: string;
    simpleExplanation_hi?: string;
    pdfUrl: string;
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
