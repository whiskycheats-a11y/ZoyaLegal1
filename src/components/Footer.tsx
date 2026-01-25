import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold">ZoyaLegal</h3>
                <p className="text-sm text-gray-300">CSC + Advocate Centre</p>
              </div>
            </div>
            <p className="text-gray-300">
              AI-Powered Legal Solutions at Your Fingertips. Providing comprehensive legal and CSC services across India.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><Link to="/legal-services" className="text-gray-300 hover:text-blue-400 transition-colors">Legal Services</Link></li>
              <li><Link to="/csc-services" className="text-gray-300 hover:text-blue-400 transition-colors">CSC Services</Link></li>
              <li><Link to="/business-support" className="text-gray-300 hover:text-blue-400 transition-colors">Business Support</Link></li>
              <li><Link to="/digital-services" className="text-gray-300 hover:text-blue-400 transition-colors">Digital Services</Link></li>
              <li><Link to="/gulf-jobs-visa" className="text-gray-300 hover:text-blue-400 transition-colors">Gulf Jobs & Visa</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 mt-0.5" />
                <p className="text-gray-300">
                  Guru Govind Singh Marg,<br />
                  Safdalbagh, Lalkua,<br />
                  Lucknow, UP-226001
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <p className="text-gray-300">+91-9454950104</p>
              </div>
              <div className="flex items-center space-x-3">
                <MessageCircle className="h-5 w-5 text-blue-400" />
                <p className="text-gray-300">WhatsApp Support Available</p>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Office Hours</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-400" />
                <div>
                  <p className="text-gray-300">Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-300">Sunday: Emergency Only</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <h5 className="font-semibold text-blue-400 mb-2">Special Campaigns</h5>
              <p className="text-sm text-gray-300">
                • Cyber Suraksha Week<br />
                • Startup Seva Month<br />
                • Senior Citizen Will Week
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 ZoyaLegal - CSC + Advocate Multi-Service Centre. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}