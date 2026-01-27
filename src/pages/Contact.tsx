import { } from 'react';

declare global {
  interface Window {
    emailjs?: any;
  }
}
import {
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  Mail,
  Navigation,
  Users,
  Shield,
  CheckCircle
} from 'lucide-react';

export default function Contact() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: [
        'Guru Govind Singh Marg',
        'Safdalbagh, Lalkua',
        'Lucknow, UP-226001'
      ],
      action: 'Get Directions',
      link: 'https://www.google.com/maps?q=Guru+Govind+Singh+Marg,+Safdalbagh,+Lalkua,+Lucknow,+UP-226001'
    },
    {
      icon: Phone,
      title: 'Phone Number',
      details: ['+91-9454950104'],
      action: 'Call Now',
      link: 'tel:+919454950104'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: ['Direct chat available', 'Quick responses'],
      action: 'Chat Now',
      link: 'https://wa.me/919454950104'
    },
    {
      icon: Clock,
      title: 'Office Hours',
      details: [
        'Mon - Sat: 9:00 AM - 6:00 PM',
        'Sunday: Emergency Only'
      ],
      action: 'View Schedule',
      link: 'https://wa.me/919454950104?text=Hello%20ZoyaLegal%2C%20I%20would%20like%20to%20book%20an%20appointment.%20Please%20share%20available%20slots.'
    }
    ,
    {
      icon: Mail,
      title: 'Email',
      details: ['zoyalegal@gmail.com'],
      action: 'Send Email',
      link: 'mailto:zoyalegal@gmail.com'
    },
    {
      icon: CheckCircle,
      title: 'Business Registrations',
      details: [
        'GST: 09AUQPK9451K1ZS',
        'Shop Establishment: UPSA28767150',
        'MSME: UDYAM-UP75-0000942',
        'CSC ID: 5546115014',
        'IRCTC: IVIADR04356'
      ]
    }
  ];

  const services = [
    'Legal Services & Consultancy',
    'CSC Government Services',
    'Business Registration & Support',
    'Digital Marketing & Web Development',
    'Gulf Jobs & Visa Services',
    'Travel & Transport Services',
    'Loan Recovery & Dispute Resolution',
    'Medical Legal Assistance',
    'Special Community Campaigns'
  ];

  const officeFeatures = [
    {
      icon: Shield,
      title: 'Secure Environment',
      description: 'Safe and confidential consultation space'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Qualified professionals ready to assist'
    },
    {
      icon: CheckCircle,
      title: 'All Services',
      description: 'Complete range of legal and CSC services'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Extended hours and emergency support'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-black text-white py-16 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <MapPin className="h-16 w-16 mx-auto mb-6 animate-bounce" />
            <h1 className="text-4xl md:text-5xl font-black mb-4 animate-fade-in">Contact Us</h1>
            <p className="text-xl text-gray-400 mb-2 animate-fade-in-delay">संपर्क करें</p>
            <p className="text-lg text-gray-500 max-w-3xl mx-auto animate-slide-up">
              Visit our office in Lucknow or contact us for professional legal and CSC services.
              We're here to help with all your legal, business, and government service needs.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className={`text-center p-6 bg-white rounded-xl hover:shadow-xl border border-gray-200 hover:border-black transition-all duration-300 min-h-[260px] flex flex-col transform hover:-translate-y-1 ${info.title === 'Email'
                    ? 'lg:col-start-2'
                    : info.title === 'Business Registrations'
                      ? 'lg:col-start-3'
                      : ''
                  }`}
              >
                <div className="p-4 bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <info.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
                {info.link ? (
                  <a
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-black hover:text-gray-700 font-bold text-sm mt-auto group/link"
                  >
                    {info.action || 'Open'}
                    <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                  </a>
                ) : (
                  info.action ? (
                    <span className="text-gray-400 font-medium text-sm cursor-not-allowed mt-auto">
                      {info.action}
                    </span>
                  ) : null
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map and Office Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-16 w-16 text-black mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Office Location</h3>
                  <p className="text-gray-600 mb-4">
                    Guru Govind Singh Marg, Safdalbagh, Lalkua<br />
                    Lucknow, UP-226001
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Guru+Govind+Singh+Marg,+Safdalbagh,+Lalkua,+Lucknow,+UP-226001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                  >
                    Open in Maps
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Office</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our office is conveniently located in Lucknow with easy access to public transportation.
                  We provide a comfortable and professional environment for all consultations.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {officeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <feature.icon className="h-5 w-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Available</h3>
                <div className="space-y-2">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="h-4 w-4 text-black mr-3 flex-shrink-0" />
                      {service}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Send Us a Message</h2>
            <p className="text-lg text-gray-600">
              Have a question or need assistance? Fill out the form below and we'll get back to you promptly.
            </p>
            {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('sent') === '1' && (
              <div className="mt-4 inline-block bg-gray-100 text-black px-4 py-2 rounded-lg text-sm font-bold">
                Your message was sent successfully.
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget as HTMLFormElement;
                const data = new FormData(form);
                const name = String(data.get('name') || '');
                const phone = String(data.get('phone') || '');
                const email = String(data.get('email') || '');
                const service = String(data.get('service') || '');
                const message = String(data.get('message') || '');
                const lines = [
                  `New contact enquiry from ZoyaLegal website`,
                  ``,
                  `Name: ${name}`,
                  `Phone: ${phone}`,
                  `Email: ${email}`,
                  `Service: ${service}`,
                  ``,
                  `Message:`,
                  `${message}`
                ];
                const text = encodeURIComponent(lines.join('\n'));
                const waNumber = '919454950104';
                const url = `https://wa.me/${waNumber}?text=${text}`;
                window.open(url, '_blank');
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Required *
                </label>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                >
                  <option value="">Select a service</option>
                  <option value="legal">Legal Services</option>
                  <option value="csc">CSC Services</option>
                  <option value="business">Business Support</option>
                  <option value="digital">Digital Services</option>
                  <option value="gulf">Gulf Jobs & Visa</option>
                  <option value="travel">Travel & Transport</option>
                  <option value="recovery">Loan Recovery</option>
                  <option value="medical">Medical Help</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all duration-300"
                  placeholder="Describe your requirements or questions..."
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Quick Contact */}
      <section className="py-16 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black mb-4">Need Immediate Assistance?</h2>
            <p className="text-xl text-gray-400">
              Contact us directly for urgent matters or emergency legal support
            </p>
          </div>

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
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp Chat
            </a>
            <a href="mailto:zoyalegal@gmail.com" className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center transform hover:scale-105">
              <Mail className="h-5 w-5 mr-2" />
              Email Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

