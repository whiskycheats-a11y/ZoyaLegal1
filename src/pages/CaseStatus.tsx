
import {
    Gavel,
    BookOpen,
    Home,
    MapPin,
    Flag,
    Car,
    Shield,
    FileText,
    Heart,
    Gift,
    Train,
    ExternalLink,
    Building2,
    Landmark,
    Scale,
    Globe,
    Smartphone,
    CreditCard,
    Users,
    Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    {
        title: "COURTS & CASE STATUS (ALL INDIA) – e-Courts",
        icon: Gavel,
        color: "text-blue-600",
        bg: "bg-blue-50",
        links: [
            { name: "District & Subordinate Courts – Case Status", url: "https://services.ecourts.gov.in/ecourtindia_v6/?p=casestatus/index", icon: Search },
            { name: "Consumer Court – Case Filing & Status (e-Jagriti)", url: "https://e-jagriti.gov.in/", icon: Scale },
            { name: "UP Revenue Court – Case Status (RCMS / Vaad)", url: "https://vaad.up.nic.in/", icon: Building2 },
        ]
    },
    {
        title: "ACTS, LAWS & LEGAL KNOWLEDGE",
        icon: BookOpen,
        color: "text-indigo-600",
        bg: "bg-indigo-50",
        links: [
            { name: "India Code – All Central Acts & Rules", url: "https://www.indiacode.nic.in/", icon: Globe },
            { name: "e-Gazette of India – New Laws & Notifications", url: "https://egazette.gov.in/", icon: FileText },
            { name: "Supreme Court of India – Judgments", url: "https://www.sci.gov.in/judgements/", icon: Landmark },
            { name: "High Court Judgments – All India", url: "https://judgments.ecourts.gov.in/", icon: Gavel },
        ]
    },
    {
        title: "PROPERTY, LAND & REGISTRATION",
        icon: Home,
        color: "text-green-600",
        bg: "bg-green-50",
        links: [
            { name: "Uttar Pradesh Stamp & Registration – IGRSUP", url: "https://igrsup.gov.in/", icon: FileText },
            { name: "UP Bhulekh – Land Records", url: "https://upbhulekh.gov.in/", icon: MapPin },
            { name: "Varanasi Nagar Nigam – Property & Mutation", url: "https://nnvns.org.in/PropertyPayment/Mutation_Citizen/ViewPropInvoice.aspx", icon: Building2 },
        ]
    },
    {
        title: "UTTAR PRADESH – PUBLIC SERVICES",
        icon: MapPin,
        color: "text-orange-600",
        bg: "bg-orange-50",
        links: [
            { name: "UP Jansunwai – Public Grievance Tracker", url: "https://jansunwai.up.nic.in/ComplaintTracker", icon: Users },
            { name: "CPGRAMS – Central Public Grievance Portal", url: "https://pgportal.gov.in/", icon: Globe },
            { name: "National Scholarship Portal", url: "https://scholarships.gov.in/", icon: BookOpen },
            { name: "Food & Civil Supplies – Ration / NFSA", url: "https://fcs.up.gov.in/", icon: ShoppingBag },
            { name: "UP Family ID Portal", url: "https://familyid.up.gov.in/portal/Home_en.aspx", icon: Users },
            { name: "UP e-Sathi – Citizen Services", url: "https://esathi.up.gov.in/citizenservices/login/login.aspx", icon: Smartphone },
            { name: "Voter Services – ECI", url: "https://voters.eci.gov.in/", icon: Flag },
            { name: "Human Rights Protection Portal (NHRC)", url: "https://hrcnet.nic.in/", icon: Shield },
            { name: "RTI Online Portal (All India)", url: "https://rtionline.gov.in/", icon: FileText },
            { name: "Lucknow Nagar Nigam", url: "https://lmc.up.nic.in/", icon: Building2 },
            { name: "Lucknow Jal Kal Nigam", url: "https://jklmc.gov.in/", icon: Droplets },
            { name: "UP Jal Nigam – Urban Water Services", url: "https://upjn.co.in/", icon: Droplets },
            { name: "PM Awas Yojana – Housing Status", url: "https://pmaymis.gov.in/", icon: Home },
            { name: "SVAMITVA – Rural Property Card", url: "https://svamitva.nic.in/", icon: MapPin },
        ]
    },
    {
        title: "BIHAR – PUBLIC SERVICES",
        icon: MapPin,
        color: "text-rose-600",
        bg: "bg-rose-50",
        links: [
            { name: "Bihar FIR View – SCRB", url: "https://scrb.bihar.gov.in/FIRiew.aspx", icon: Shield },
            { name: "Bihar Lok Shikayat Niwaran Portal", url: "https://lokshikayat.bihar.gov.in/", icon: Users },
            { name: "RTPS Bihar – Citizen Services", url: "https://serviceonline.bihar.gov.in/", icon: Smartphone },
            { name: "Bihar Bhumi – RCMS", url: "https://biharbhumi.bihar.gov.in/Biharbhumi/RCMS/RCMSDefault", icon: Home },
            { name: "Bihar RTI Portal", url: "https://jaankari.bihar.gov.in/", icon: FileText },
            { name: "Bihar Revenue Court (Dclr)", url: "https://parimarjan.bihar.gov.in/biharBhumireport/RCMSUserPage/CauseList", icon: Gavel },
        ]
    },
    {
        title: "CENTRAL / ALL-INDIA SERVICES",
        icon: Flag,
        color: "text-blue-700",
        bg: "bg-blue-100/50",
        links: [
            { name: "Income Tax e-Filing Portal", url: "https://www.incometax.gov.in", icon: FileText },
            { name: "GST Portal – Registration & Returns", url: "https://services.gst.gov.in/", icon: CreditCard },
            { name: "PAN Card Status – Protean (NSDL)", url: "https://tin.tin.proteantech.in/pantan/StatusTrack.html", icon: CreditCard },
            { name: "Passport Seva Portal", url: "https://www.passportindia.gov.in/", icon: Globe },
            { name: "FSSAI – Food License (FoSCoS)", url: "https://foscos.fssai.gov.in/", icon: ShoppingBag },
            { name: "My Aadhaar – UIDAI Services", url: "https://myaadhaar.uidai.gov.in/", icon: Smartphone },
            { name: "DigiLocker", url: "https://www.digilocker.gov.in/", icon: Shield },
            { name: "Udyam Registration – MSME", url: "https://udyamregistration.gov.in/", icon: Building2 },
        ]
    },
    {
        title: "TRAFFIC, VEHICLE & TRANSPORT",
        icon: Car,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        links: [
            { name: "Parivahan – Ministry of Road Transport", url: "https://parivahan.gov.in/", icon: Car },
            { name: "Traffic e-Challan – Check & Pay", url: "https://echallan.parivahan.gov.in/index/accused-challan", icon: FileText },
            { name: "Virtual Court – Discposal of e-Challan", url: "https://vcourts.gov.in/virtualcourt/", icon: Gavel },
        ]
    },
    {
        title: "POLICE, CYBER, BANKING & LEGAL AID",
        icon: Shield,
        color: "text-red-600",
        bg: "bg-red-50",
        links: [
            { name: "UP Bar Council – Advocate Records", url: "http://upbarcouncil.com/", icon: Users },
            { name: "Legal Services Authority (NALSA)", url: "https://nalsa.gov.in/", icon: Scale },
            { name: "UP Police – FIR & Citizen Services", url: "https://uppolice.gov.in/", icon: Shield },
            { name: "Cyber Crime Complaint Portal", url: "https://cybercrime.gov.in/", icon: Smartphone },
            { name: "Digital Police Portal", url: "https://digitalpolice.gov.in/", icon: Shield },
            { name: "RBI Banking Ombudsman", url: "https://cms.rbi.org.in/", icon: Building2 },
            { name: "UPI / Wallet Dispute Resolution", url: "https://www.npci.org.in/what-we-do/upi/dispute-redressal-mechanism", icon: Smartphone },
            { name: "CKYC – Bank KYC Status Check", url: "https://www.ckycindia.in/", icon: Search },
            { name: "CIBIL – Credit Report & Score", url: "https://www.cibil.com/", icon: TrendingUp },
            { name: "TRAI Telecom Complaint Portal", url: "https://consumercomplaints.trai.gov.in/", icon: Phone },
            { name: "Lost / Stolen Mobile Block (CEIR)", url: "https://www.ceir.gov.in/", icon: Smartphone },
        ]
    },
    {
        title: "CERTIFICATES, LABOUR & SOCIAL SECURITY",
        icon: FileText,
        color: "text-teal-600",
        bg: "bg-teal-50",
        links: [
            { name: "Birth & Death Certificate – CRS", url: "https://crsorgi.gov.in/", icon: FileText },
            { name: "e-SHRAM Card – Unorganised Workers", url: "https://eshram.gov.in/", icon: Users },
            { name: "EPFO – PF, Pension & UAN Services", url: "https://www.epfindia.gov.in/", icon: Building2 },
            { name: "National Social Assistance (NSAP)", url: "https://nsap.nic.in/", icon: Heart },
        ]
    },
    {
        title: "HEALTH & WOMEN SAFETY",
        icon: Heart,
        color: "text-pink-600",
        bg: "bg-pink-50",
        links: [
            { name: "Ayushman Bharat – PMJAY", url: "https://beneficiary.nha.gov.in/", icon: Heart },
            { name: "e-Sanjeevani – Online Doctor", url: "https://esanjeevani.mohfw.gov.in/", icon: Smartphone },
            { name: "National Commission for Women", url: "https://ncwapps.nic.in/", icon: Users },
        ]
    },
    {
        title: "GOVERNMENT SCHEMES",
        icon: Gift,
        color: "text-purple-600",
        bg: "bg-purple-50",
        links: [
            { name: "MyScheme – All Central & State Schemes", url: "https://www.myscheme.gov.in/", icon: Gift },
        ]
    },
    {
        title: "TRAVEL & PUBLIC UTILITY",
        icon: Train,
        color: "text-cyan-600",
        bg: "bg-cyan-50",
        links: [
            { name: "Train Ticket Booking – ConfirmTKT", url: "https://www.confirmtkt.com/rbooking/", icon: Train },
            { name: "IRCTC Air", url: "https://www.air.irctc.co.in/", icon: Plane },
            { name: "Rapido – Bike / Auto / Cab", url: "https://www.rapido.bike/", icon: Car },
        ]
    }
];

