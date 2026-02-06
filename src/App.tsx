import { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CameraOff } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
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
  const [screenshotWarning, setScreenshotWarning] = useState(false);

  useEffect(() => {
    // 1. Disable Right Click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Disable Key Shortcuts (Copy, View Source, Save, PrintScreen)
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+C, Ctrl+V, Ctrl+U, Ctrl+S, Ctrl+P, F12
      if (
        (e.ctrlKey && (e.key === 'c' || e.key === 'C')) ||
        (e.ctrlKey && (e.key === 'v' || e.key === 'V')) ||
        (e.ctrlKey && (e.key === 'u' || e.key === 'U')) ||
        (e.ctrlKey && (e.key === 's' || e.key === 'S')) ||
        (e.ctrlKey && (e.key === 'p' || e.key === 'P')) ||
        e.key === 'F12'
      ) {
        e.preventDefault();
        return false;
      }

      if (e.key === 'PrintScreen') {
        setScreenshotWarning(true);
        setTimeout(() => setScreenshotWarning(false), 3000);
        e.preventDefault();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        setScreenshotWarning(true);
        setTimeout(() => setScreenshotWarning(false), 3000);
      }
    };

    // 3. Document Protection Logic
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        document.title = "Protected Content | ZoyaLegal";
      } else {
        document.title = "ZoyaLegal - CSC + Advocate Multi-Service Centre";
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
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
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <AIChatbot />
          <LegalDisclaimer />
        </div>

        {/* Screenshot Warning Overlay */}
        {screenshotWarning && (
          <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-6 animate-fade-in">
            <div className="text-center max-w-md">
              <div className="bg-red-500/10 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center border border-red-500/20">
                <CameraOff className="h-12 w-12 text-red-500 animate-pulse" />
              </div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-4">
                Screenshot <span className="text-red-500">Protected_</span>
              </h2>
              <p className="text-gray-400 font-medium leading-relaxed">
                ZoyaLegal content is encrypted and protected. Unauthorized screen captures are disabled to ensure legal document security.
              </p>
              <div className="mt-8 pt-8 border-t border-white/10 text-[10px] text-gray-500 uppercase tracking-[0.3em]">
                System ID: ZLY-PRO-001
              </div>
            </div>
          </div>
        )}
      </Router>
    </BlogProvider>
  );
}

export default App;
