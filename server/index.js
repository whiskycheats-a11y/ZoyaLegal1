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

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, '../dist')));

// MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://babahacket4_db_user:ZoyaLegal123@cluster0.snwxmtr.mongodb.net/zoyaDB?appName=Cluster0";

// MongoDB Connection logic moved to downstream to include seeding

// AI Configuration
const AI_API_KEY = (process.env.GITHUB_TOKEN || process.env.A4F_API_KEY || "").trim();
const AI_ENDPOINT = process.env.A4F_API_KEY
    ? 'https://api.a4f.co/v1/chat/completions'
    : (AI_API_KEY?.startsWith('ghp_')
        ? 'https://models.inference.ai.azure.com/chat/completions'
        : 'https://openrouter.ai/api/v1/chat/completions');

const AI_MODEL = process.env.AI_MODEL || (AI_API_KEY?.startsWith('ghp_') ? "gpt-4o" : "google/gemini-2.0-flash-lite-preview-02-05:free");

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// 9. Upload Signature (to Cloudinary) - MOVED TO TOP FOR PRIORITY
app.post('/api/orders/:id/signature', async (req, res) => {
    try {
        const { signatureData } = req.body; // Base64 image
        console.log(`[SIGNATURE-ROUTE-MATCH] POST /api/orders/${req.params.id}/signature`);

        if (!signatureData) {
            console.error("[SIGNATURE-ROUTE-ERROR] No data received");
            return res.status(400).json({ message: 'Signature data is required' });
        }

        console.log(`[SIGNATURE-ROUTE-LOG] Attempting Cloudinary upload...`);
        let uploadResponse;
        try {
            uploadResponse = await cloudinary.uploader.upload(signatureData, {
                folder: 'zoyalegal/signatures'
            });
        } catch (cloudErr) {
            console.error("[SIGNATURE-ROUTE-CLOUDINARY-FAIL]", cloudErr);
            if (cloudErr.message.includes('Invalid Signature') || cloudErr.http_code === 401) {
                return res.status(500).json({
                    message: "Cloudinary Authentication Failed. Please check API_KEY and API_SECRET in .env file."
                });
            }
            throw cloudErr;
        }
        console.log(`[SIGNATURE-ROUTE-LOG] Cloudinary success: ${uploadResponse.secure_url}`);

        const order = await Order.findById(req.params.id);
        if (!order) {
            console.error("[SIGNATURE-ROUTE-ERROR] Order not found:", req.params.id);
            return res.status(404).json({ message: 'Order not found' });
        }

        order.documents.uploadedSignature = uploadResponse.secure_url;
        order.status = 'ESIGN_COMPLETED';
        await order.save();
        console.log(`[SIGNATURE-ROUTE-MATCH] Database updated for order: ${req.params.id}`);

        res.json({ message: 'Signature uploaded successfully', url: uploadResponse.secure_url });
    } catch (err) {
        console.error("[SIGNATURE-ROUTE-CRITICAL] Error:", err);
        res.status(500).json({ message: err.message });
    }
});

// Cloudinary Configuration
if (process.env.CLOUDINARY_URL) {
    cloudinary.config(true);
    console.log('Cloudinary: Using CLOUDINARY_URL configuration');
} else if (process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_API_KEY) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    console.log('Cloudinary: Using environment variable configuration');
} else {
    cloudinary.config({
        cloud_name: 'dbcpxmyap',
        api_key: '966966841754795',
        api_secret: '9jTMIAOA5dOXcflnICxwiOCgqT4'
    });
    console.log('Cloudinary: Using hardcoded fallback configuration');
}


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

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    content: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    mobile: { type: String },
    email: { type: String },
    rating: { type: Number, default: 5 },
    createdAt: { type: Date, default: Date.now }
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);



