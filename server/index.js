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

// MongoDB Connection
const MONGODB_URI = "mongodb+srv://babahacket4_db_user:ZoyaLegal123@cluster0.snwxmtr.mongodb.net/zoyaDB?appName=Cluster0";

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// AI Configuration
const OPENROUTER_API_KEY = "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";

// Cloudinary Configuration
cloudinary.config({
    cloud_name: 'dbrc133cd',
    api_key: '217825911872736',
    api_secret: 'huJ1EbxwXHTAw36UwwnPGtkTjx4'
});

// Advocate Schema
const advocateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    court: { type: String, required: true },
    photo: { type: String }, // Cloudinary URL
    createdAt: { type: Date, default: Date.now }
});

const Advocate = mongoose.model('Advocate', advocateSchema);

// API Endpoints
// Register new advocate with Cloudinary Upload
app.post('/api/advocates', async (req, res) => {
    try {
        let photoUrl = '';

        // Upload image to Cloudinary if provided
        if (req.body.photo) {
            const uploadResponse = await cloudinary.uploader.upload(req.body.photo, {
                folder: 'zoya_advocates',
            });
            photoUrl = uploadResponse.secure_url;
        }

        const advocate = new Advocate({
            name: req.body.name,
            phone: req.body.phone,
            court: req.body.court,
            photo: photoUrl
        });

        const newAdvocate = await advocate.save();
        res.status(201).json(newAdvocate);
    } catch (err) {
        console.error('Registration Error:', err);
        res.status(400).json({ message: err.message });
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
