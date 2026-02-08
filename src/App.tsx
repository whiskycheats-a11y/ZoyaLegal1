import { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LegalDisclaimer from './components/LegalDisclaimer';
import TopProgressBar from './components/TopProgressBar';
import { BlogProvider } from './context/BlogContext';

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
import Contact from './pages/Contact';
import Payment from './pages/Payment';
import Advocates from './pages/Advocates';
import AdvocateRegistration from './pages/AdvocateRegistration';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetail';
import Admin from './pages/Admin';
import ActsJudgments from './pages/ActsJudgments';
import ClientPortal from './pages/ClientPortal';
import CaseStatus from './pages/CaseStatus';
import ESignServices from './pages/ESignServices';
import ESignProcess from './pages/ESignProcess';
import NotaryDashboard from './pages/NotaryDashboard';
import ClientReview from './pages/ClientReview';

// Loading fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
    <div className="flex flex-col items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-black"></div>
      <p className="mt-4 font-black uppercase tracking-widest text-[10px] animate-pulse">Loading ZoyaLegal_</p>
    </div>
  </div>
);

function App() {

  useEffect(() => {
    // Standard standard browser behavior restored. 
    // Removed restrictive contextmenu and keydown handlers.

    // 1. Tab visibility logic (harmless but premium touch)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        document.title = "ZoyaLegal - Secure";
      } else {
        document.title = "ZoyaLegal - CSC + Advocate Multi-Service Centre";
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <BlogProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col transition-all duration-300">
          <TopProgressBar />
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<PageLoader />}>
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
                <Route path="/acts-judgments" element={<ActsJudgments />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<BlogDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/client-portal" element={<ClientPortal />} />
                <Route path="/case-status" element={<CaseStatus />} />
                <Route path="/esign" element={<ESignServices />} />
                <Route path="/esign/process" element={<ESignProcess />} />
                <Route path="/notary/dashboard" element={<NotaryDashboard />} />
                <Route path="/write-review" element={<ClientReview />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <LegalDisclaimer />
        </div>

      </Router>
    </BlogProvider>
  );
}

export default App;