// Order Schema
const orderSchema = new mongoose.Schema({
    userId: { type: String }, // Optional, can be IP or session if no auth
    userData: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        mobile: { type: String, required: true },
        state: { type: String, required: true },
        city: { type: String, required: true }
    },
    serviceType: { type: String, required: true }, // e.g., 'Affidavit', 'Rent Agreement'
    formData: { type: Object }, // Dynamic fields for the specific document
    status: {
        type: String,
        enum: [
            'INITIATED',
            'FORM_SUBMITTED',
            'DRAFT_GENERATED',
            'PAYMENT_SUCCESS',
            'PROCESSING',
            'ESIGN_PENDING',
            'ESIGN_COMPLETED',
            'NOTARY_ASSIGNED',
            'NOTARY_APPROVED',
            'IN_COURIER',
            'COMPLETED'
        ],
        default: 'INITIATED'
    },
    documents: {
        draftPdf: { type: String },
        uploadedSignature: { type: String }, // New field for user signature photo
        signedPdf: { type: String },
        finalPdf: { type: String }
    },
    payment: {
        transactionId: { type: String },
        amount: { type: Number },
        status: { type: String, default: 'PENDING' }
    },
    esign: {
        transactionId: { type: String },
        status: { type: String, default: 'PENDING' },
        timestamp: { type: Date }
    },
    notary: {
        notaryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Advocate' },
        status: { type: String, default: 'UNASSIGNED' },
        assignmentDate: { type: Date },
        notarizedDate: { type: Date }
    },
    createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// ESign Log Schema
const esignLogSchema = new mongoose.Schema({
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    transactionId: { type: String },
    status: { type: String },
    details: { type: Object },
    timestamp: { type: Date, default: Date.now }
});

const ESignLog = mongoose.model('ESignLog', esignLogSchema);

// Helper to check and increment usage
const checkRateLimit = async (ip) => {
    const today = new Date().toISOString().split('T')[0];
    const LIMIT = 4;

    let usage = await Usage.findOne({ ip });

    console.log(`[RateLimit Check] IP: ${ip}, Today: ${today}, Existing Count: ${usage ? usage.count : 'None'}`);

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
        console.log(`[RateLimit Blocked] IP: ${ip}, Count: ${usage.count}`);
        return { allowed: false, remaining: 0 };
    }

    usage.count += 1;
    usage.updatedAt = Date.now();
    await usage.save();
    console.log(`[RateLimit Approved] New Count for ${ip}: ${usage.count}`);
    return { allowed: true, remaining: LIMIT - usage.count };
};

// API Endpoints
// --- Blogs ---

// Get all blogs
app.get('/api/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


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

        const blog = new Blog({ ...req.body, image: imageUrl });
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

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { ...req.body, image: imageUrl },
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

const INITIAL_TESTIMONIALS = [
    {
        name: "Rahul Sharma",
        location: "Lucknow, UP",
        content: "Advocate Irfan and his team helped me resolve my property dispute in record time. Highly professional and trustworthy!",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Priya Verma",
        location: "New Delhi",
        content: "The digital consultancy for my startup was flawless. They handled GST and ITR without any hassle. ZoyaLegal is a game-changer.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
    },
    {
        name: "Capt. Sameer Khan",
        location: "Dubai (Ex-Pat)",
        content: "I needed urgent legal documentation for my family in Lucknow. ZoyaLegal's team handled everything while I was abroad. Remarkable speed.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop"
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
            console.log('Database already seeded.');
        }

        const testimonialCount = await Testimonial.countDocuments();
        if (testimonialCount === 0) {
            console.log('Seeding initial testimonials...');
            await Testimonial.insertMany(INITIAL_TESTIMONIALS);
        }

        const settingsCount = await Settings.countDocuments();
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
        const isAdmin = req.headers['x-zoya-admin'] === 'true';

        if (!isAdmin) {
            const rateLimitStatus = await checkRateLimit(ip);

            if (!rateLimitStatus.allowed) {
                console.log(`Rate limit reached for IP: ${ip}`);
                return res.status(429).json({
                    message: "You have reached your free question limit (4 queries). 🛑\n\nUpgrade your session for ₹350 to get unlimited legal insights and priority support! 🚀",
                    status: "limit_reached"
                });
            }
        } else {
            console.log(`[Admin Bypass] Unlimited access granted for IP: ${ip}`);
        }

        const { messages } = req.body;

        // Use a more compatible model for GitHub Tokens
        const modelToUse = AI_API_KEY?.startsWith('ghp_') ? 'gpt-4o-mini' : AI_MODEL;

        const headers = {
            'Authorization': `Bearer ${AI_API_KEY}`,
            'Content-Type': 'application/json',
        };

        // Only add extra headers for OpenRouter (non-GitHub)
        if (!AI_API_KEY?.startsWith('ghp_')) {
            headers['HTTP-Referer'] = 'https://zoyalaw.com';
            headers['X-Title'] = 'ZoyaLegal AI Assistant';
        }

        const response = await axios.post(AI_ENDPOINT, {
            model: modelToUse,
            messages: [
                {
                    role: "system",
                    content: `Role: Tum ek smart Web Assistant ho jo Zoya Legal ki website par aane waale clients ko guide karti ho.

🗣️ Persona & Tone:
- Tumhara naam **Zoya** hai.
- Tum ek professional lekin behadh empathetic assistant ho.
- Responses short, direct aur asar-daar rakhein. (Keep it concise).

📝 Response Guidelines:
1. **Empathy First:** Client ko support dein.
2. **Advocate Irfan Connection:** Direct help ke liye Advocate Irfan ka number dein: **9454950104**.
3. **Closing:** Polite closing rakhein.

⚠️ Important: Respond in **Hinglish** (Hindi in English script).`
                },
                ...messages
            ]
        }, { headers });

        if (response.data.choices && response.data.choices[0]) {
            const aiMessage = response.data.choices[0].message;
            res.json(aiMessage);
        } else {
            console.error('AI Response missing choices:', JSON.stringify(response.data));
            throw new Error('Unexpected AI response format');
        }
    } catch (err) {
        console.error('--- AI Chat Error ---');
        console.error('Message:', err.message);
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data));
            console.error('Headers:', JSON.stringify(err.response.headers));
        }

        // Fallback response - promoting direct contact if AI is down
        res.json({
            role: "assistant",
            content: "I'm currently undergoing a quick update to serve you better! 🚀\n\nFor immediate assistance, please contact our lead **Adv. Irfan Khan** at **+91 94549 50104** or visit our **ZoyaLegal** office in Lucknow. We guarantee a resolution within 24 hours! 📞⚖️"
        });
    }
});

