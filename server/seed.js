const mongoose = require('mongoose');
require('dotenv').config();

const actSchema = new mongoose.Schema({
    name: String,
    name_hi: String,
    sections: String,
    sections_hi: String,
    category: String,
    category_hi: String,
    description: String,
    description_hi: String,
    pdfUrl: String,
    createdAt: { type: Date, default: Date.now }
});

const judgmentSchema = new mongoose.Schema({
    title: String,
    title_hi: String,
    court: String,
    court_hi: String,
    date: String,
    date_hi: String,
    simpleExplanation: String,
    simpleExplanation_hi: String,
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
                name_hi: "भारतीय न्याय संहिता (बीएनएस), 2023",
                category: "Central",
                category_hi: "केंद्रीय",
                sections: "358 Sections",
                sections_hi: "358 धाराएं",
                description: "The Bharatiya Nyaya Sanhita (BNS) is the official criminal code of India, replacing the Indian Penal Code (IPC) of 1860. It streamlines offenses, introduces community service as a punishment, and modernizes the legal framework for the 21st century.",
                description_hi: "भारतीय न्याय संहिता (BNS) भारत की आधिकारिक आपराधिक संहिता है, जो 1860 के भारतीय दंड संहिता (IPC) का स्थान लेती है। यह अपराधों को सरल बनाती है, सजा के रूप में सामुदायिक सेवा को पेश करती है, और 21 वीं सदी के लिए कानूनी ढांचे को आधुनिक बनाती है।",
                pdfUrl: "https://lscontent.nic.in/LegisUpdate/A2023-45.pdf"
            },
            {
                name: "Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023",
                name_hi: "भारतीय नागरिक सुरक्षा संहिता (बीएनएसएस), 2023",
                category: "Central",
                category_hi: "केंद्रीय",
                sections: "531 Sections",
                sections_hi: "531 धाराएं",
                description: "The Bharatiya Nagarik Suraksha Sanhita (BNSS) replaces the Code of Criminal Procedure (CrPC). It focuses on digitizing the entire trial process, from FIR registration to judgment delivery.",
                description_hi: "भारतीय नागरिक सुरक्षा संहिता (BNSS) दंड प्रक्रिया संहिता (CrPC) का स्थान लेती है। यह प्राथमिकी (FIR) पंजीकरण से लेकर निर्णय वितरण तक, पूरी मुकदमे की प्रक्रिया को डिजिटल बनाने पर केंद्रित है।",
                pdfUrl: "https://lscontent.nic.in/LegisUpdate/A2023-46.pdf"
            },
            {
                name: "Code of Civil Procedure (CPC), 1908",
                name_hi: "सिविल प्रक्रिया संहिता (सीपीसी), 1908",
                category: "Central",
                category_hi: "केंद्रीय",
                sections: "158 Sections & Orders",
                sections_hi: "158 धाराएं और आदेश",
                description: "The Code of Civil Procedure governs the administration of civil proceedings in India. CPC remains the bedrock of civil litigation, ensuring fair trials for property and commercial disputes.",
                description_hi: "सिविल प्रक्रिया संहिता भारत में सिविल कार्यवाही के प्रशासन को नियंत्रित करती है। सीपीसी सिविल मुकदमेबाजी का आधार बनी हुई है, जो संपत्ति और वाणिज्यिक विवादों के लिए निष्पक्ष सुनवाई सुनिश्चित करती है।",
                pdfUrl: "https://www.indiacode.nic.in/bitstream/123456789/2192/1/A1908-05.pdf"
            },
            {
                name: "Bharatiya Sakshya Adhiniyam (BSA), 2023",
                name_hi: "भारतीय साक्ष्य अधिनियम (बीएसए), 2023",
                category: "Central",
                category_hi: "केंद्रीय",
                sections: "170 Sections",
                sections_hi: "170 धाराएं",
                description: "The Bharatiya Sakshya Adhiniyam replaces the Indian Evidence Act, 1872. It expands the definition of evidence to include digital and electronic records as primary evidence.",
                description_hi: "भारतीय साक्ष्य अधिनियम 1872 के भारतीय साक्ष्य अधिनियम का स्थान लेता है। यह प्राथमिक साक्ष्य के रूप में डिजिटल और इलेक्ट्रॉनिक रिकॉर्ड को शामिल करने के लिए साक्ष्य की परिभाषा का विस्तार करता है।",
                pdfUrl: "https://lscontent.nic.in/LegisUpdate/A2023-47.pdf"
            }
        ];

        const judgments = [
            {
                title: "Kesavananda Bharati v. State of Kerala (1973)",
                title_hi: "केशवानंद भारती बनाम केरल राज्य (1973)",
                court: "Supreme Court of India",
                court_hi: "भारत का सर्वोच्च न्यायालय",
                date: "Apr 24, 1973",
                date_hi: "24 अप्रैल, 1973",
                simpleExplanation: "Parliament cannot amend the essential features of the Constitution (Basic Structure Doctrine).",
                simpleExplanation_hi: "संसद संविधान की आवश्यक विशेषताओं (बुनियादी संरचना सिद्धांत) में संशोधन नहीं कर सकती है।",
                pdfUrl: "#"
            },
            {
                title: "Maneka Gandhi v. Union of India (1978)",
                title_hi: "मेनका गांधी बनाम भारत संघ (1978)",
                court: "Supreme Court of India",
                court_hi: "भारत का सर्वोच्च न्यायालय",
                date: "Jan 25, 1978",
                date_hi: "25 जनवरी, 1978",
                simpleExplanation: "Any procedure established by law must be fair, just, and reasonable, not arbitrary.",
                simpleExplanation_hi: "कानून द्वारा स्थापित कोई भी प्रक्रिया निष्पक्ष, न्यायपूर्ण और उचित होनी चाहिए, मनमानी नहीं।",
                pdfUrl: "#"
            }
        ];

        await Act.insertMany(acts);
        await Judgment.insertMany(judgments);

        console.log('Seeding successful (Bilingual Data Updated)!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();
