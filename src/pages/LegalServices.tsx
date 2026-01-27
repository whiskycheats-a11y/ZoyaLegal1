import React from 'react';
import { Link } from 'react-router-dom';
import {
  Scale,
  FileText,
  Home,
  Newspaper,
  Shield,
  Globe,
  Users,
  Gavel,
  CheckCircle,
  ArrowRight,
  Phone
} from 'lucide-react';

export default function LegalServices() {
  const services = [
    {
      icon: FileText,
      title: 'Legal Consultancy & Documentation',
      hindi: 'कानूनी परामर्श और दस्तावेज़ीकरण',
      description: 'Comprehensive legal advice and document preparation for all your legal needs.',
      details: [
        'Legal consultation on civil and criminal matters',
        'Contract drafting and review',
        'Agreement preparation (rental, partnership, employment)',
        'Legal notice drafting and dispatch',
        'Power of attorney documentation',
        'Legal opinion on complex matters'
      ],
      price: 'Starting from ₹500',
      duration: '1-3 days'
    },
    {
      icon: Users,
      title: 'Free Legal Aid & ADR',
      hindi: 'मुफ़्त कानूनी सहायता',
      description: 'Free legal assistance and Alternative Dispute Resolution services for eligible cases.',
      details: [
        'Free legal consultation for eligible applicants',
        'Lok Adalat representation',
        'Mediation and arbitration services',
        'Family dispute resolution',
        'Consumer complaint assistance',
        'Women and child protection cases',
        'Senior citizen legal support'
      ],
      price: 'Free for eligible cases',
      duration: 'Immediate consultation'
    },
    {
      icon: Home,
      title: 'Property Legal Help',
      hindi: 'भूलेख, रजिस्ट्री, म्यूटेशन',
      description: 'Complete property-related legal services including documentation and registration.',
      details: [
        'Property verification and due diligence',
        'Sale deed and purchase agreement drafting',
        'Property registration assistance',
        'Mutation and title transfer',
        'Khatauni and revenue record correction',
        'Property dispute resolution',
        'Partition deed preparation',
        'Lease and rent agreement drafting'
      ],
      price: 'Starting from ₹2,000',
      duration: '3-7 days'
    },
    {
      icon: Newspaper,
      title: 'E-Gazette Publication',
      hindi: 'ई-गजट प्रकाशन (नाम सुधार)',
      description: 'Official gazette publication services for name changes and legal notices.',
      details: [
        'Name change gazette publication',
        'Date of birth correction notices',
        'Business name change publication',
        'Legal heir certificate notices',
        'Public notice advertisements',
        'Government tender notifications',
        'Court notice publications'
      ],
      price: 'Starting from ₹1,500',
      duration: '7-15 days'
    },
    {
      icon: Shield,
      title: 'Cyber Law & IT Compliance',
      hindi: 'साइबर शिकायत, एफआईआर सहायता',
      description: 'Cyber crime complaints, FIR assistance, and IT Act compliance services.',
      details: [
        'Cyber crime complaint filing',
        'Online fraud FIR assistance',
        'Social media defamation cases',
        'Digital evidence preservation',
        'IT Act compliance consultation',
        'Data protection and privacy law',
        'E-commerce legal compliance',
        'Digital signature and encryption advice'
      ],
      price: 'Starting from ₹1,000',
      duration: '1-5 days'
    },
    {
      icon: Globe,
      title: 'Notary & International Legal',
      hindi: 'NRI सेवा, वीज़ा डॉक्युमेंट',
      description: 'Notary services and international legal documentation for NRIs and visa applications.',
      details: [
        'Document notarization and attestation',
        'Apostille services for international use',
        'NRI property management documentation',
        'Visa application document preparation',
        'Embassy attestation assistance',
        'International contract review',
        'Cross-border legal consultation',
        'Immigration document preparation'
      ],
      price: 'Starting from ₹300 per document',
      duration: '1-7 days'
    },
    {
      icon: Users,
      title: 'NRI Legal Desk',
      hindi: 'उत्तराधिकार, प्रॉपर्टी विवाद',
      description: 'Specialized legal services for Non-Resident Indians including property and succession matters.',
      details: [
        'NRI property dispute resolution',
        'Succession certificate application',
        'Probate and will execution',
        'Family settlement agreements',
        'NRI taxation legal advice',
        'Repatriation of funds documentation',
        'Property management contracts',
        'Cross-border inheritance cases'
      ],
      price: 'Starting from ₹5,000',
      duration: '7-30 days'
    },
    {
      icon: Shield,
      title: 'Women & Child Protection',
      hindi: 'घरेलू हिंसा, हेल्पलाइन',
      description: 'Legal protection and support services for women and children.',
      details: [
        'Domestic violence complaint filing',
        'Protection order applications',
        'Child custody and maintenance cases',
        '498A and dowry harassment cases',
        'Women helpline assistance',
        'POCSO Act case support',
        'Maintenance and alimony cases',
        'Divorce and separation proceedings'
      ],
      price: 'Free consultation available',
      duration: 'Immediate support'
    },
    {
      icon: Gavel,
      title: 'Court Assistance',
      hindi: 'एफिडेविट, बेल बॉन्ड',
      description: 'Complete court-related assistance including affidavits, bail bonds, and case filing.',
      details: [
        'Affidavit drafting and execution',
        'Bail bond arrangement',
        'Court case filing assistance',
        'Legal representation in courts',
        'Appeal preparation and filing',
        'Interim relief applications',
        'Execution of court orders',
        'Compliance and follow-up services'
      ],
      price: 'Starting from ₹500',
      duration: '1-3 days'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 md:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Scale className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-fade-in">Legal Services</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 animate-fade-in-delay">कानूनी सेवाएं</p>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Comprehensive legal solutions covering all aspects of law - from documentation to court representation.
              Our expert legal team provides professional services with complete confidentiality and reliability.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 group hover:border-black transform hover:-translate-y-2">
                <div className="p-6 md:p-8">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gray-100 rounded-xl mr-4 group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <service.icon className="h-8 w-8 text-black group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-black">{service.title}</h3>
                      <p className="text-sm text-gray-600 font-bold">{service.hindi}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>

                  <div className="space-y-2 mb-6">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-black mr-2 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Starting Price</p>
                        <p className="text-lg font-black text-black">{service.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 font-medium">Duration</p>
                        <p className="text-sm font-bold text-gray-900">{service.duration}</p>
                      </div>
                    </div>

                    <Link
                      to={`/payment?purpose=${encodeURIComponent(service.title)}${service.price ? `&amount=${service.price.replace(/[^0-9]/g, '')}` : ''}`}
                      className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center group/btn transform hover:scale-105"
                    >
                      <Phone className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Pay & Consult
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Legal Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Legal Services?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional legal expertise with a commitment to justice and client satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:bg-black hover:text-white transition-all duration-300 group">
                <Scale className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Legal Team</h3>
              <p className="text-gray-600 text-sm">Qualified advocates with years of experience in various legal domains</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:bg-black hover:text-white transition-all duration-300 group">
                <Shield className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Complete Confidentiality</h3>
              <p className="text-gray-600 text-sm">All client information maintained with strict confidentiality and privacy</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:bg-black hover:text-white transition-all duration-300 group">
                <CheckCircle className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Pricing</h3>
              <p className="text-gray-600 text-sm">Clear fee structure with no hidden charges and affordable legal solutions</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 hover:bg-black hover:text-white transition-all duration-300 group">
                <Phone className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock legal assistance and emergency consultation available</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Need Legal Assistance?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact our expert legal team today for professional consultation and reliable legal solutions
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+919454950104"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Now: +91-9454950104
            </a>
            <a
              href="https://wa.me/919454950104"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              WhatsApp Consultation
              <ArrowRight className="h-5 w-5 ml-2" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}