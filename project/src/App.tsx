import React from 'react';
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

function App() {
  return (
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
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;