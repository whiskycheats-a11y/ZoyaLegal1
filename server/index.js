const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Increased limit for image uploads

// MongoDB Connection String
const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://babahacket4_db_user:ZoyaLegal123@cluster0.snwxmtr.mongodb.net/zoyaDB?appName=Cluster0";

// MongoDB Connection logic moved to downstream to include seeding

// AI Configuration
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

// Cloudinary Configuration
if (process.env.CLOUDINARY_URL) {
    cloudinary.config(true); // Automatically uses CLOUDINARY_URL from env
    console.log('Cloudinary: Using CLOUDINARY_URL configuration');
} else {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
}

// Detailed Diagnostic for Debugging
console.log('--- Cloudinary Diagnostic ---');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'MISSING');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? 'SET (Ends in ' + process.env.CLOUDINARY_API_KEY.slice(-4) + ')' : 'MISSING');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'SET (Length: ' + process.env.CLOUDINARY_API_SECRET.length + ')' : 'MISSING');
console.log('CLOUDINARY_URL:', process.env.CLOUDINARY_URL ? 'SET' : 'NOT SET');
console.log('---------------------------');

const advocateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    court: { type: String, required: true },
    barCouncilId: { type: String },
    photo: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const Advocate = mongoose.model('Advocate', advocateSchema);

// Blog Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // Cloudinary URL
    category: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true },
    readTime: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Blog = mongoose.model('Blog', blogSchema);

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

        const blog = new Blog({
            ...req.body,
            image: imageUrl
        });

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
        title: "Navigating Legal Complexities in Modern Business",
        description: "Understanding the essential legal frameworks every startup needs to know in 2024.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070&auto=format&fit=crop",
        category: "Legal Insights",
        author: "Zoya Legal Team",
        date: "Jan 25, 2024",
        readTime: "5 min read",
        content: `<h2>The Foundation of a Global Business</h2><p>Starting a business in 2024 requires more than just a great idea. It requires a robust legal foundation that can withstand the complexities of international trade and digital compliance.</p><h3>1. Structural Compliance</h3><p>Whether you choose a LLP, Pvt Ltd, or OPC, the structural compliance remains the backbone. Understanding the pros and cons of each is crucial for long-term scalability and tax efficiency.</p><blockquote>"Complexity is the enemy of execution. Keep your legal structures clean and transparent from day one."</blockquote><h3>2. Intellectual Property Protection</h3><p>Your brand name, logo, and unique software are your biggest assets. Trademarking and patenting should not be an afterthought. In the digital age, IP theft is rampant, and legal recourse is only possible with proper registration.</p><h3>3. Contractual Clarity</h3><p>Agreement with vendors, employees, and clients must be water-tight. Ambiguity leads to litigation. Ensure your SLAs (Service Level Agreements) are precise about deliverables, timelines, and dispute resolution.</p>`
    },
    {
        title: "The Future of Digital Security & Privacy",
        description: "How evolving technology is changing the landscape of online data protection and compliance.",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
        category: "Digital Privacy",
        author: "Tech Support Unit",
        date: "Jan 22, 2024",
        readTime: "7 min read",
        content: `<h2>The Age of Zero Trust Architecture</h2><p>Data is the new oil, but it's also a major liability if not handled correctly. As we move deeper into 2024, the concept of "trust" is being replaced by continuous verification.</p><h3>Data Sovereignty and Compliance</h3><p>With regulations like GDPR and India's DPDP Act, businesses must know where their data resides. Non-compliance is no longer just a fine; it's a death sentence for brand reputation.</p><h3>AI in Cybersecurity</h3><p>AI is a double-edged sword. While it enables automated threat detection, it also powers sophisticated phishing attacks. Leveraging AI-driven defense mechanisms is now a necessity, not a luxury.</p><ul><li>End-to-end encryption for all internal communications.</li><li>Multi-factor authentication as a baseline requirement.</li><li>Regular third-party security audits.</li></ul>`
    },
    {
        title: "Maximizing Efficiency in Business Documentation",
        description: "Streamlining your corporate paperwork with AI-integrated CSC services.",
        image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
        category: "Business Support",
        author: "Corporate Desk",
        date: "Jan 20, 2024",
        readTime: "4 min read",
        content: `<h2>The Digital Transformation of Paperwork</h2><p>Efficiency in business is often hindered by legacy documentation processes. At ZoyaLegal, we combine human expertise with AI-driven tools to automate the mundane.</p><h3>Automated GST & ITR Filing</h3><p>Mistakes in tax filing can lead to hefty penalties. Our integrated CSC services ensure that every calculation is precise and every deadline is met automatically.</p><h3>Cloud-Based Document Vaults</h3><p>Forget physical files. Our secure digital vaults store your trade licenses, certificates, and legal deeds with instant access and high-level encryption.</p>`
    },
    {
        title: "Startup Innovation: Beyond the Legal Basics",
        description: "Finding the right balance between legal compliance and creative growth strategies.",
        image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2070&auto=format&fit=crop",
        category: "Innovation",
        author: "Zoya Legal Team",
        date: "Jan 18, 2024",
        readTime: "6 min read",
        content: `<h2>Innovation Under Regulation</h2><p>Many founders fear that legal compliance will stifle their growth. However, the most successful startups use compliance as a competitive advantage.</p><h3>Regulatory Sandboxes</h3><p>Participating in regulatory sandboxes allows startups to test innovative products in a controlled environment, gaining trust from both regulators and investors early on.</p><h3>Agile Legal Strategies</h3><p>Your legal strategy should evolve as fast as your product. Regular "legal health checks" can identify potential risks before they become roadblocks to your next funding round.</p>`
    }
];

// Seeding Function
const seedDB = async () => {
    const blogCount = await Blog.countDocuments();
    if (blogCount === 0) {
        console.log('Seeding initial blogs...');
        await Blog.insertMany(INITIAL_BLOGS);
    }

    const settingsCount = await Settings.countDocuments();
    if (settingsCount === 0) {
        console.log('Seeding default settings...');
        await new Settings({}).save();
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
    console.log('--- AI Chat Request Received ---');
    const { messages } = req.body;
    console.log('Messages body:', JSON.stringify(messages));

    try {
        const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
            model: "openai/gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are Zoya AI, the premium legal assistant for ZoyaLegal. 🏢\n\n**Owner Information:** The owner and lead professional of ZoyaLegal is **Adv. Irfan Khan**. \n\n**Your Role:** \n- Help users with Indian Legal Services, CSC (Common Service Center) queries, Business Registrations (GST, ITR), and connecting with Verified Advocates. ⚖️\n- Your tone must be highly professional, helpful, and empathetic, exactly like ChatGPT. 🌟\n- Use suitable emojis and clear markdown formatting (bolding, lists) to make the conversation engaging and professional. ✅\n- When asked about the owner or team, proudly mention **Adv. Irfan Khan**. 👨‍💼\n- **Important:** Provide informative guidance but avoid giving final legal advice; always suggest consulting with our experts for complex matters. 🤝"
                },
                ...messages
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': 'http://localhost:5173',
                'X-Title': 'ZoyaLegal AI Assistant',
                'Content-Type': 'application/json',
            }
        });

        const aiMessage = response.data.choices[0].message;
        res.json(aiMessage);
    } catch (err) {
        console.error('--- AI Chat Error ---');
        if (err.response) {
            console.error('Status:', err.response.status);
            console.error('Data:', JSON.stringify(err.response.data));
        } else {
            console.error('Message:', err.message);
        }
        res.status(500).json({ message: 'AI failed to respond. Please try again later.' });
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

// Duplicate removed

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
