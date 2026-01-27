
import {
  Globe,
  Plane,
  FileCheck,
  Shield,
  Users,
  CheckCircle,
  Phone,
  MapPin,
  Star,
  Award,
  Clock
} from 'lucide-react';

export default function GulfJobsVisa() {
  const services = [
    {
      icon: Users,
      title: 'Job Placement in Gulf Countries',
      description: 'Complete job placement services for UAE, Saudi Arabia, Qatar, Oman, Bahrain, and Kuwait.',
      details: [
        'Job matching based on skills and experience',
        'CV preparation and optimization',
        'Interview preparation and coaching',
        'Salary negotiation assistance',
        'Contract review and guidance',
        'Company background verification',
        'Job offer letter assistance',
        'Employment visa coordination'
      ],
      countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Oman', 'Bahrain', 'Kuwait']
    },
    {
      icon: FileCheck,
      title: 'Visa Document Verification',
      description: 'Comprehensive document verification and authentication services for Gulf visas.',
      details: [
        'Educational certificate verification',
        'Experience certificate authentication',
        'Medical certificate validation',
        'Police clearance certificate',
        'Passport verification and renewal',
        'Birth certificate attestation',
        'Marriage certificate verification',
        'No objection certificate (NOC)'
      ],
      processing: '7-15 days'
    },
    {
      icon: Shield,
      title: 'Document Authentication Services',
      description: 'Official document attestation and apostille services for international use.',
      details: [
        'MEA (Ministry of External Affairs) attestation',
        'Embassy attestation services',
        'Apostille certification',
        'Chamber of Commerce attestation',
        'HRD (Human Resource Development) attestation',
        'Home department attestation',
        'Notary attestation',
        'Translation and certification'
      ],
      price: 'Starting from ₹1,500 per document'
    },
    {
      icon: CheckCircle,
      title: 'Visa Cross-Checking Service',
      description: 'Verify visa authenticity and job offer legitimacy to prevent fraud.',
      details: [
        'Visa number verification',
        'Sponsor company verification',
        'Job offer authenticity check',
        'Salary and benefits verification',
        'Contract terms validation',
        'Embassy database cross-check',
        'Fraud prevention consultation',
        'Legal compliance verification'
      ],
      turnaround: '2-5 working days'
    },
    {
      icon: Plane,
      title: 'Post-Placement Support',
      description: 'Comprehensive support services after successful job placement abroad.',
      details: [
        'Airport assistance and guidance',
        'Accommodation support information',
        'Banking and financial setup guidance',
        'Family visa processing assistance',
        'Emergency contact and support',
        'Regular check-in and follow-up',
        'Grievance handling and resolution',
        'Career advancement guidance'
      ],
      availability: '24/7 support'
    },
    {
      icon: Award,
      title: 'Pre-Departure Orientation',
      description: 'Essential preparation and orientation before traveling to Gulf countries.',
      details: [
        'Country-specific cultural orientation',
        'Legal rights and responsibilities',
        'Banking and financial planning',
        'Healthcare and insurance guidance',
        'Communication and language tips',
        'Workplace etiquette and norms',
        'Emergency procedures and contacts',
        'Repatriation and return planning'
      ],
      duration: '2-day comprehensive program'
    }
  ];

  const countries = [
    {
      name: 'United Arab Emirates',
      flag: '🇦🇪',
      popular: true,
      sectors: ['Construction', 'Healthcare', 'IT', 'Hospitality', 'Engineering']
    },
    {
      name: 'Saudi Arabia',
      flag: '🇸🇦',
      popular: true,
      sectors: ['Healthcare', 'Engineering', 'Education', 'Construction', 'Oil & Gas']
    },
    {
      name: 'Qatar',
      flag: '🇶🇦',
      popular: true,
      sectors: ['Construction', 'Engineering', 'Healthcare', 'Aviation', 'Hospitality']
    },
    {
      name: 'Oman',
      flag: '🇴🇲',
      popular: false,
      sectors: ['Healthcare', 'Education', 'Engineering', 'Banking', 'Tourism']
    },
    {
      name: 'Bahrain',
      flag: '🇧🇭',
      popular: false,
      sectors: ['Banking', 'Healthcare', 'IT', 'Construction', 'Manufacturing']
    },
    {
      name: 'Kuwait',
      flag: '🇰🇼',
      popular: false,
      sectors: ['Healthcare', 'Education', 'Engineering', 'Oil & Gas', 'Construction']
    }
  ];

  const stats = [
    { number: '2000+', label: 'Successful Placements', icon: Users },
    { number: '6', label: 'Gulf Countries', icon: MapPin },
    { number: '98%', label: 'Success Rate', icon: Star },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 md:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Globe className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-fade-in">Gulf Jobs & Visa Support</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 animate-fade-in-delay">खाड़ी नौकरी और वीज़ा सहायता केंद्र</p>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto mb-6 leading-relaxed animate-slide-up">
              Your Trusted Gateway to the Gulf - Complete job placement and visa services for Gulf countries
              with verified opportunities and comprehensive support throughout your journey.
            </p>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 max-w-2xl mx-auto border border-gray-700">
              <p className="text-lg font-semibold">🎯 Specializing in UAE, Saudi Arabia, Qatar, Oman, Bahrain & Kuwait</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-teal-100 rounded-full">
                    <stat.icon className="h-6 w-6 text-teal-600" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gulf Countries We Serve</h2>
            <p className="text-lg text-gray-600">Job opportunities across all major Gulf nations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countries.map((country, index) => (
              <div key={index} className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${country.popular ? 'border-teal-500' : 'border-gray-200'}`}>
                {country.popular && (
                  <div className="bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-3">
                    ⭐ POPULAR
                  </div>
                )}
                <div className="flex items-center mb-4">
                  <span className="text-4xl mr-3">{country.flag}</span>
                  <h3 className="text-lg font-bold text-gray-900">{country.name}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700 mb-2">Popular Sectors:</p>
                  {country.sectors.map((sector, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-3 w-3 text-teal-500 mr-2" />
                      {sector}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Comprehensive Services</h2>
            <p className="text-lg text-gray-600">End-to-end support for your Gulf employment journey</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-200 group hover:border-black transform hover:-translate-y-2 p-6">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gray-100 rounded-xl mr-4 group-hover:bg-black transition-all duration-300">
                    <service.icon className="h-8 w-8 text-black group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-black text-black">{service.title}</h3>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>

                <div className="space-y-2 mb-4">
                  {service.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-black mr-2 mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>

                {service.countries && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.countries.map((country, idx) => (
                      <span key={idx} className="bg-gray-100 text-black px-3 py-1 rounded-full text-xs font-bold border border-gray-200">
                        {country}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    {service.price && <span className="font-black text-black">{service.price}</span>}
                    {service.processing && <span>Processing: {service.processing}</span>}
                    {service.turnaround && <span>Turnaround: {service.turnaround}</span>}
                    {service.availability && <span className="font-black text-black">{service.availability}</span>}
                    {service.duration && <span>Duration: {service.duration}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600">Simple steps to your Gulf career</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: '1', title: 'Registration', desc: 'Submit your profile and documents' },
              { step: '2', title: 'Job Matching', desc: 'We find suitable job opportunities' },
              { step: '3', title: 'Documentation', desc: 'Complete visa documentation process' },
              { step: '4', title: 'Placement', desc: 'Job confirmation and visa approval' },
              { step: '5', title: 'Departure', desc: 'Pre-departure orientation and travel' }
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

      {/* CTA Section */}
      <section className="py-16 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Start Your Gulf Career?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Join thousands of successful professionals who found their dream jobs in Gulf countries through our services
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a
              href="tel:+919454950104"
              className="bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call: +91-9454950104
            </a>
            <a
              href="https://wa.me/919454950104"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center transform hover:scale-105"
            >
              WhatsApp Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}