// Reimport necessary icons that might have been missed or incorrect ones
import {
    ShoppingBag,
    Droplets,
    TrendingUp,
    Phone,
    Plane
} from 'lucide-react';


const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function CaseStatus() {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                        One-Stop <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Citizen Services</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Access courts, legal aid, public services, and government portals all in one place.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                >
                    {categories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            variants={item}
                            className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-100 flex flex-col"
                        >
                            <div className={`p-4 ${category.bg} border-b border-gray-100 flex items-center space-x-3`}>
                                <div className={`p-2 rounded-lg bg-white shadow-sm ${category.color}`}>
                                    <category.icon className="h-6 w-6" />
                                </div>
                                <h3 className="font-bold text-gray-900 leading-tight">{category.title}</h3>
                            </div>

                            <div className="p-4 flex-1">
                                <ul className="space-y-3">
                                    {category.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className="mr-3 text-gray-400 group-hover:text-blue-600 transition-colors">
                                                    <link.icon className="h-4 w-4" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 flex-1">
                                                    {link.name}
                                                </span>
                                                <ExternalLink className="h-3 w-3 text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-16 text-center">
                    <p className="text-sm text-gray-400">Disclaimer: Links direct to external government and official websites. We are not responsible for their content.</p>
                </div>
            </div>
        </div>
    );
}
