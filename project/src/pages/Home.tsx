import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  Building2, 
  Smartphone, 
  Globe, 
  Plane, 
  TrendingUp, 
  Heart, 
  Megaphone,
  ArrowRight,
  CheckCircle,
  Users,
  Award,
  Clock
} from 'lucide-react';

export default function Home() {
  const services = [
    {
      title: 'Legal Services',
      hindi: 'कानूनी सेवाएं',
      icon: Scale,
      color: 'blue',
      description: 'Complete legal consultancy, documentation, property help, cyber law compliance, and court assistance.',
      link: '/legal-services',
      features: ['Legal Consultancy', 'Property Documentation', 'Cyber Law', 'Court Assistance']
    },
    {
      title: 'CSC Services',
      hindi: 'कॉमन सर्विस सेंटर',
      icon: Building2,
      color: 'indigo',
      description: 'Government welfare schemes, banking, insurance, education, and digital services for citizens.',
      link: '/csc-services',
      features: ['Welfare Schemes', 'Banking Services', 'Insurance', 'Education Support']
    },
    {
      title: 'Business Support',
      hindi: 'व्यापार सहायता',
      icon: TrendingUp,
      color: 'slate',
      description: 'Business registration, GST, income tax, startup support, and financial advisory services.',
      link: '/business-support',
      features: ['Business Registration', 'GST & ITR', 'Startup Kit', 'Financial Advisory']
    },
    {
      title: 'Digital Services',
      hindi: 'डिजिटल सेवाएं',
      icon: Smartphone,
      color: 'cyan',
      description: 'Website development, digital marketing, social media management, and skill development programs.',
      link: '/digital-services',
      features: ['Web Development', 'Digital Marketing', 'Social Media', 'Skill Training']
    },
    {
      title: 'Gulf Jobs & Visa',
      hindi: 'खाड़ी नौकरी और वीज़ा',
      icon: Globe,
      color: 'teal',
      description: 'Complete job placement and visa services for Gulf countries with document verification.',
      link: '/gulf-jobs-visa',
      features: ['Job Placement', 'Visa Processing', 'Document Verification', 'Pre-departure Support']
    },
    {
      title: 'Travel & Transport',
      hindi: 'यात्रा और परिवहन',
      icon: Plane,
      color: 'sky',
      description: 'IRCTC booking, flight reservations, driving license, vehicle registration services.',
      link: '/travel-transport',
      features: ['Flight Booking', 'IRCTC Services', 'Driving License', 'Vehicle Registration']
    },
    {
      title: 'Loan Recovery',
      hindi: 'ऋण वसूली',
      icon: TrendingUp,
      color: 'red',
      description: 'EMI bounce recovery, legal notices, and financial dispute resolution services.',
      link: '/loan-recovery',
      features: ['EMI Recovery', 'Legal Notices', 'Dispute Resolution', 'Financial Advice']
    },
    {
      title: 'Medical Help Desk',
      hindi: 'चिकित्सा सहायता',
      icon: Heart,
      color: 'pink',
      description: 'FIR assistance, MLC drafting, insurance claims, and medical legal documentation.',
      link: '/medical-help',
      features: ['FIR Support', 'Insurance Claims', 'Medical Documentation', 'Legal Heir Certificates']
    }
  ];

  const stats = [
    { number: '5000+', label: 'Happy Clients', icon: Users },
    { number: '50+', label: 'Services Offered', icon: Award },
    { number: '24/7', label: 'Support Available', icon: Clock },
    { number: '100%', label: 'Success Rate', icon: CheckCircle }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              ZoyaLegal
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              CSC + Advocate Multi-Service Centre
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              AI-Powered Legal Solutions at Your Fingertips
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 mb-8">
              <div className="flex items-center text-lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                📍 Husain Ganj, Lucknow
              </div>
              <div className="flex items-center text-lg">
                <CheckCircle className="h-5 w-5 mr-2" />
                PAN India Digital Support
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/payment" 
                className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Pay Online
              </Link>
              <Link 
                to="/legal-services" 
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition-all duration-300"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From legal consultancy to digital services, we provide end-to-end solutions for individuals and businesses across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`p-4 bg-${service.color}-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-8 w-8 text-${service.color}-600`} />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className={`text-sm text-${service.color}-600 font-medium mb-3`}>
                  {service.hindi}
                </p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                
                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`text-${service.color}-600 font-semibold group-hover:text-${service.color}-700`}>
                    Learn More
                  </span>
                  <ArrowRight className={`h-5 w-5 text-${service.color}-600 group-hover:translate-x-1 transition-transform duration-300`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Campaigns */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Megaphone className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Special Campaigns</h2>
            <p className="text-xl text-blue-100">
              Limited time offers and special initiatives for our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">Cyber Suraksha Week</h3>
              <p className="text-blue-100 mb-4">
                मुफ्त साइबर सहायता - Free cyber security consultation and FIR assistance
              </p>
              <Link to="/special-campaigns" className="text-white font-semibold hover:text-blue-200 flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">Startup Seva Month</h3>
              <p className="text-blue-100 mb-4">
                ₹1499 लीगल किट - Complete legal documentation package for startups
              </p>
              <Link to="/special-campaigns" className="text-white font-semibold hover:text-blue-200 flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">Senior Citizen Will Week</h3>
              <p className="text-blue-100 mb-4">
                वसीयत ड्राफ्टिंग - Free will drafting services for senior citizens
              </p>
              <Link to="/special-campaigns" className="text-white font-semibold hover:text-blue-200 flex items-center">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today for professional legal and CSC services. Our expert team is ready to assist you with all your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/contact" 
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us Now
            </Link>
            <a 
              href="https://wa.me/919454950104" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}