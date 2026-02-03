import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import LegalDisclaimer from './components/LegalDisclaimer';
import TopProgressBar from './components/TopProgressBar';
import { BlogProvider } from './context/BlogContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const LegalServices = lazy(() => import('./pages/LegalServices'));
const CSCServices = lazy(() => import('./pages/CSCServices'));
const BusinessSupport = lazy(() => import('./pages/BusinessSupport'));
const DigitalServices = lazy(() => import('./pages/DigitalServices'));
const GulfJobsVisa = lazy(() => import('./pages/GulfJobsVisa'));
const TravelTransport = lazy(() => import('./pages/TravelTransport'));
const LoadRecovery = lazy(() => import('./pages/LoadRecovery'));
const MedicalHelp = lazy(() => import('./pages/MedicalHelp'));
const SpecialCampaigns = lazy(() => import('./pages/SpecialCampaigns'));
const Contact = lazy(() => import('./pages/Contact'));
const Payment = lazy(() => import('./pages/Payment'));
const Advocates = lazy(() => import('./pages/Advocates'));
const AdvocateRegistration = lazy(() => import('./pages/AdvocateRegistration'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Admin = lazy(() => import('./pages/Admin'));
const ActsJudgments = lazy(() => import('./pages/ActsJudgments'));
const ClientPortal = lazy(() => import('./pages/ClientPortal'));

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
  return (
    <BlogProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
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
              </Routes>
            </Suspense>
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