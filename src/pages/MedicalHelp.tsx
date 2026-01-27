import React from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  FileText,
  Shield,
  Users,
  CheckCircle,
  Phone,
  AlertTriangle,
  Clock,
  Award
} from 'lucide-react';

export default function MedicalHelp() {
  const extractAmount = (priceText: string | undefined): string | undefined => {
    if (!priceText) return undefined;
    const digits = priceText.replace(/[^0-9]/g, '');
    if (!digits) return undefined;
    return String(parseInt(digits, 10));
  };
  const services = [
    {
      icon: FileText,
      title: 'FIR Copy + MLC Draft',
      hindi: 'एफआईआर कॉपी + एमएलसी ड्राफ्ट',
      description: 'Complete assistance for medical-legal cases including FIR and MLC documentation.',
      details: [
        'FIR copy procurement from police stations',
        'Medico-Legal Case (MLC) report drafting',
        'Medical examination coordination',
        'Police complaint filing assistance',
        'Medical evidence documentation',
        'Witness statement recording',
        'Legal consultation for medical cases',
        'Court representation for medical disputes'
      ],
      price: 'Starting from ₹1,000',
      urgency: 'Emergency support available'
    },
    {
      icon: Shield,
      title: 'Insurance Claim Support',
      hindi: 'बीमा दावा सहायता',
      description: 'Comprehensive insurance claim assistance for medical and accident cases.',
      details: [
        'Health insurance claim filing',
        'Accident insurance claims',
        'Life insurance claim support',
        'Disability insurance claims',
        'Medical bill reimbursement',
        'Cashless treatment coordination',
        'Insurance company negotiations',
        'Claim rejection appeals'
      ],
      price: 'Starting from ₹2,000',
      successRate: '90% claim approval'
    },
    {
      icon: Users,
      title: 'Death + Legal Heir Certificate',
      hindi: 'मृत्यु + कानूनी उत्तराधिकारी प्रमाणपत्र',
      description: 'Death certificate and legal heir certificate services for inheritance matters.',
      details: [
        'Death certificate application',
        'Legal heir certificate processing',
        'Succession certificate application',
        'Family tree documentation',
        'Inheritance claim assistance',
        'Property transfer documentation',
        'Bank account transfer procedures',
        'Insurance nominee claim support'
      ],
      price: 'Starting from ₹1,500',
      timeline: '15-30 days'
    },
    {
      icon: Heart,
      title: 'Hospital Accident Claim',
      hindi: 'अस्पताल दुर्घटना दावा',
      description: 'Specialized assistance for hospital accident claims and medical negligence cases.',
      details: [
        'Medical negligence case filing',
        'Hospital accident documentation',
        'Medical expert consultation',
        'Compensation claim calculation',
        'Medical record analysis',
        'Expert witness arrangement',
        'Consumer court representation',
        'Settlement negotiation'
      ],
      price: 'Starting from ₹5,000',
      expertise: 'Medical law specialists'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Medical Legal Support',
      hindi: 'आपातकालीन चिकित्सा कानूनी सहायता',
      description: '24/7 emergency support for medical-legal emergencies and urgent cases.',
      details: [
        '24/7 emergency helpline',
        'Immediate legal consultation',
        'Emergency FIR filing',
        'Hospital legal representation',
        'Police station assistance',
        'Emergency medical documentation',
        'Urgent court applications',
        'Crisis management support'
      ],
      price: 'Emergency rates apply',
      availability: '24/7 available'
    },
    {
      icon: FileText,
      title: 'Medical Documentation Services',
      hindi: 'चिकित्सा दस्तावेज़ीकरण सेवाएं',
      description: 'Complete medical documentation and certification services.',
      details: [
        'Medical certificate verification',
        'Disability certificate applications',
        'Fitness certificate processing',
        'Medical report translations',
        'Medical record organization',
        'Expert medical opinions',
        'Medical audit support',
        'Healthcare compliance documentation'
      ],
      price: 'Starting from ₹500',
      processing: '3-7 days'
    }
  ];

  const emergencyServices = [
    {
      title: 'Accident Case Support',
      description: 'Immediate assistance for road accidents and medical emergencies',
      response: 'Within 2 hours',
      coverage: '24/7'
    },
    {
      title: 'Medical Negligence',
      description: 'Expert support for medical malpractice and negligence cases',
      response: 'Same day',
      coverage: 'Expert consultation'
    },
    {
      title: 'Insurance Disputes',
      description: 'Urgent resolution for insurance claim rejections and disputes',
      response: 'Within 24 hours',
      coverage: 'All insurers'
    },
    {
      title: 'Death Case Documentation',
      description: 'Immediate support for death-related legal documentation',
      response: 'Within 4 hours',
      coverage: 'Complete assistance'
    }
  ];

  const claimTypes = [
    {
      type: 'Motor Accident Claims',
      coverage: 'Up to ₹50 Lakhs',
      timeline: '6-18 months',
      successRate: '85%'
    },
    {
      type: 'Medical Negligence',
      coverage: 'Up to ₹1 Crore',
      timeline: '12-24 months',
      successRate: '75%'
    },
    {
      type: 'Health Insurance',
      coverage: 'Policy limit',
      timeline: '1-3 months',
      successRate: '95%'
    },
    {
      type: 'Life Insurance',
      coverage: 'Policy amount',
      timeline: '2-6 months',
      successRate: '90%'
    },
    {
      type: 'Disability Claims',
      coverage: 'As per policy',
      timeline: '3-9 months',
      successRate: '80%'
    },
    {
      type: 'Workplace Injury',
      coverage: 'Compensation based',
      timeline: '6-12 months',
      successRate: '85%'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 md:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Heart className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-fade-in">Medical Help Desk</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 animate-fade-in-delay">चिकित्सा सहायता केंद्र</p>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-6 leading-relaxed animate-slide-up">
              Comprehensive medical-legal support services including FIR assistance, insurance claims,
              medical documentation, and emergency legal support for medical cases.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-2xl mx-auto border border-gray-700">
              <p className="text-lg font-semibold">🚨 24/7 Emergency Medical Legal Support Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services Bar */}
      <section className="py-8 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">Emergency Medical Legal Services</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyServices.map((service, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                <h4 className="font-semibold mb-2">{service.title}</h4>
                <p className="text-sm mb-2">{service.description}</p>
                <div className="text-xs">
                  <p>Response: {service.response}</p>
                  <p>Coverage: {service.coverage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Medical Legal Services</h2>
            <p className="text-lg text-gray-600">Professional support for all medical-legal matters</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 group hover:border-black transform hover:-translate-y-2">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gray-100 rounded-xl mr-4 group-hover:bg-black group-hover:text-white transition-all duration-300">
                      <service.icon className="h-8 w-8 text-black group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-black">{service.title}</h3>
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

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Starting Price</p>
                        <p className="text-lg font-black text-black">{service.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {service.urgency && service.urgency}
                          {service.successRate && service.successRate}
                          {service.timeline && service.timeline}
                          {service.expertise && service.expertise}
                          {service.availability && service.availability}
                          {service.processing && service.processing}
                        </p>
                      </div>
                    </div>

                    <Link
                      to={`/payment?purpose=${encodeURIComponent(service.title)}${extractAmount(service.price) ? `&amount=${extractAmount(service.price)}` : ''}`}
                      className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center transform hover:scale-105 group/btn">
                      <Phone className="h-4 w-4 mr-2" />
                      Get Help Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Claims We Handle</h2>
            <p className="text-lg text-gray-600">Comprehensive support for various medical and insurance claims</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {claimTypes.map((claim, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{claim.type}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Max Coverage:</span>
                    <span className="text-sm font-black text-black">{claim.coverage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Timeline:</span>
                    <span className="text-sm font-semibold text-gray-900">{claim.timeline}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Success Rate:</span>
                    <span className="text-sm font-semibold text-green-600">{claim.successRate}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Support Process</h2>
            <p className="text-lg text-gray-600">Step-by-step assistance for medical-legal cases</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: '1', title: 'Emergency Response', desc: 'Immediate assistance and consultation' },
              { step: '2', title: 'Documentation', desc: 'Collect and organize medical records' },
              { step: '3', title: 'Legal Analysis', desc: 'Expert review of case merits' },
              { step: '4', title: 'Claim Filing', desc: 'Professional claim submission' },
              { step: '5', title: 'Follow-up', desc: 'Regular updates and resolution' }
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-100 text-black group-hover:bg-black group-hover:text-white transition-colors duration-300 w-12 h-12 rounded-full flex items-center justify-center font-black text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Medical Help Desk?</h2>
            <p className="text-lg text-gray-600">Expert medical-legal support with compassionate care</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                <Clock className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Emergency Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock assistance for medical emergencies</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                <Award className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical Law Experts</h3>
              <p className="text-gray-600 text-sm">Specialized team with medical-legal expertise</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                <Shield className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High Success Rate</h3>
              <p className="text-gray-600 text-sm">Proven track record in medical claim settlements</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                <Heart className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compassionate Care</h3>
              <p className="text-gray-600 text-sm">Understanding and empathetic approach to medical cases</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Need Medical Legal Assistance?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help with your medical-legal needs, insurance claims, and emergency support
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+919454950104"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              <Phone className="h-5 w-5 mr-2" />
              Emergency: +91-9454950104
            </a>
            <a
              href="https://wa.me/919454950104"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}