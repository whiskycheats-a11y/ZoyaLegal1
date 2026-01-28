const mongoose = require('mongoose');
require('dotenv').config();

const actSchema = new mongoose.Schema({
    name: String,
    sections: String,
    category: String,
    description: String,
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

        // Clear existing data for a fresh seed
        await Act.deleteMany({});
        await Judgment.deleteMany({});
        console.log('Cleared existing data...');

        const acts = [
            {
                name: "Bharatiya Nyaya Sanhita (BNS), 2023",
                category: "Central",
                sections: "358 Sections",
                description: "The Bharatiya Nyaya Sanhita (BNS) is the official criminal code of India, replacing the Indian Penal Code (IPC) of 1860. It streamlines offenses, introduces community service as a punishment, and modernizes the legal framework for the 21st century.\n\nKey changes include a more structured approach to crimes against women and children, redefined terrorism offenses, and the removal of sedition in its previous colonial form.",
                pdfUrl: "https://lscontent.nic.in/LegisUpdate/A2023-45.pdf"
            },
            {
                name: "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
                category: "Central",
                sections: "531 Sections",
                description: "The Bharatiya Nagarik Suraksha Sanhita (BNSS) replaces the Code of Criminal Procedure (CrPC). It focuses on digitizing the entire trial process, from FIR registration to judgment delivery.\n\nIt mandates forensic investigation for serious crimes, introduces timelines for investigations and trials, and allows for virtual presence of witnesses and accused, significantly speeding up the justice delivery system.",
                pdfUrl: "https://lscontent.nic.in/LegisUpdate/A2023-46.pdf"
            },
            {
                name: "Code of Civil Procedure (CPC), 1908",
                category: "Central",
                sections: "158 Sections & Orders",
                description: "The Code of Civil Procedure governs the administration of civil proceedings in India. While the criminal laws have been overhauled, CPC remains the bedrock of civil litigation, ensuring fair trials for property, contract, and commercial disputes.",
                pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/2192/1/A1908-05.pdf"
            },
            {
                name: "Bharatiya Sakshya Adhiniyam (BSA), 2023",
                category: "Central",
                sections: "170 Sections",
                description: "The Bharatiya Sakshya Adhiniyam replaces the Indian Evidence Act, 1872. It expands the definition of evidence to include digital and electronic records as primary evidence.\n\nThis update ensures that the law of evidence keeps pace with technological advancements, making it easier to prosecute cybercrimes and use modern technological proofs in court.",
                pdfUrl: "https://lscontent.nic.in/LegisUpdate/A2023-47.pdf"
            },
            {
                name: "The Constitution of India",
                category: "Central",
                sections: "448 Articles, 12 Schedules",
                description: "The supreme law of India, establishing the framework for the nation's democracy. It remains the guiding light for all legal interpretations, ensuring fundamental rights and justice for every citizen.",
                pdfUrl: "https://legislative.gov.in/sites/default/files/COI_English.pdf"
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

        console.log('Seeding successful (New Laws Updated)!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
