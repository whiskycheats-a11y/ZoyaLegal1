
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Building,
  Calculator,
  FileText,
  Rocket,
  CheckCircle,
  Phone,
  Users,
  Shield,
  Award
} from 'lucide-react';

export default function BusinessSupport() {
  const extractAmount = (priceText: string | undefined): string | undefined => {
    if (!priceText) return undefined;
    const digits = priceText.replace(/[^0-9]/g, '');
    if (!digits) return undefined;
    return String(parseInt(digits, 10));
  };
  const services = [
    {
      icon: Building,
      title: 'Business Registration',
      hindi: 'व्यापार पंजीकरण',
      description: 'Complete business setup including company registration, GST, and ROC compliance.',
      details: [
        'Private Limited Company registration',
        'Partnership firm registration',
        'LLP (Limited Liability Partnership)',
        'One Person Company (OPC)',
        'GST registration and compliance',
        'ROC annual filing',
        'Trade license applications',
        'Shop establishment registration'
      ],
      price: 'Starting from ₹5,000',
      duration: '7-15 days',
      popular: true
    },
    {
      icon: Calculator,
      title: 'Income Tax Services',
      hindi: 'आयकर सेवाएं',
      description: 'Comprehensive income tax services including ITR filing, TDS, and PAN/TAN registration.',
      details: [
        'Income Tax Return (ITR) filing',
        'TDS return filing and compliance',
        'PAN card application and corrections',
        'TAN registration for businesses',
        'Tax planning and consultation',
        'Income tax notice handling',
        'Advance tax calculation and payment',
        'Tax audit and compliance'
      ],
      price: 'Starting from ₹500',
      duration: '1-7 days'
    },
    {
      icon: TrendingUp,
      title: 'Integrated Legal + Finance',
      hindi: 'एकीकृत कानूनी + वित्त',
      description: 'Complete business solutions combining legal and financial services for SMEs.',
      details: [
        'Business legal compliance audit',
        'Financial planning and analysis',
        'Contract management and review',
        'Regulatory compliance assistance',
        'Business restructuring advice',
        'Merger and acquisition support',
        'Corporate governance guidance',
        'Risk assessment and management'
      ],
      price: 'Starting from ₹10,000',
      duration: '15-30 days'
    },
    {
      icon: Rocket,
      title: 'Startup Kit @ ₹1499',
      hindi: 'स्टार्टअप किट',
      description: 'Complete legal documentation package specifically designed for startup businesses.',
      details: [
        'Business plan template and guidance',
        'Partnership/Shareholders agreement',
        'Employment agreement templates',
        'Non-disclosure agreement (NDA)',
        'Terms and conditions drafting',
        'Privacy policy and legal notices',
        'Intellectual property guidance',
        'Compliance checklist and timeline'
      ],
      price: '₹1,499 (Special Offer)',
      duration: '3-5 days',
      featured: true
    }
  ];

  const additionalServices = [
    {
      title: 'MSME Registration',
      description: 'Udyog Aadhaar and MSME certificate',
      price: '₹1,000'
    },
    {
      title: 'Import Export Code (IEC)',
      description: 'IEC license for international trade',
      price: '₹2,500'
    },
    {
      title: 'FSSAI License',
      description: 'Food business license and registration',
      price: '₹3,000'
    },
    {
      title: 'Digital Signature Certificate',
      description: 'Class 2 and Class 3 DSC for businesses',
      price: '₹800'
    },
    {
      title: 'Trademark Registration',
      description: 'Brand protection and trademark filing',
      price: '₹5,000'
    },
    {
      title: 'Professional Tax Registration',
      description: 'State-wise professional tax compliance',
      price: '₹1,500'
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Legal Compliance',
      description: 'Ensure your business meets all legal requirements'
    },
    {
      icon: TrendingUp,
      title: 'Growth Support',
      description: 'Scalable solutions that grow with your business'
    },
    {
      icon: Users,
      title: 'Expert Guidance',
      description: 'Professional advice from experienced consultants'
    },
    {
      icon: Award,
      title: 'Quality Assurance',
      description: 'High-quality documentation and services'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 md:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <TrendingUp className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-fade-in">Business Support</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 animate-fade-in-delay">व्यापार और टैक्स सहायता</p>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Complete business solutions from registration to compliance. We help entrepreneurs and businesses
              establish, grow, and maintain legal compliance with professional expertise and affordable services.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Startup Kit */}
      <section className="py-12 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Rocket className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">🎉 Special Startup Kit Offer</h2>
            <p className="text-xl mb-6">Complete Legal Documentation Package for Startups</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto">
              <p className="text-2xl font-bold mb-2">Only ₹1,499</p>
              <p className="mb-4">8 Essential Legal Documents + Compliance Guidance</p>
              <Link to="/payment?purpose=Startup%20Kit" className="inline-block bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-orange-50 transition-all duration-300">
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 group hover:border-black transform hover:-translate-y-2 ${service.featured ? 'border-orange-500' : service.popular ? 'border-black' : 'border-gray-200'}`}>
                {service.featured && (
                  <div className="bg-orange-500 text-white text-center py-2 font-semibold">
                    🔥 SPECIAL OFFER
                  </div>
                )}
                {service.popular && (
                  <div className="bg-purple-500 text-white text-center py-2 font-semibold">
                    ⭐ MOST POPULAR
                  </div>
                )}

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

                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Starting Price</p>
                        <p className={`text-lg font-black ${service.featured ? 'text-orange-600' : 'text-black'}`}>
                          {service.price}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 font-medium">Duration</p>
                        <p className="text-sm font-bold text-gray-900">{service.duration}</p>
                      </div>
                    </div>

                    <Link
                      to={`/payment?purpose=${encodeURIComponent(service.title)}${extractAmount(service.price) ? `&amount=${extractAmount(service.price)}` : ''}`}
                      className={`w-full py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center transform hover:scale-105 group/btn ${service.featured ? 'bg-orange-600 hover:bg-orange-700 text-white' : 'bg-black hover:bg-gray-800 text-white'}`}>
                      <Phone className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      {service.featured ? 'Pay for Offer' : 'Pay & Consult'}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Business Services</h2>
            <p className="text-lg text-gray-600">Complete range of business compliance and registration services</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-black font-black">{service.price}</span>
                  <Link
                    to={`/payment?purpose=${encodeURIComponent(service.title)}${extractAmount(service.price) ? `&amount=${extractAmount(service.price)}` : ''}`}
                    className="text-black hover:text-gray-600 font-bold text-sm">
                    Pay Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Business Services?</h2>
            <p className="text-lg text-gray-600">Professional expertise with personalized service</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-black transition-all duration-300">
                  <benefit.icon className="h-8 w-8 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Start Your Business Journey?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Get professional business setup and compliance services from our expert team
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+919454950104"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call for Consultation
            </a>
            <Link to="/payment?purpose=Startup%20Kit" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center transform hover:scale-105">
              Pay Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}