import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LegalServices from './pages/LegalServices';
import CSCServices from './pages/CSCServices';
import BusinessSupport from './pages/BusinessSupport';
import DigitalServices from './pages/DigitalServices';
import GulfJobsVisa from './pages/GulfJobsVisa';
import TravelTransport from './pages/TravelTransport';
import LoadRecovery from './pages/LoadRecovery';
import MedicalHelp from './pages/MedicalHelp';
import SpecialCampaigns from './pages/SpecialCampaigns';
import Payment from './pages/Payment';
import Contact from './pages/Contact';
import Advocates from './pages/Advocates';
import AdvocateRegistration from './pages/AdvocateRegistration';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Admin from './pages/Admin';
import AIChatbot from './components/AIChatbot';
import LegalDisclaimer from './components/LegalDisclaimer';
import { BlogProvider } from './context/BlogContext';

function App() {
  return (
    <BlogProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/legal-services" element={<LegalServices />} />
              <Route path="/csc-services" element={<CSCServices />} />
              <Route path="/business-support" element={<BusinessSupport />} />
              <Route path="/digital-services" element={<DigitalServices />} />
              <Route path="/gulf-jobs-visa" element={<GulfJobsVisa />} />
              <Route path="/travel-transport" element={<TravelTransport />} />
              <Route path="/loan-recovery" element={<LoadRecovery />} />
              <Route path="/medical-help" element={<MedicalHelp />} />
              <Route path="/special-campaigns" element={<SpecialCampaigns />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/advocates" element={<Advocates />} />
              <Route path="/advocate-registration" element={<AdvocateRegistration />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetail />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <AIChatbot />
          <LegalDisclaimer />
        </div>
      </Router>
    </BlogProvider>
  );
}

export default App;