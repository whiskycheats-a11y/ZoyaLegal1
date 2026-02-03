const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

// MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://babahacket4_db_user:ZoyaLegal123@cluster0.snwxmtr.mongodb.net/zoyaDB?appName=Cluster0";

// MongoDB Connection logic moved to downstream to include seeding

// AI Configuration
const AI_API_KEY = process.env.A4F_API_KEY || process.env.GITHUB_TOKEN;
const AI_ENDPOINT = process.env.A4F_API_KEY
    ? 'https://api.a4f.co/v1/chat/completions'
    : (AI_API_KEY?.startsWith('ghp_')
        ? 'https://models.inference.ai.azure.com/chat/completions'
        : 'https://openrouter.ai/api/v1/chat/completions');

const AI_MODEL = process.env.AI_MODEL || "gpt-4o-mini";

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Cloudinary Configuration
if (process.env.CLOUDINARY_URL) {
    cloudinary.config(true); // Automatically uses CLOUDINARY_URL from env
    console.log('Cloudinary: Using CLOUDINARY_URL configuration');
} else {
    cloudinary.config({
        cloud_name: 'dbcpxmyap',
        api_key: '966966841754795',
        api_secret: '9jTMIAOA5dOXcflnICxwiOCgqT4'
    });
}

// Detailed Diagnostic for Debugging
console.log('--- Cloudinary Diagnostic ---');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'MISSING');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'SET (Ends in ' + process.env.CLOUDINARY_API_KEY.slice(-4) + ')' : 'MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET (Length: ' + process.env.CLOUDINARY_API_SECRET.length + ')' : 'MISSING');
console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL ? 'SET' : 'NOT SET');
console.log('AI_API_KEY:', AI_API_KEY ? `SET (${AI_API_KEY.startsWith('ghp_') ? 'GitHub' : 'OpenRouter'})` : 'MISSING');
console.log('AI_ENDPOINT:', AI_ENDPOINT);
console.log('---------------------------');

const advocateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    name_hi: { type: String },
    phone: { type: String, required: true },
    court: { type: String, required: true },
    post: { type: String, required: true },
    post_hi: { type: String },
    image: { type: String },
    barCouncilId: { type: String },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Advocate = mongoose.model('Advocate', advocateSchema);

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_hi: { type: String },
    description: { type: String, required: true },
    description_hi: { type: String },
    content: { type: String, required: true },
    content_hi: { type: String },
    image: { type: String }, // Cloudinary URL
    category: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    pdfUrl: { type: String }, // PDF document link
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