// Unlock Chat Endpoint (Post-Payment)
app.post('/api/chat/unlock', async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    try {
        const usage = await Usage.findOne({ ip });
        if (usage) {
            usage.count = 0;
            usage.updatedAt = Date.now();
            await usage.save();
            res.json({ success: true, message: "Chat unlocked!" });
        } else {
            res.status(404).json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

// Diagnostic AI Test Endpoint
app.get('/api/ai-test', async (req, res) => {
    try {
        const response = await axios.post(AI_ENDPOINT, {
            model: AI_MODEL,
            messages: [{ role: "user", content: "Hi" }]
        }, {
            headers: {
                'Authorization': `Bearer ${AI_API_KEY}`,
                'Content-Type': 'application/json',
            }
        });
        res.json({ status: 'success', data: response.data });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: err.message,
            details: err.response?.data || 'No response data',
            endpoint: AI_ENDPOINT,
            key_preview: AI_API_KEY ? `${AI_API_KEY.slice(0, 10)}...` : 'MISSING',
            model: AI_MODEL
        });
    }
});

// Translation Endpoint
app.post('/api/translate', async (req, res) => {
    const { text, type = 'text' } = req.body;
    if (!text) return res.status(400).json({ message: "No text provided" });

    try {
        const prompt = type === 'html'
            ? `Translate the following HTML content to Hindi, preserving all HTML tags and attributes. Only translate the text content inside the tags. Return ONLY the translated HTML:\n\n${text}`
            : `Translate the following text to Hindi. Return ONLY the translated text:\n\n${text}`;

        const response = await axios.post(AI_ENDPOINT, {
            model: AI_MODEL,
            messages: [
                { role: "system", content: "You are a professional legal translator specialized in English to Hindi translation." },
                { role: "user", content: prompt }
            ],
            temperature: 0.3
        }, {
            headers: {
                'Authorization': `Bearer ${AI_API_KEY}`,
                'HTTP-Referer': 'https://zoyalaw.com',
                'X-Title': 'ZoyaLegal Translator',
                'Content-Type': 'application/json',
            }
        });

        const translation = response.data.choices[0].message.content.trim();
        res.json({ translation });
    } catch (err) {
        console.error('Translation error:', err.message);
        res.status(500).json({ message: "Translation failed", details: err.message });
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

// --- Testimonials ---

// Get all testimonials
app.get('/api/testimonials', async (req, res) => {
    try {
        const testimonials = await Testimonial.find().sort({ createdAt: -1 });
        res.json(testimonials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create testimonial with image upload
app.post('/api/testimonials', async (req, res) => {
    try {
        let imageUrl = req.body.image;

        if (req.body.image && req.body.image.startsWith('data:image')) {
            const uploadResponse = await cloudinary.uploader.upload(req.body.image, {
                folder: 'zoya_testimonials',
            });
            imageUrl = uploadResponse.secure_url;
        }

        const testimonial = new Testimonial({ ...req.body, image: imageUrl });
        const newTestimonial = await testimonial.save();
        res.status(201).json(newTestimonial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete testimonial with Cloudinary cleanup
app.delete('/api/testimonials/:id', async (req, res) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);
        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        if (testimonial.image && testimonial.image.includes('cloudinary')) {
            try {
                const urlParts = testimonial.image.split('/');
                const filenameObj = urlParts.pop();
                const folderObj = urlParts.pop();
                const publicIdClean = `${folderObj}/${filenameObj.split('.')[0]}`;
                await cloudinary.uploader.destroy(publicIdClean);
            } catch (cloudErr) {
                console.error('Cloudinary delete error:', cloudErr);
            }
        }

        await Testimonial.findByIdAndDelete(req.params.id);
        res.json({ message: 'Testimonial deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- Aadhaar eSign Workflow Endpoints ---

// 1. Create Order
app.post('/api/orders', async (req, res) => {
    try {
        const order = new Order({
            userData: req.body.userData,
            serviceType: req.body.serviceType,
            status: 'INITIATED'
        });
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. Submit Form Data
app.put('/api/orders/:id/form', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.formData = req.body.formData;
        order.status = 'FORM_SUBMITTED';

        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 3. Record Payment
app.post('/api/orders/:id/payment', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.payment = {
            transactionId: req.body.transactionId,
            amount: req.body.amount,
            status: 'SUCCESS'
        };
        order.status = 'PAYMENT_SUCCESS';
        await order.save();
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 4. Initiate eSign (Mock)
app.post('/api/orders/:id/esign/initiate', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // In real world, call Setu/Signzy API here
        order.status = 'ESIGN_PENDING';
        order.esign.transactionId = `ESIGN_${Date.now()}`;
        await order.save();

        res.json({
            status: 'success',
            esignUrl: `https://mock-esign-gateway.com/sign/${order.esign.transactionId}`,
            transactionId: order.esign.transactionId
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 5. Verify eSign (Mock)
app.post('/api/orders/:id/esign/verify', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Simulate verification logic
        order.status = 'ESIGN_COMPLETED';
        order.esign.status = 'COMPLETED';
        order.esign.timestamp = new Date();
        order.documents.signedPdf = `https://res.cloudinary.com/demo/image/upload/v1/sample.pdf`;

        await order.save();

        const log = new ESignLog({
            orderId: order._id,
            transactionId: order.esign.transactionId,
            status: 'COMPLETED',
            details: { ip: req.ip, userAgent: req.headers['user-agent'] }
        });
        await log.save();

        res.json(order);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 6. Admin: Get Orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 7. Admin: Get Single Order
app.get('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('notary.notaryId');
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 8. Admin/Notary: Update Status (Assign Notary, Approve, etc.)
app.put('/api/orders/:id/status', async (req, res) => {
    try {
        const { status, notaryId, finalPdf, draftPdf } = req.body;
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        if (draftPdf) {
            order.documents.draftPdf = draftPdf;
        }

        if (req.body.uploadedSignature) {
            order.documents.uploadedSignature = req.body.uploadedSignature;
        }

        if (notaryId) {
            order.notary.notaryId = notaryId;
            order.notary.status = 'ASSIGNED'; // This makes sense to keep as internal notary status
            order.notary.assignmentDate = new Date();
        }

        if (finalPdf) {
            order.documents.finalPdf = finalPdf;
            order.notary.status = 'COMPLETED'; // Internal notary status
            order.notary.notarizedDate = new Date();
        }

        // ONLY update status if explicitly sent from frontend
        if (status) {
            order.status = status;
        }

        await order.save();
        res.json(order);
    } catch (err) {
        console.error("DEBUG: Status update failed:", err.message);
        res.status(400).json({ message: err.message });
    }
});


// 9. Delete Order
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({ message: 'Order deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`[ZOYALEGAL-SERVER] v1.4.0 - Running on ${PORT}`);
    console.log(`[MONGODB] Connected & Ready for E-Sign Workflow`);
});

// SPA Catch-all (Must be after all API routes)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});
