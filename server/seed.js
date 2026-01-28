const mongoose = require('mongoose');
require('dotenv').config();

const actSchema = new mongoose.Schema({
    name: String,
    sections: String,
    category: String,
    pdfUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const judgmentSchema = new mongoose.Schema({
    title: String,
    court: String,
    date: String,
    simpleExplanation: String,
    pdfUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const Act = mongoose.model('Act', actSchema);
const Judgment = mongoose.model('Judgment', judgmentSchema);

async function seed() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing (optional - user said "sab dalde" which usually implies wanting a fresh start or adding to it)
        // I will add to it but avoid duplicates if possible, or just clear if it's empty.
        const existingActs = await Act.countDocuments();
        if (existingActs > 0) {
            console.log('Database already has data. Skipping seeding to prevent duplicates.');
            process.exit(0);
        }

        const acts = [
            {
                name: "Indian Penal Code (IPC), 1860",
                category: "Central",
                sections: "511 Sections",
                pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/2263/1/A1860-45.pdf"
            },
            {
                name: "Code of Civil Procedure (CPC), 1908",
                category: "Central",
                sections: "158 Sections & Orders",
                pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/2192/1/A1908-05.pdf"
            },
            {
                name: "The Constitution of India",
                category: "Central",
                sections: "448 Articles, 12 Schedules",
                pdfUrl: "https://legislative.gov.in/sites/default/files/COI_English.pdf"
            },
            {
                name: "The Indian Evidence Act, 1872",
                category: "Central",
                sections: "167 Sections",
                pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/2188/1/A1872-01.pdf"
            }
        ];

        const judgments = [
            {
                title: "Kesavananda Bharati v. State of Kerala (1973)",
                court: "Supreme Court of India",
                date: "Apr 24, 1973",
                simpleExplanation: "The landmark ruling that established the 'Basic Structure Doctrine', stating that Parliament cannot amend the essential features of the Constitution.",
                pdfUrl: "#"
            },
            {
                title: "Maneka Gandhi v. Union of India (1978)",
                court: "Supreme Court of India",
                date: "Jan 25, 1978",
                simpleExplanation: "Expanded Article 21 (Right to Life and Personal Liberty) to mean that any procedure established by law must be fair, just, and reasonable, not arbitrary.",
                pdfUrl: "#"
            },
            {
                title: "Vishaka v. State of Rajasthan (1997)",
                court: "Supreme Court of India",
                date: "Aug 13, 1997",
                simpleExplanation: "Laid down the 'Vishaka Guidelines' for the protection of women against sexual harassment at the workplace, which eventually led to the POSH Act.",
                pdfUrl: "#"
            }
        ];

        await Act.insertMany(acts);
        await Judgment.insertMany(judgments);

        console.log('Seeding successful!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
