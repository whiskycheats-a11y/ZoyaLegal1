const mongoose = require('mongoose');
require('dotenv').config();

async function check() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const collections = ['blogs', 'advocates', 'acts', 'judgments', 'settings'];
        for (const col of collections) {
            const count = await mongoose.connection.db.collection(col).countDocuments();
            console.log(`Collection ${col}: ${count} documents`);
        }
        process.exit(0);
    } catch (err) {
        console.error('Check error:', err);
        process.exit(1);
    }
}

check();