// Act Schema
const actSchema = new mongoose.Schema({
    name: { type: String, required: true },
    name_hi: { type: String },
    sections: { type: String }, // Can be a summary or specific sections
    sections_hi: { type: String },
    category: { type: String, enum: ['Central', 'State'], default: 'Central' },
    category_hi: { type: String },
    description: { type: String },
    description_hi: { type: String },
    pdfUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Act = mongoose.model('Act', actSchema);

// Judgment Schema
const judgmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    title_hi: { type: String },
    court: { type: String, required: true }, // e.g., Supreme Court, High Court Allahabad
    court_hi: { type: String },
    date: { type: String },
    date_hi: { type: String },
    simpleExplanation: { type: String },
    simpleExplanation_hi: { type: String },
    pdfUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Judgment = mongoose.model('Judgment', judgmentSchema);

// Client Submission Schema
const submissionSchema = new mongoose.Schema({
    clientName: { type: String, required: true },
    description: { type: String },
    files: [{
        url: { type: String, required: true },
        public_id: { type: String, required: true },
        fileName: { type: String },
        fileType: { type: String }
    }],
    createdAt: { type: Date, default: Date.now }
});

const ClientSubmission = mongoose.model('ClientSubmission', submissionSchema);

// Usage Schema to track free tier limits
const usageSchema = new mongoose.Schema({
    ip: { type: String, required: true, unique: true },
    count: { type: Number, default: 0 },
    lastRequestDate: { type: String, required: true }, // Format: YYYY-MM-DD
    updatedAt: { type: Date, default: Date.now }
});

const Usage = mongoose.model('Usage', usageSchema);

// Helper to check and increment usage
const checkRateLimit = async (ip) => {
    const today = new Date().toISOString().split('T')[0];
    const LIMIT = 15;

    let usage = await Usage.findOne({ ip });

    if (!usage) {
        usage = new Usage({ ip, count: 1, lastRequestDate: today });
        await usage.save();
        return { allowed: true, remaining: LIMIT - 1 };
    }

    // Reset if it's a new day
    if (usage.lastRequestDate !== today) {
        usage.count = 1;
        usage.lastRequestDate = today;
        usage.updatedAt = Date.now();
        await usage.save();
        return { allowed: true, remaining: LIMIT - 1 };
    }

    if (usage.count >= LIMIT) {
        return { allowed: false, remaining: 0 };
    }

    usage.count += 1;
    usage.updatedAt = Date.now();
    await usage.save();
    return { allowed: true, remaining: LIMIT - usage.count };
};

// Background repair function to translate missing Hindi content
const repairBlogData_Deprecated = async () => {
    try {
        const blogs = await Blog.find();
        console.log(`[Background Repair] Checking ${blogs.length} blogs for missing Hindi translations...`);

        let repairedCount = 0;
        for (const blog of blogs) {
            let needsUpdate = false;
            const blogData = blog.toObject();

            // Check if any Hindi field is missing
            if (!blogData.title_hi || !blogData.description_hi || !blogData.content_hi) {
                console.log(`[Background Repair] Translating blog: ${blogData.title}`);
                const translatedData = await translateBlogIfMissing(blogData);

                // Update the blog with translated content
                await Blog.findByIdAndUpdate(blog._id, {
                    title_hi: translatedData.title_hi,
                    description_hi: translatedData.description_hi,
                    content_hi: translatedData.content_hi
                });

                repairedCount++;
                needsUpdate = true;
            }
        }

        if (repairedCount > 0) {
            console.log(`[Background Repair] Successfully translated ${repairedCount} blogs to Hindi.`);
        } else {
            console.log(`[Background Repair] All blogs already have Hindi translations.`);
        }
    } catch (err) {
        console.error('[Background Repair] Error:', err.message);
    }
};

// API Endpoints
// --- Blogs ---

// Get all blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
        // Silent background repair for missing translations
        repairBlogData();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Helper to translate blog fields if missing
const translateBlogIfMissing = async (blogData) => {
    const fieldsToTranslate = [
        { key: 'title', hiKey: 'title_hi', type: 'text' },
        { key: 'description', hiKey: 'description_hi', type: 'text' },
        { key: 'content', hiKey: 'content_hi', type: 'html' }
    ];

    // Helper to clean bloated Word HTML which wastes tokens
    const cleanWordHtml = (html) => {
        if (!html) return "";
        return html
            .replace(/style="[^"]*"/gi, "") // Remove inline styles
            .replace(/class="[^"]*"/gi, "") // Remove classes
            .replace(/<span[^>]*>/gi, "") // Remove spans
            .replace(/<\/span>/gi, "")
            .replace(/<o:p>[^<]*<\/o:p>/gi, "") // Remove Word specific tags
            .replace(/&nbsp;/gi, " ")
            .replace(/\s+/g, " "); // Collapse whitespace
    };

    // Helper to chunk text/html for translation
    const chunkTranslate = async (text, type) => {
        if (!text) return "";
        const MAX_CHUNK_SIZE = 5000; // Safe chunk size for 16k context

        if (text.length <= MAX_CHUNK_SIZE) {
            return await performTranslation(text, type);
        }

        console.log(`[AI Chunking] Content too large (${text.length} chars), splitting...`);
        // Simple splitting for now, could be improved to split on tags
        const chunks = [];
        for (let i = 0; i < text.length; i += MAX_CHUNK_SIZE) {
            chunks.push(text.substring(i, i + MAX_CHUNK_SIZE));
        }

        const results = [];
        for (let j = 0; j < chunks.length; j++) {
            console.log(`[AI Chunking] Translating chunk ${j + 1}/${chunks.length}...`);
            const translated = await performTranslation(chunks[j], type);
            results.push(translated);
        }
        return results.join("");
    };

    const performTranslation = async (text, type) => {
        if (!text || text.trim().length === 0) return "";

        try {
            const prompt = type === 'html'
                ? `Translate the following HTML content from English to Hindi. 
                   CRITICAL INSTRUCTIONS:
                   1. Translate strictly based on the provided text. Do NOT hallucinate or add new information.
                   2. Keep all HTML tags, attributes, and structure EXACTLY as they are. 
                   3. ONLY translate the human-readable text inside the tags.
                   4. Maintain the exact legal context. For example, "Right to Education" must be "शिक्षा का अधिकार", NOT "Marriage Law".
                   5. If the text is short, translate it directly without adding flowery context.
                   
                   Content to Translate:\n\n${text}`
                : `Translate the following text from English to Hindi. 
                   CRITICAL INSTRUCTIONS:
                   1. Translate strictly based on the provided text. Do NOT hallucinate or add new information.
                   2. Maintain the exact legal context. For example, "Right to Education" must be "शिक्षा का अधिकार".
                   3. The translation must be professional and accurate.
                   
                   Text to Translate:\n\n${text}`;

            const response = await axios.post(AI_ENDPOINT, {
                model: AI_MODEL,
                messages: [
                    { role: "system", content: "You are a precise Hindi translator for legal documents. You translate exactly what is given, maintaining total fidelity to the source text. You never hallucinate or change the topic." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.3 // Lower temperature for more deterministic output
            }, {
                headers: {
                    'Authorization': `Bearer ${AI_API_KEY}`,
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'ZoyaLegal Auto Translator',
                    'Content-Type': 'application/json',
                }
            });

            if (response.data.choices && response.data.choices[0]) {
                let content = response.data.choices[0].message.content.trim();
                content = content.replace(/^(Here is the translation:|Translation:|हिन्दी अनुवाद:|अनुवाद:)\s*/i, "");
                content = content.replace(/^```(html|text|markdown)?\n/i, "").replace(/\n```$/i, "");
                return content.trim();
            }
        } catch (err) {
            console.error(`AI Translation failed:`, err.message);
            if (err.response) console.error('Error Data:', JSON.stringify(err.response.data));
            return text;
        }
        return text;
    };

    for (const field of fieldsToTranslate) {
        const enValue = blogData[field.key];
        const hiValue = blogData[field.hiKey];

        if (enValue && (!hiValue || hiValue.trim() === "" || hiValue === enValue)) {
            // Clean content if it's HTML to prevent token bloat
            const valueToTranslate = field.type === 'html' ? cleanWordHtml(enValue) : enValue;

            console.log(`[AI Repair] Translating ${field.key} (${valueToTranslate.length} chars)...`);
            blogData[field.hiKey] = await chunkTranslate(valueToTranslate, field.type);
            console.log(`[AI Repair] Finished ${field.key}.`);
        }
    }
    return blogData;
};


// Create new blog with Cloudinary Upload
app.post('/api/blogs', async (req, res) => {
    try {
        let imageUrl = req.body.image;

        // If it's a base64 image, upload to Cloudinary
        if (req.body.image && req.body.image.startsWith('data:image')) {
            const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
                folder: 'zoya_blogs',
            });
            imageUrl = uploadResponse.secure_url;
        }

        // Auto-translate if Hindi fields are empty
        const blogData = await translateBlogIfMissing({ ...req.body, image: imageUrl });

        const blog = new Blog(blogData);
        const newBlog = await blog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update blog
app.put('/api/blogs/:id', async (req, res) => {
    try {
        let imageUrl = req.body.image;

        if (req.body.image && req.body.image.startsWith('data:image')) {
            const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
                folder: 'zoya_blogs',
            });
            imageUrl = uploadResponse.secure_url;
        }

        const blogData = await translateBlogIfMissing({ ...req.body, image: imageUrl });

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            blogData,
            { new: true }
        );
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete blog

// Delete blog with Cloudinary cleanup
app.delete('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Delete image from Cloudinary if it exists
        if (blog.image && blog.image.includes('cloudinary')) {
            try {
                // Extract public_id from URL
                // URL format: .../upload/v1234/zoya_blogs/filename.jpg
                const publicId = blog.image.split('/upload/')[1].split('/')[1] + '/' + blog.image.split('/').pop().split('.')[0];
                // Or simpler: getting everything after 'zoya_blogs/'
                // Better approach for Cloudinary URLs:
                const urlParts = blog.image.split('/');
                const filenameObj = urlParts.pop(); // filename.jpg
                const folderObj = urlParts.pop(); // zoya_blogs
                const publicIdClean = `${folderObj}/${filenameObj.split('.')[0]}`;

                await cloudinary.uploader.destroy(publicIdClean);
                console.log(`Deleted blog image from Cloudinary: ${publicIdClean}`);
            } catch (cloudErr) {
                console.error('Cloudinary delete error:', cloudErr);
            }
        }

        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Repair State Management
let isRepairing = false;
let lastRepairTime = 0;
let hasResetTranslations = false;
const REPAIR_COOLDOWN = 10 * 60 * 1000; // 10 minutes

// Repair Function for missing translations
const repairBlogData = async () => {
    if (isRepairing) return;

    // Throttle: Don't run more than once every 10 minutes unless forced
    const now = Date.now();
    if (now - lastRepairTime < REPAIR_COOLDOWN) return;

    isRepairing = true;
    lastRepairTime = now;

    try {
        // ONE-TIME FORCE RESET: Clear all Hindi translations to fix bad data
        if (!hasResetTranslations) {
            console.log('[Background Repair] FORCING RESET of all Hindi translations to fix errors...');
            await Blog.updateMany({}, {
                $unset: { title_hi: 1, description_hi: 1, content_hi: 1 }
            });
            console.log('[Background Repair] All Hindi translations cleared. Will re-translate now.');
            hasResetTranslations = true;
        }

        const blogsToRepair = await Blog.find({
            $or: [
                { title_hi: { $exists: false } },
                { title_hi: "" },
                { description_hi: { $exists: false } },
                { description_hi: "" },
                { content_hi: { $exists: false } },
                { content_hi: "" },
                // Special check for content that might be stuck in English
                { $expr: { $eq: ["$content", "$content_hi"] } }
            ]
        }).limit(50); // Larger limit for repair

        if (blogsToRepair.length > 0) {
            console.log(`[Backgroud] Found ${blogsToRepair.length} blogs needing AI translation repair...`);
            for (let blog of blogsToRepair) {
                console.log(`[Backgroud] Repairing: ${blog.title}`);
                const repairedData = await translateBlogIfMissing(blog.toObject());
                await Blog.findByIdAndUpdate(blog._id, repairedData);
            }
            console.log("[Backgroud] Blog Repair completed.");
        }
    } catch (err) {
        console.error("[Backgroud] Repair error:", err);
    } finally {
        isRepairing = false;
    }
};

const repairActLinks = async () => {
    try {
        const brokenActs = await Act.find({ pdfUrl: { $regex: 'lscontent\\.nic\\.in' } });
        if (brokenActs.length > 0) {
            console.log(`[Background] Repairing ${brokenActs.length} broken Act PDF links...`);
            for (let act of brokenActs) {
                let newUrl = act.pdfUrl;
                if (act.pdfUrl.includes('A2023-45.pdf')) newUrl = "https://prsindia.org/files/bills_acts/acts_parliament/2023/The%20Bharatiya%20Nyaya%20Sanhita,%202023.pdf";
                if (act.pdfUrl.includes('A2023-46.pdf')) newUrl = "https://prsindia.org/files/bills_acts/acts_parliament/2023/The%20Bharatiya%20Nagarik%20Suraksha%20Sanhita,%202023.pdf";
                if (act.pdfUrl.includes('A2023-47.pdf')) newUrl = "https://prsindia.org/files/bills_acts/acts_parliament/2023/The%20Bharatiya%20Sakshya%20Adhiniyam,%202023.pdf";

                // Fix Constitution if it also uses the broken domain (common source for these files)
                if (act.name.includes('Constitution')) newUrl = "https://www.indiacode.nic.in/bitstream/123456789/15240/1/constitution_of_india.pdf";

                // General fallback for any other broken links on that domain
                if (newUrl === act.pdfUrl) {
                    newUrl = `https://www.indiacode.nic.in/simple-search?query=${encodeURIComponent(act.name)}`;
                }

                if (newUrl !== act.pdfUrl) {
                    await Act.findByIdAndUpdate(act._id, { pdfUrl: newUrl });
                    console.log(`[Background] Fixed link for: ${act.name}`);
                }
            }
        }

        // Repair Judgment links
        const brokenJudgments = await Judgment.find({ pdfUrl: "#" });
        if (brokenJudgments.length > 0) {
            console.log(`[Background] Checking ${brokenJudgments.length} Judgment placeholder links...`);
            for (let j of brokenJudgments) {
                let newUrl = j.pdfUrl;
                if (j.title.includes('Kesavananda Bharati')) newUrl = "https://www.scobserver.in/wp-content/uploads/2021/10/Kesavananda-Bharati-Judgment.pdf";
                else if (j.title.includes('Maneka Gandhi')) newUrl = "https://www.scobserver.in/wp-content/uploads/2021/10/Maneka-Gandhi-v.-Union-of-India.pdf";
                else {
                    // General fallback to Indian Kanoon search for any other placeholder judgments
                    newUrl = `https://indiankanoon.org/search/?formInput=${encodeURIComponent(j.title)} judgment`;
                }

                if (newUrl !== j.pdfUrl) {
                    await Judgment.findByIdAndUpdate(j._id, { pdfUrl: newUrl });
                    console.log(`[Background] Repaired link for: ${j.title}`);
                }
            }
        }
    } catch (err) {
        console.error("[Background] Link repair error:", err);
    }
};

// Settings Schema
const settingsSchema = new mongoose.Schema({
    whatsapp: { type: String, default: "919454950104" },
    phone: { type: String, default: "+91 94549 50104" },
    email: { type: String, default: "info@zoyalegal.com" },
    address: { type: String, default: "Husain Ganj, Lucknow, UP" },
    socialLinks: {
        instagram: { type: String, default: "" },
        twitter: { type: String, default: "" },
        facebook: { type: String, default: "" }
    }
});

const Settings = mongoose.model('Settings', settingsSchema);

// Initial Blog Data for Seeding
const INITIAL_BLOGS = [
    {
        title: "Modern Legal Strategy for 2024",
        title_hi: "2024 के लिए आधुनिक कानूनी रणनीति",
        description: "Navigating the complex landscape of digital law and enterprise security in the modern age.",
        description_hi: "आधुनिक युग में डिजिटल कानून और उद्यम सुरक्षा के जटिल परिदृश्य का प्रबंधन।",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
        category: "Legal Insights",
        author: "Zoya Legal Team",
        date: "Jan 25, 2024",
        readTime: "5 min read",
        content: `<h2>The Foundation of a Global Business</h2><p>Starting a business in 2024 requires more than just a great idea. It requires a robust legal foundation that can withstand the complexities of international trade and digital compliance.</p><h3>1. Structural Compliance</h3><p>Whether you choose a LLP, Pvt Ltd, or OPC, the structural compliance remains the backbone. Understanding the pros and cons of each is crucial for long-term scalability and tax efficiency.</p><blockquote>"Complexity is the enemy of execution. Keep your legal structures clean and transparent from day one."</blockquote><h3>2. Intellectual Property Protection</h3><p>Your brand name, logo, and unique software are your biggest assets. Trademarking and patenting should not be an afterthought. In the digital age, IP theft is rampant, and legal recourse is only possible with proper registration.</p><h3>3. Contractual Clarity</h3><p>Agreement with vendors, employees, and clients must be water-tight. Ambiguity leads to litigation. Ensure your SLAs (Service Level Agreements) are precise about deliverables, timelines, and dispute resolution.</p>`,
        content_hi: `<h2>ग्लोबल बिजनेस की नींव</h2><p>2024 में व्यवसाय शुरू करने के लिए सिर्फ एक अच्छे विचार से अधिक की आवश्यकता होती है। इसके लिए एक मजबूत कानूनी आधार की आवश्यकता होती है जो अंतरराष्ट्रीय व्यापार और डिजिटल अनुपालन की जटिलताओं का सामना कर सके।</p><h3>1. संरचनात्मक अनुपालन</h3><p>चाहे आप LLP, Pvt Ltd, या OPC चुनें, संरचनात्मक अनुपालन रीढ़ की हड्डी बना रहता है। प्रत्येक के पक्ष और विपक्ष को समझना दीर्घकालिक मापनीयता और कर दक्षता के लिए महत्वपूर्ण है।</p><blockquote>"जटिलता निष्पादन की दुश्मन है। अपने कानूनी ढांचे को पहले दिन से साफ और पारदर्शी रखें।"</blockquote><h3>2. बौद्धिक संपदा संरक्षण</h3><p>आपका ब्रांड नाम, लोगो और अद्वितीय सॉफ्टवेयर आपकी सबसे बड़ी संपत्ति हैं। ट्रेडमार्क और पेटेंट को बाद का विचार नहीं होना चाहिए। डिजिटल युग में, आईपी चोरी बड़े पैमाने पर है, और कानूनी सहारा केवल उचित पंजीकरण के साथ ही संभव है।</p><h3>3. संविदात्मक स्पष्टता</h3><p>विक्रेताओं, कर्मचारियों और ग्राहकों के साथ समझौता पुख्ता होना चाहिए। अस्पष्टता मुकदमों की ओर ले जाती है। सुनिश्चित करें कि आपके SLA (सेवा स्तर समझौते) वितरण योग्य वस्तुओं, समयसीमा और विवाद समाधान के बारे में सटीक हैं।</p>`
    },
    {
        title: "The Future of Digital Security & Privacy",
        title_hi: "डिजिटल सुरक्षा और गोपनीयता का भविष्य",
        description: "How evolving technology is changing the landscape of online data protection and compliance.",
        description_hi: "विकसित होती तकनीक कैसे ऑनलाइन डेटा सुरक्षा और अनुपालन के परिदृश्य को बदल रही है।",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        category: "Digital Privacy",
        author: "Tech Support Unit",
        date: "Jan 22, 2024",
        readTime: "7 min read",
        content: `<h2>The Age of Zero Trust Architecture</h2><p>Data is the new oil, but it's also a major liability if not handled correctly. As we move deeper into 2024, the concept of "trust" is being replaced by continuous verification.</p><h3>Data Sovereignty and Compliance</h3><p>With regulations like GDPR and India's DPDP Act, businesses must know where their data resides. Non-compliance is no longer just a fine; it's a death sentence for brand reputation.</p>`,
        content_hi: `<h2>जीरो ट्रस्ट आर्किटेक्चर का युग</h2><p>डेटा नया तेल है, लेकिन अगर इसे सही तरीके से संभाला नहीं गया तो यह एक बड़ी जिम्मेदारी भी है। जैसे-जैसे हम 2024 में गहराई से आगे बढ़ रहे हैं, "विश्वास" की अवधारणा को निरंतर सत्यापन द्वारा प्रतिस्थापित किया जा रहा है।</p><h3>डेटा संप्रभुता और अनुपालन</h3><p>GDPR और भारत के DPDP अधिनियम जैसे नियमों के साथ, व्यवसायों को पता होना चाहिए कि उनका डेटा कहाँ स्थित है। गैर-अनुपालन अब केवल जुर्माना नहीं है; यह ब्रांड की प्रतिष्ठा के लिए मृत्युदंड है।</p>`
    },
    {
        title: "Scaling Your Business with CSC Automation",
        title_hi: "CSC ऑटोमेशन के साथ अपने व्यवसाय को बढ़ाना",
        description: "How digital services are revolutionizing documentation and compliance for small businesses.",
        description_hi: "डिजिटल सेवाएं छोटे व्यवसायों के लिए दस्तावेज़ीकरण और अनुपालन में कैसे क्रांति ला रही हैं।",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
        category: "Business Support",
        author: "Corporate Desk",
        date: "Jan 20, 2024",
        readTime: "4 min read",
        content: `<h2>The Digital Transformation of Paperwork</h2><p>Efficiency in business is often hindered by legacy documentation processes. At ZoyaLegal, we combine human expertise with AI-driven tools to automate the mundane.</p>`,
        content_hi: `<h2>कागजी कार्रवाई का डिजिटल परिवर्तन</h2><p>व्यापार में दक्षता अक्सर पुरानी दस्तावेज़ीकरण प्रक्रियाओं द्वारा बाधित होती है। ZoyaLegal में, हम सांसारिक कार्यों को स्वचालित करने के लिए AI-संचालित उपकरणों के साथ मानवीय विशेषज्ञता को जोड़ते हैं।</p>`
    },
    {
        title: "Startup Innovation: Beyond the Legal Basics",
        title_hi: "स्टार्टअप इनोवेशन: कानूनी बुनियादी बातों से परे",
        description: "Finding the right balance between legal compliance and creative growth strategies.",
        description_hi: "कानूनी अनुपालन और रचनात्मक विकास रणनीतियों के बीच सही संतुलन बनाना।",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
        category: "Innovation",
        author: "Zoya Legal Team",
        date: "Jan 18, 2024",
        readTime: "6 min read",
        content: `<h2>Innovation Under Regulation</h2><p>Many founders fear that legal compliance will stifle their growth. However, the most successful startups use compliance as a competitive advantage.</p><h3>Regulatory Sandboxes</h3><p>Participating in regulatory sandboxes allows startups to test innovative products in a controlled environment, gaining trust from both regulators and investors early on.</p><h3>Agile Legal Strategies</h3><p>Your legal strategy should evolve as fast as your product. Regular "legal health checks" can identify potential risks before they become roadblocks to your next funding round.</p>`,
        content_hi: `<h2>नियमन के तहत नवाचार</h2><p>कई संस्थापकों को डर है कि कानूनी अनुपालन उनके विकास को रोक देगा। हालांकि, सबसे सफल स्टार्टअप प्रतिस्पर्धी लाभ के रूप में अनुपालन का उपयोग करते हैं।</p><h3>नियामक सैंडबॉक्स</h3><p>नियामक सैंडबॉक्स में भाग लेने से स्टार्टअप नियंत्रित वातावरण में नवीन उत्पादों का परीक्षण कर सकते हैं, जिससे नियामकों और निवेशकों दोनों का विश्वास जल्दी प्राप्त होता है।</p><h3>चपल कानूनी रणनीतियां</h3><p>आपकी कानूनी रणनीति आपके उत्पाद जितनी तेजी से विकसित होनी चाहिए। नियमित "कानूनी स्वास्थ्य जांच" आपके अगले फंडिंग दौर के लिए बाधा बनने से पहले संभावित जोखिमों की पहचान कर सकती है।</p>`
    }
];

// Seeding Function
const seedDB = async () => {
    try {
        const blogCount = await Blog.countDocuments();
        if (blogCount === 0) {
            console.log('Seeding initial blogs...');
            await Blog.insertMany(INITIAL_BLOGS);
        } else {
            // Update existing blogs with Hindi content if missing
            console.log('Checking for missing Hindi translations in existing blogs...');
            for (const initialBlog of INITIAL_BLOGS) {
                await Blog.updateOne(
                    { title: initialBlog.title },
                    {
                        $set: {
                            title_hi: initialBlog.title_hi,
                            description_hi: initialBlog.description_hi,
                            content_hi: initialBlog.content_hi
                        }
                    }
                );
            }
            console.log('Seed translations verified/updated.');
        }

        const settingsCount = await Settings.countDocuments();
        if (settingsCount === 0) {
            console.log('Seeding default settings...');
            await new Settings({}).save();
        }

        // Repair any blogs missing Hindi translations
        await repairBlogData();
        // Repair broken act links
        await repairActLinks();
    } catch (err) {
        console.error('Seed error:', err);
    }
};

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        seedDB();
    })
    .catch(err => console.error('Could not connect to MongoDB', err));

// API Endpoints
// --- Settings ---
app.get('/api/settings', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (!settings) {
            settings = await new Settings({}).save();
        }
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/settings', async (req, res) => {
    try {
        let settings = await Settings.findOne();
        if (settings) {
            Object.assign(settings, req.body);
            await settings.save();
        } else {
            settings = new Settings(req.body);
            await settings.save();
        }
        res.json(settings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- Blogs ---
// Register new advocate with Cloudinary Upload
app.post('/api/advocates', async (req, res) => {
    console.log('--- Advocate Registration Start ---');
    console.log('Body keys:', Object.keys(req.body));
    try {
        let photoUrl = '';

        if (req.body.photo && req.body.photo.startsWith('data:image')) {
            console.log('Uploading photo to Cloudinary...');
            const uploadResponse = await cloudinary.uploader.upload(req.body.photo, {
                folder: 'zoya_advocates',
            });
            photoUrl = uploadResponse.secure_url;
            console.log('Upload success:', photoUrl);
        }

        const advocate = new Advocate({
            name: req.body.name,
            phone: req.body.phone,
            court: req.body.court,
            post: req.body.post || 'Advocate',
            barCouncilId: req.body.barCouncilId,
            photo: photoUrl
        });

        const newAdvocate = await advocate.save();
        console.log('Advocate saved to DB:', newAdvocate._id);
        res.status(201).json(newAdvocate);
    } catch (err) {
        console.error('SERVER REGISTRATION ERROR:', err.message);
        res.status(400).json({
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
});

// AI Chat Endpoint
app.post('/api/chat', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(`--- AI Chat Request Received from ${ip} ---`);

    try {
        const rateLimitStatus = await checkRateLimit(ip);

        if (!rateLimitStatus.allowed) {
            console.log(`Rate limit reached for IP: ${ip}`);
            return res.status(429).json({
                message: "You have reached your daily limit of 15 free questions. 🛑\n\nUpgrade your plan for unlimited access, premium legal insights, and priority support! 🚀",
                status: "limit_reached"
            });
        }

        const { messages } = req.body;

        const response = await axios.post(AI_ENDPOINT, {
            model: AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are Zoya AI, the premium legal assistant for ZoyaLegal. 🏢\n\n**Owner Information:** The owner and lead professional of ZoyaLegal is **Adv. Irfan Khan**. \n\n**Your Role:** \n- Help users with Indian Legal Services, CSC (Common Service Center) queries, Business Registrations (GST, ITR), and connecting with Verified Advocates. ⚖️\n- Your tone must be highly professional, helpful, and empathetic, exactly like ChatGPT. 🌟\n- Use suitable emojis and clear markdown formatting (bolding, lists) to make the conversation engaging and professional. ✅\n- When asked about the owner or team, proudly mention **Adv. Irfan Khan**. 👨‍💼\n- **Important:** Provide informative guidance but avoid giving final legal advice; always suggest consulting with our experts for complex matters. 🤝"
                },
                ...messages
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${AI_API_KEY}`,
                'HTTP-Referer': 'http://localhost:5173',
                'X-Title': 'ZoyaLegal AI Assistant',
                'Content-Type': 'application/json',
            }
        });

        if (response.data.choices && response.data.choices[0]) {
            const aiMessage = response.data.choices[0].message;
            res.json(aiMessage);
        } else {
            throw new Error('Unexpected AI response format');
        }
    } catch (err) {
        console.error('--- AI Chat Error ---', err.message);
        if (err.response?.data) console.error('Error Data:', JSON.stringify(err.response.data));

        res.status(500).json({ message: 'AI failed to respond. Please try again later.' });
    }
});

// AI Translate Endpoint
app.post('/api/translate', async (req, res) => {
    const { text, type } = req.body; // type: 'text' or 'html'

    if (!text) return res.status(400).json({ message: 'Text is required' });

    try {
        const prompt = type === 'html'
            ? `Translate the following HTML content from English to Hindi. Keep all HTML tags, classes, and structure EXACTLY as they are. Only translate the human-readable text inside the tags:\n\n${text}`
            : `Translate the following text from English to Hindi:\n\n${text}`;

        const response = await axios.post(AI_ENDPOINT, {
            model: AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are a professional translator specialized in English to Hindi legal and technical translations. Preserve the tone and formatting of the original source."
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${AI_API_KEY}`,
                'HTTP-Referer': 'http://localhost:5173',
                'X-Title': 'ZoyaLegal AI Translator',
                'Content-Type': 'application/json',
            }
        });

        const translatedText = response.data.choices[0].message.content.trim();
        // Force cleanup of AI noise if any
        const cleanedTranslation = translatedText
            .replace(/^(Here is the translation:|Translation:|हिन्दी अनुवाद:|अनुवाद:)\s*/i, "")
            .replace(/^```(html|text|markdown)?\n/i, "").replace(/\n```$/i, "")
            .trim();
        res.json({ translation: cleanedTranslation });
    } catch (err) {
        console.error('Translation error:', err.message);
        res.status(500).json({ message: 'Translation failed' });
    }
});

// Get all advocates
app.get('/api/advocates', async (req, res) => {
    try {
        const advocates = await Advocate.find().sort({ createdAt: -1 });
        res.json(advocates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete an advocate
app.delete('/api/advocates/:id', async (req, res) => {
    try {
        await Advocate.findByIdAndDelete(req.params.id);
        res.json({ message: 'Advocate deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Acts ---
app.get('/api/acts', async (req, res) => {
    try {
        const acts = await Act.find().sort({ createdAt: -1 });
        res.json(acts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/acts', async (req, res) => {
    try {
        const act = new Act(req.body);
        const newAct = await act.save();
        res.status(201).json(newAct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/acts/:id', async (req, res) => {
    try {
        const updatedAct = await Act.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedAct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/acts/:id', async (req, res) => {
    try {
        await Act.findByIdAndDelete(req.params.id);
        res.json({ message: 'Act deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Judgments ---
app.get('/api/judgments', async (req, res) => {
    try {
        const judgments = await Judgment.find().sort({ createdAt: -1 });
        res.json(judgments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/judgments', async (req, res) => {
    try {
        const judgment = new Judgment(req.body);
        const newJudgment = await judgment.save();
        res.status(201).json(newJudgment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/judgments/:id', async (req, res) => {
    try {
        const updatedJudgment = await Judgment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedJudgment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/judgments/:id', async (req, res) => {
    try {
        await Judgment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Judgment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Client Submissions ---

// Proxy endpoint for downloading files with correct extensions
app.get('/api/download/:submissionId/:fileIndex', async (req, res) => {
    try {
        const { submissionId, fileIndex } = req.params;
        const submission = await ClientSubmission.findById(submissionId);

        if (!submission || !submission.files[fileIndex]) {
            return res.status(404).json({ message: 'File not found' });
        }

        const file = submission.files[fileIndex];
        const axios = require('axios');

        // Fetch the file from Cloudinary
        const response = await axios.get(file.url, { responseType: 'arraybuffer' });

        // Set proper headers for download
        res.setHeader('Content-Disposition', `attachment; filename="${file.fileName}"`);
        res.setHeader('Content-Type', file.fileType || 'application/octet-stream');
        res.send(Buffer.from(response.data));
    } catch (err) {
        console.error('Download error:', err);
        res.status(500).json({ message: 'Download failed' });
    }
});

// Submit new files
app.post('/api/submissions', async (req, res) => {
    const { clientName, description, files } = req.body;
    console.log(`--- New Submission from ${clientName} (${files?.length || 0} files) ---`);
    try {
        if (!files || files.length === 0) {
            console.log('Error: No files provided');
            return res.status(400).json({ message: 'No files provided' });
        }

        const uploadedFiles = [];

        for (const file of files) {
            // Upload each file to Cloudinary
            // Note: Cloudinary auto-detects resource_type or we can specify 'auto'
            const uploadResponse = await cloudinary.uploader.upload(file.data, {
                folder: 'zoya_submissions',
                resource_type: 'auto',
                public_id: file.fileName, // Cloudinary appends its own random suffix if unique_filename is true, 
                // but we'll use our own to avoid conflict and keep it clean
                public_id: file.fileName.split('.')[0] + '_' + Date.now() + (file.fileName.includes('.') ? '.' + file.fileName.split('.').pop() : ''),
                use_filename: true,
                unique_filename: false
            });

            uploadedFiles.push({
                url: uploadResponse.secure_url,
                public_id: uploadResponse.public_id,
                fileName: file.fileName,
                fileType: file.fileType
            });
        }

        const submission = new ClientSubmission({
            clientName,
            description,
            files: uploadedFiles
        });

        const newSubmission = await submission.save();
        res.status(201).json(newSubmission);
    } catch (err) {
        console.error('Submission error:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get all submissions for admin
app.get('/api/submissions', async (req, res) => {
    try {
        const submissions = await ClientSubmission.find().sort({ createdAt: -1 });
        res.json(submissions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete submission (and its files from Cloudinary)
app.delete('/api/submissions/:id', async (req, res) => {
    try {
        const submission = await ClientSubmission.findById(req.params.id);
        if (submission) {
            // Delete files from Cloudinary first
            for (const file of submission.files) {
                try {
                    // Determine resource_type based on fileType
                    let resourceType = 'raw'; // Default for documents, executables, etc.

                    if (file.fileType) {
                        if (file.fileType.startsWith('image/')) {
                            resourceType = 'image';
                        } else if (file.fileType.startsWith('video/')) {
                            resourceType = 'video';
                        }
                    }

                    console.log(`Deleting file from Cloudinary: ${file.public_id} (type: ${resourceType})`);
                    await cloudinary.uploader.destroy(file.public_id, { resource_type: resourceType });
                } catch (deleteErr) {
                    console.error(`Failed to delete file ${file.public_id}:`, deleteErr.message);
                    // Continue with other files even if one fails
                }
            }
            await ClientSubmission.findByIdAndDelete(req.params.id);
            res.json({ message: 'Submission deleted' });
        } else {
            res.status(404).json({ message: 'Submission not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Duplicate removed

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
