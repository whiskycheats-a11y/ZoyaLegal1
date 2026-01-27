
import { Link } from 'react-router-dom';
import {
  Building2,
  Heart,
  GraduationCap,
  CreditCard,
  Vote,
  FileText,
  Languages,
  Users,
  CheckCircle,
  Phone,
  Smartphone,
  Shield
} from 'lucide-react';

export default function CSCServices() {
  const services = [
    {
      icon: Heart,
      title: 'Welfare Schemes',
      hindi: 'कल्याणकारी योजनाएं',
      description: 'Government welfare scheme applications and assistance for eligible beneficiaries.',
      details: [
        'PM Awas Yojana (प्रधानमंत्री आवास योजना)',
        'E-Shram Card registration and benefits',
        'Jan Dhan Account opening',
        'Pension scheme enrollment',
        'Ayushman Bharat card registration',
        'PM Kisan Samman Nidhi',
        'Pradhan Mantri Ujjwala Yojana',
        'Sukanya Samriddhi Yojana'
      ],
      price: 'Starting from ₹50',
      duration: '1-7 days'
    },
    {
      icon: Vote,
      title: 'Election Services',
      hindi: 'चुनाव सेवाएं',
      description: 'Voter ID card services including new registration, corrections, and updates.',
      details: [
        'New Voter ID card application',
        'Voter ID correction and updates',
        'Address change in voter list',
        'Photo replacement in voter ID',
        'Name correction in electoral roll',
        'Duplicate voter ID issuance',
        'Voter slip download and printing',
        'Election-related information services'
      ],
      price: 'Starting from ₹25',
      duration: '15-30 days'
    },
    {
      icon: GraduationCap,
      title: 'Education Services',
      hindi: 'शिक्षा सेवाएं',
      description: 'Educational support including admissions, scholarships, and certification services.',
      details: [
        'School and college admission assistance',
        'Scholarship application support',
        'Educational certificate verification',
        'Digital India e-learning portal',
        'Skill development program enrollment',
        'Online course registration',
        'Educational loan application support',
        'Distance learning program assistance'
      ],
      price: 'Starting from ₹100',
      duration: '1-15 days'
    },
    {
      icon: CreditCard,
      title: 'Banking Services',
      hindi: 'बैंकिंग सेवाएं',
      description: 'Complete banking assistance including UPI, wallet services, and bill payments.',
      details: [
        'Bank account opening assistance',
        'UPI registration and setup',
        'Digital wallet services',
        'Bill payment (electricity, water, gas)',
        'Mobile and DTH recharge',
        'Money transfer services',
        'Bank statement printing',
        'Cheque book request processing'
      ],
      price: 'Starting from ₹10',
      duration: 'Instant to 3 days'
    },
    {
      icon: Shield,
      title: 'Insurance Services',
      hindi: 'बीमा सेवाएं',
      description: 'Insurance-related services including Ayushman Bharat and claim assistance.',
      details: [
        'Ayushman Bharat card application',
        'Health insurance enrollment',
        'Life insurance policy assistance',
        'Crop insurance registration',
        'Vehicle insurance services',
        'Insurance claim filing support',
        'Policy renewal assistance',
        'Insurance premium payment'
      ],
      price: 'Starting from ₹50',
      duration: '1-7 days'
    },
    {
      icon: FileText,
      title: 'PAN & Aadhaar Services',
      hindi: 'पैन और आधार सेवाएं',
      description: 'PAN card and Aadhaar card services including new applications and updates.',
      details: [
        'New PAN card application',
        'PAN card correction and reprint',
        'Aadhaar card new enrollment',
        'Aadhaar update services',
        'Aadhaar-PAN linking',
        'Mobile number update in Aadhaar',
        'Address change in PAN/Aadhaar',
        'Biometric authentication services'
      ],
      price: 'Starting from ₹105',
      duration: '15-30 days'
    },
    {
      icon: Languages,
      title: 'Translation Services',
      hindi: 'अनुवाद सेवाएं',
      description: 'Professional document translation services between Hindi and English.',
      details: [
        'Hindi to English document translation',
        'English to Hindi document translation',
        'Legal document translation',
        'Educational certificate translation',
        'Government document translation',
        'Medical report translation',
        'Technical document translation',
        'Certified translation services'
      ],
      price: 'Starting from ₹50 per page',
      duration: '1-3 days'
    },
    {
      icon: Users,
      title: 'Women & Child CSC',
      hindi: 'महिला और बाल सेवाएं',
      description: 'Specialized services for women and children including certificates and assistance.',
      details: [
        'Birth certificate application',
        'Death certificate application',
        'Marriage certificate registration',
        'Women-specific scheme enrollment',
        'Child welfare scheme assistance',
        'Maternity benefit applications',
        'Widow pension applications',
        'Girl child education support'
      ],
      price: 'Starting from ₹30',
      duration: '7-15 days'
    },
    {
      icon: Smartphone,
      title: 'Utility Hub',
      hindi: 'उपयोगिता केंद्र',
      description: 'Daily utility services including mobile recharge, FASTag, and digital payments.',
      details: [
        'Mobile prepaid and postpaid recharge',
        'DTH and cable TV recharge',
        'FASTag purchase and recharge',
        'Electricity bill payment',
        'Water bill payment',
        'Gas cylinder booking',
        'Internet bill payment',
        'Municipal tax payment'
      ],
      price: 'Commission-based',
      duration: 'Instant'
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: 'Government Authorized',
      description: 'Official CSC center authorized by Government of India'
    },
    {
      icon: Shield,
      title: 'Secure Services',
      description: 'All transactions are secure and government-verified'
    },
    {
      icon: Phone,
      title: 'Digital Support',
      description: 'Complete digital assistance for rural and urban citizens'
    },
    {
      icon: Users,
      title: 'Community Service',
      description: 'Serving the community with transparent and reliable services'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-20 md:py-24 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <Building2 className="h-16 w-16 md:h-20 md:w-20 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight animate-fade-in">CSC Services</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-4 animate-fade-in-delay">कॉमन सर्विस सेंटर सेवाएं</p>
            <p className="text-lg md:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              Government-authorized Common Service Center providing digital services to citizens across India.
              From welfare schemes to banking services, we bridge the digital divide with reliable solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6 bg-indigo-50 rounded-xl">
                <div className="p-3 bg-indigo-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
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
                      className="w-full bg-black text-white py-3 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 flex items-center justify-center transform hover:scale-105 group/btn">
                      <Phone className="h-4 w-4 mr-2 group-hover/btn:rotate-12 transition-transform" />
                      Pay & Apply
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How CSC Services Work</h2>
            <p className="text-lg text-gray-600">Simple steps to access government services digitally</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group hover:bg-black transition-colors duration-300">
                <span className="text-2xl font-black text-black group-hover:text-white transition-colors">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Our Center</h3>
              <p className="text-gray-600 text-sm">Come to our authorized CSC center with required documents</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group hover:bg-black transition-colors duration-300">
                <span className="text-2xl font-black text-black group-hover:text-white transition-colors">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Document Verification</h3>
              <p className="text-gray-600 text-sm">Our team verifies your documents and eligibility</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group hover:bg-black transition-colors duration-300">
                <span className="text-2xl font-black text-black group-hover:text-white transition-colors">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Application Processing</h3>
              <p className="text-gray-600 text-sm">We process your application through government portals</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 group hover:bg-black transition-colors duration-300">
                <span className="text-2xl font-black text-black group-hover:text-white transition-colors">4</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Service Delivery</h3>
              <p className="text-gray-600 text-sm">Receive your documents or confirmation as per timeline</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Ready to Access Government Services?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Visit our CSC center today for reliable, transparent, and efficient government service delivery
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
              WhatsApp for Details
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}