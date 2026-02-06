
import { Link } from 'react-router-dom';
import {
  Smartphone,
  Globe,
  Megaphone,
  Users,
  Code,
  CheckCircle,
  Phone,
  Monitor,
  Camera,
  BarChart,
  Fingerprint
} from 'lucide-react';

export default function DigitalServices() {
  const extractAmount = (priceText: string | undefined): string | undefined => {
    if (!priceText) return undefined;
    const digits = priceText.replace(/[^0-9]/g, '');
    if (!digits) return undefined;
    return String(parseInt(digits, 10));
  };
  const services = [
    {
      icon: Globe,
      title: 'Website Development',
      hindi: 'वेबसाइट डेवलपमेंट',
      description: 'Professional website development services for businesses and individuals.',
      details: [
        'Responsive business websites',
        'E-commerce platform development',
        'Blog and content management systems',
        'Portfolio and personal websites',
        'Custom web applications',
        'Website maintenance and updates',
        'Domain and hosting services',
        'SSL certificate installation'
      ],
      price: 'Starting from ₹5,000',
      duration: '7-21 days'
    },
    {
      icon: Megaphone,
      title: 'Digital Marketing',
      hindi: 'डिजिटल मार्केटिंग',
      description: 'Comprehensive digital marketing solutions to grow your online presence.',
      details: [
        'Search Engine Optimization (SEO)',
        'Google Ads and PPC campaigns',
        'Social media advertising',
        'Email marketing campaigns',
        'Content marketing strategy',
        'Online reputation management',
        'Local business marketing',
        'Analytics and reporting'
      ],
      price: 'Starting from ₹3,000/month',
      duration: 'Ongoing'
    },
    {
      icon: Users,
      title: 'Social Media Management',
      hindi: 'सोशल मीडिया प्रबंधन',
      description: 'Complete social media management for businesses and personal brands.',
      details: [
        'Facebook and Instagram management',
        'LinkedIn business page optimization',
        'YouTube channel management',
        'Content creation and scheduling',
        'Community engagement',
        'Social media strategy development',
        'Influencer collaboration',
        'Social media advertising'
      ],
      price: 'Starting from ₹2,500/month',
      duration: 'Monthly packages'
    },
    {
      icon: Code,
      title: 'App Development',
      hindi: 'ऐप डेवलपमेंट',
      description: 'Mobile application development for Android and iOS platforms.',
      details: [
        'Android app development',
        'iOS app development',
        'Cross-platform app solutions',
        'App store optimization',
        'App maintenance and updates',
        'Custom app features',
        'App testing and debugging',
        'App store submission'
      ],
      price: 'Starting from ₹15,000',
      duration: '30-60 days'
    },
    {
      icon: Camera,
      title: 'Branding & Design',
      hindi: 'ब्रांडिंग और डिज़ाइन',
      description: 'Creative branding and design services for businesses.',
      details: [
        'Logo design and branding',
        'Business card and stationery',
        'Brochure and flyer design',
        'Banner and poster design',
        'Social media graphics',
        'Product packaging design',
        'Brand identity development',
        'Print and digital design'
      ],
      price: 'Starting from ₹1,000',
      duration: '3-7 days'
    },
    {
      icon: Monitor,
      title: 'E-commerce Solutions',
      hindi: 'ई-कॉमर्स समाधान',
      description: 'Complete e-commerce platform setup and management.',
      details: [
        'Online store development',
        'Payment gateway integration',
        'Inventory management system',
        'Order tracking and management',
        'Customer support integration',
        'Multi-vendor marketplace',
        'Mobile-responsive design',
        'SEO optimization for products'
      ],
      price: 'Starting from ₹10,000',
      duration: '15-30 days'
    },
    {
      icon: BarChart,
      title: 'Analytics & Reporting',
      hindi: 'एनालिटिक्स और रिपोर्टिंग',
      description: 'Website and marketing analytics with detailed reporting.',
      details: [
        'Google Analytics setup',
        'Conversion tracking',
        'Performance monitoring',
        'Monthly reporting',
        'ROI analysis',
        'Competitor analysis',
        'Market research reports',
        'Business intelligence dashboard'
      ],
      price: 'Starting from ₹1,500/month',
      duration: 'Monthly service'
    },
    {
      icon: Users,
      title: 'Digital Skills Training',
      hindi: 'डिजिटल स्किल ट्रेनिंग',
      description: 'Professional training programs for digital marketing and web development.',
      details: [
        'Digital marketing certification',
        'Web development bootcamp',
        'Social media marketing course',
        'E-commerce management training',
        'Google Ads certification prep',
        'Content writing workshop',
        'Graphic design fundamentals',
        'Online business setup training'
      ],
      price: 'Starting from ₹2,000',
      duration: '1-4 weeks'
    },
    {
      icon: Fingerprint,
      title: 'Aadhaar eSign',
      hindi: 'आधार ई-साइन सेवा',
      description: 'Fully legal digital signatures for all your legal documents and agreements.',
      details: [
        'Aadhaar-based OTP verification',
        'Legally valid in Indian courts',
        'Tamper-proof signed PDF',
        'Rent agreement eSigning',
        'Legal notice digital signing',
        'Affidavit verification',
        'Audit trail and timestamping',
        'Paperless & secure process'
      ],
      price: 'Starting from ₹300',
      duration: '5-10 minutes (Instant)',
      link: '/esign'
    }
  ];

  const internships = [
    {
      title: 'Digital Marketing Intern',
      duration: '3-6 months',
      stipend: '₹5,000-15,000',
      description: 'Hands-on experience in SEO, social media, and online advertising'
    },
    {
      title: 'Web Development Intern',
      duration: '3-6 months',
      stipend: '₹8,000-20,000',
      description: 'Learn modern web development with real client projects'
    },
    {
      title: 'Legal Documentation Intern',
      duration: '2-4 months',
      stipend: '₹6,000-12,000',
      description: 'Experience in legal research and document preparation'
    },
    {
      title: 'Content Writing Intern',
      duration: '2-3 months',
      stipend: '₹4,000-10,000',
      description: 'Content creation for websites, blogs, and social media'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 md:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Smartphone className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-fade-in">Digital Services</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 animate-fade-in-delay">डिजिटल सेवाएं</p>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Complete digital transformation solutions for businesses and individuals. From website development
              to digital marketing, we help you establish a strong online presence and grow your digital footprint.
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
                      to={`/payment?purpose=${encodeURIComponent(service.title)}${extractAmount(service.price) ? `&amount=${extractAmount(service.price)}` : ''}`}
                      className="w-full bg-black text-white py-3 rounded-xl font-black hover:bg-gray-800 transition-all duration-300 flex items-center justify-center transform hover:scale-105 group/btn">
                      <Phone className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Internships & Skills Development</h2>
            <p className="text-lg text-gray-600">Gain practical experience and develop professional skills</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {internships.map((internship, index) => (
              <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-black transition-all group">
                <h3 className="text-lg font-black text-black mb-2">{internship.title}</h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600"><span className="font-bold text-black">Duration:</span> {internship.duration}</p>
                  <p className="text-sm text-gray-600"><span className="font-bold text-black">Stipend:</span> {internship.stipend}</p>
                </div>
                <p className="text-sm text-gray-700 mb-6 leading-relaxed">{internship.description}</p>
                <Link
                  to={`/payment?purpose=${encodeURIComponent(internship.title)}${internship.stipend ? `&amount=${String(internship.stipend).replace(/[^0-9]/g, '')}` : ''}`}
                  className="w-full bg-black text-white py-2 rounded-xl font-black hover:bg-gray-800 transition-all duration-300 text-center block transform hover:scale-105">
                  Pay & Apply
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Digital Services?</h2>
            <p className="text-lg text-gray-600">Professional digital solutions with proven results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                <Globe className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Modern Technology</h3>
              <p className="text-gray-600 text-sm">Latest tools and technologies for optimal results</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                <Users className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600 text-sm">Experienced digital marketing and development professionals</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                <BarChart className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Proven Results</h3>
              <p className="text-gray-600 text-sm">Track record of successful digital transformation projects</p>
            </div>

            <div className="text-center group">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                <CheckCircle className="h-8 w-8 text-black group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
              <p className="text-gray-600 text-sm">Competitive rates with flexible payment options</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Go Digital?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Transform your business with our comprehensive digital services and expert guidance
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+919454950104"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              <Phone className="h-5 w-5 mr-2" />
              Get Free Consultation
            </a>
            <Link to="/payment?purpose=Digital%20Services" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center transform hover:scale-105">
              Pay Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}