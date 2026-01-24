import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Plane, 
  Train, 
  Car, 
  CreditCard,
  CheckCircle,
  Phone,
  Clock,
  MapPin
} from 'lucide-react';

export default function TravelTransport() {
  const services = [
    {
      icon: Train,
      title: 'IRCTC Services',
      hindi: 'रेल सेवाएं',
      description: 'Complete railway booking and related services through official IRCTC portal.',
      details: [
        'Train ticket booking and confirmation',
        'Tatkal ticket booking service',
        'Group booking for families/organizations',
        'Train seat availability checking',
        'Train PNR status checking',
        'Train ticket cancellation and refunds',
        'Railway reservation chart checking',
        'Senior citizen and disabled quotas'
      ],
      price: 'Service charge: ₹20-50 per ticket',
      features: ['Instant confirmation', '24/7 booking', 'All train routes', 'Multiple payment options']
    },
    {
      icon: Plane,
      title: 'Flight Booking',
      hindi: 'हवाई यात्रा बुकिंग',
      description: 'Domestic and international flight booking with best prices and deals.',
      details: [
        'Domestic flight booking all airlines',
        'International flight reservations',
        'Flight status and schedule checking',
        'Seat selection and meal preferences',
        'Flight cancellation and modifications',
        'Travel insurance booking',
        'Baggage allowance information',
        'Airport transfer arrangements'
      ],
      price: 'Competitive rates + service fee',
      features: ['Best prices', 'All airlines', 'Instant booking', '24/7 support']
    },
    {
      icon: MapPin,
      title: 'Hotel Booking',
      hindi: 'होटल बुकिंग',
      description: 'Hotel and accommodation booking services across India and internationally.',
      details: [
        'Budget to luxury hotel bookings',
        'Guest house and lodge reservations',
        'Resort and vacation rentals',
        'Room type and amenity selection',
        'Group booking discounts',
        'Hotel cancellation and modifications',
        'Local sightseeing arrangements',
        'Special occasion bookings'
      ],
      price: 'Starting from ₹500 per night',
      features: ['Wide selection', 'Best rates', 'Instant confirmation', 'Flexible cancellation']
    },
    {
      icon: Car,
      title: 'Driving License Services',
      hindi: 'ड्राइविंग लाइसेंस',
      description: 'Complete driving license services including new applications and renewals.',
      details: [
        'New driving license application',
        'Driving license renewal',
        'Duplicate driving license issuance',
        'License address change',
        'International driving permit',
        'Driving test slot booking',
        'License category addition',
        'Driving license verification'
      ],
      price: 'Starting from ₹200',
      features: ['All states covered', 'Document assistance', 'Status tracking', 'Expert guidance']
    },
    {
      icon: Car,
      title: 'Vehicle Registration',
      hindi: 'वाहन पंजीकरण',
      description: 'Vehicle registration and RC-related services for all types of vehicles.',
      details: [
        'New vehicle registration',
        'RC book renewal services',
        'Vehicle ownership transfer',
        'Duplicate RC issuance',
        'Vehicle address change',
        'Hypothecation addition/removal',
        'NOC for vehicle transfer',
        'Vehicle fitness certificate'
      ],
      price: 'Starting from ₹500',
      features: ['All vehicle types', 'Online processing', 'Door-to-door service', 'Expert assistance']
    },
    {
      icon: CreditCard,
      title: 'Vehicle Insurance',
      hindi: 'वाहन बीमा',
      description: 'Motor insurance services including policy purchase and claim assistance.',
      details: [
        'Two-wheeler insurance policies',
        'Four-wheeler comprehensive insurance',
        'Commercial vehicle insurance',
        'Third-party insurance compliance',
        'Insurance policy renewal',
        'Claim filing and processing',
        'No-claim bonus verification',
        'Insurance comparison and selection'
      ],
      price: 'As per vehicle and coverage',
      features: ['All insurers', 'Competitive rates', 'Claim support', 'Quick processing']
    },
    {
      icon: CreditCard,
      title: 'Transport Department Taxes',
      hindi: 'परिवहन विभाग कर',
      description: 'Motor vehicle tax payment and transport department compliance services.',
      details: [
        'Vehicle road tax payment',
        'Quarterly tax payments',
        'Annual tax renewals',
        'Tax penalty clearance',
        'Green tax for old vehicles',
        'Commercial vehicle permits',
        'Transport department challan payment',
        'Tax certificate downloads'
      ],
      price: 'Actual tax + service fee',
      features: ['Online payment', 'All states', 'Instant receipts', 'Penalty management']
    },
    {
      icon: MapPin,
      title: 'Cab & Taxi Services',
      hindi: 'कैब और टैक्सी सेवाएं',
      description: 'Local and outstation cab booking services with reliable drivers.',
      details: [
        'Local city rides and tours',
        'Outstation cab bookings',
        'Airport pickup and drop',
        'Wedding and event transportation',
        'Corporate travel solutions',
        'Multi-city tour packages',
        'Driver and vehicle verification',
        '24/7 customer support'
      ],
      price: 'Competitive market rates',
      features: ['Verified drivers', 'Clean vehicles', 'GPS tracking', '24/7 availability']
    }
  ];

  const quickServices = [
    { name: 'IRCTC Account Creation', price: '₹100', time: '1 day' },
    { name: 'Tatkal Booking Service', price: '₹50', time: 'Real-time' },
    { name: 'Flight Price Alerts', price: '₹25', time: 'Ongoing' },
    { name: 'DL Slot Booking', price: '₹150', time: '2-3 days' },
    { name: 'RC Status Check', price: '₹20', time: 'Instant' },
    { name: 'Insurance Renewal', price: '₹100', time: '1 day' },
    { name: 'Challan Payment', price: '₹30', time: 'Instant' },
    { name: 'Hotel Comparison', price: 'Free', time: 'Instant' }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Plane className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel & Transport Support</h1>
            <p className="text-xl text-indigo-100 mb-2">यात्रा और परिवहन सेवाएं</p>
            <p className="text-lg text-indigo-200 max-w-3xl mx-auto">
              Complete travel and transport solutions including flight bookings, IRCTC services, 
              driving license, vehicle registration, and all transport department services under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Services Bar */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">Quick Services</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {quickServices.map((service, index) => (
              <div key={index} className="text-center p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                <p className="text-sm font-medium text-gray-900 mb-1">{service.name}</p>
                <p className="text-xs text-indigo-600 font-semibold">{service.price}</p>
                <p className="text-xs text-gray-500">{service.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-indigo-100 rounded-xl mr-4">
                      <service.icon className="h-8 w-8 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                      <p className="text-sm text-indigo-600 font-medium">{service.hindi}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-indigo-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Features:</p>
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, idx) => (
                        <span key={idx} className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Pricing</p>
                        <p className="text-lg font-bold text-indigo-600">{service.price}</p>
                      </div>
                      <Link 
                        to={`/payment?purpose=${encodeURIComponent(service.title)}${service.price ? `&amount=${service.price.replace(/[^0-9]/g,'')}` : ''}`}
                        className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200 flex items-center">
                        <Phone className="h-4 w-4 mr-2" />
                        Pay & Book
                      </Link>
                    </div>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Services Work</h2>
            <p className="text-lg text-gray-600">Simple process for all your travel and transport needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">Call or visit our center with your requirements</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Provide Details</h3>
              <p className="text-gray-600 text-sm">Share your travel details or document requirements</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing</h3>
              <p className="text-gray-600 text-sm">We process your request through official channels</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-indigo-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">Receive your tickets, documents, or confirmations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Travel Services?</h2>
            <p className="text-lg text-gray-600">Reliable, convenient, and affordable travel solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Processing</h3>
              <p className="text-gray-600 text-sm">Fast and efficient service for all travel needs</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Verified Services</h3>
              <p className="text-gray-600 text-sm">All bookings through official and verified channels</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock assistance for travel emergencies</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Payments</h3>
              <p className="text-gray-600 text-sm">Safe and secure payment processing for all transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Plan Your Next Journey With Us</h2>
          <p className="text-xl text-indigo-100 mb-8">
            From flight bookings to driving licenses, we handle all your travel and transport needs
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="tel:+919454950104" 
              className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold hover:bg-indigo-50 transition-all duration-300 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call: +91-9454950104
            </a>
            <a 
              href="https://wa.me/919454950104" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-indigo-600 transition-all duration-300"
            >
              WhatsApp for Booking
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}