import React from 'react';
import { 
  Megaphone, 
  Shield, 
  Rocket, 
  Users,
  CheckCircle,
  Phone,
  Calendar,
  Gift,
  Star,
  Clock
} from 'lucide-react';

export default function SpecialCampaigns() {
  const extractAmount = (text: string | undefined): string | undefined => {
    if (!text) return undefined;
    const digits = text.replace(/[^0-9]/g, '');
    if (!digits) return undefined;
    return String(parseInt(digits, 10));
  };
  const campaigns = [
    {
      icon: Shield,
      title: 'Cyber Suraksha Week',
      hindi: 'साइबर सुरक्षा सप्ताह',
      description: 'Free cyber security consultation and FIR assistance for cyber crime victims.',
      duration: 'Every Month - First Week',
      offer: 'Completely Free',
      details: [
        'Free cyber crime consultation',
        'Online fraud FIR filing assistance',
        'Social media harassment support',
        'Digital evidence preservation guidance',
        'Cyber law awareness sessions',
        'Free legal advice for cyber victims',
        'Police station assistance',
        'Follow-up support for cases'
      ],
      benefits: [
        'No consultation fees',
        'Expert cyber law guidance',
        'Police liaison support',
        'Documentation assistance'
      ],
      eligibility: 'All cyber crime victims',
      status: 'Active Campaign'
    },
    {
      icon: Rocket,
      title: 'Startup Seva Month',
      hindi: 'स्टार्टअप सेवा माह',
      description: 'Complete legal documentation package for startups at special discounted rates.',
      duration: 'Every Quarter',
      offer: '₹1,499 (Regular: ₹5,000)',
      details: [
        'Business registration guidance',
        'Partnership agreement drafting',
        'Employment contract templates',
        'Non-disclosure agreements (NDA)',
        'Terms and conditions preparation',
        'Privacy policy drafting',
        'Intellectual property consultation',
        'Compliance checklist and guidance'
      ],
      benefits: [
        '70% discount on legal kit',
        'Free business consultation',
        'Ongoing legal support',
        'Digital document delivery'
      ],
      eligibility: 'New startups and entrepreneurs',
      status: 'Limited Time Offer'
    },
    {
      icon: Users,
      title: 'Senior Citizen Will Week',
      hindi: 'वरिष्ठ नागरिक वसीयत सप्ताह',
      description: 'Free will drafting services for senior citizens to secure their family\'s future.',
      duration: 'Twice a Year',
      offer: 'Free Will Drafting',
      details: [
        'Free will and testament drafting',
        'Property succession planning',
        'Legal heir documentation',
        'Asset distribution guidance',
        'Witness arrangement',
        'Registration assistance',
        'Family consultation sessions',
        'Estate planning advice'
      ],
      benefits: [
        'Completely free service',
        'Expert legal guidance',
        'Family peace of mind',
        'Proper documentation'
      ],
      eligibility: 'Citizens above 60 years',
      status: 'Seasonal Campaign'
    },
    {
      icon: Gift,
      title: 'Women Empowerment Legal Aid',
      hindi: 'महिला सशक्तिकरण कानूनी सहायता',
      description: 'Special legal support and consultation for women facing legal challenges.',
      duration: 'International Women\'s Day Week',
      offer: '50% Discount on All Services',
      details: [
        'Domestic violence case support',
        'Divorce and maintenance guidance',
        'Property rights consultation',
        'Workplace harassment cases',
        'Child custody assistance',
        'Women-specific legal rights education',
        'Free legal consultation',
        'Court representation support'
      ],
      benefits: [
        'Half-price legal services',
        'Female legal counselors',
        'Confidential consultations',
        'Emotional support'
      ],
      eligibility: 'All women seeking legal help',
      status: 'Annual Campaign'
    },
    {
      icon: Star,
      title: 'Student Legal Awareness Program',
      hindi: 'छात्र कानूनी जागरूकता कार्यक्रम',
      description: 'Free legal education and awareness sessions for students and young professionals.',
      duration: 'During Academic Year',
      offer: 'Free Workshops & Internships',
      details: [
        'Legal awareness workshops',
        'Career guidance in law',
        'Internship opportunities',
        'Legal research projects',
        'Court visit programs',
        'Practical legal training',
        'Certificate courses',
        'Mentorship programs'
      ],
      benefits: [
        'Free legal education',
        'Practical experience',
        'Career guidance',
        'Networking opportunities'
      ],
      eligibility: 'Students and young professionals',
      status: 'Ongoing Program'
    },
    {
      icon: Calendar,
      title: 'Free Legal Consultation Days',
      hindi: 'निःशुल्क कानूनी परामर्श दिवस',
      description: 'Monthly free legal consultation days for economically weaker sections.',
      duration: 'Every Month - Last Saturday',
      offer: 'Free Legal Consultation',
      details: [
        'Free 30-minute consultation',
        'Legal advice on various matters',
        'Document review services',
        'Case assessment and guidance',
        'Referral to appropriate authorities',
        'Legal aid scheme information',
        'Pro bono case selection',
        'Community legal support'
      ],
      benefits: [
        'No consultation fees',
        'Expert legal advice',
        'Community service',
        'Accessible legal help'
      ],
      eligibility: 'Economically weaker sections',
      status: 'Monthly Initiative'
    }
  ];

  const upcomingEvents = [
    {
      date: 'March 1-7, 2025',
      event: 'Cyber Suraksha Week',
      description: 'Free cyber crime consultation and support',
      registration: 'Open'
    },
    {
      date: 'March 8-15, 2025',
      event: 'Women Empowerment Legal Aid',
      description: '50% discount on all legal services for women',
      registration: 'Open'
    },
    {
      date: 'April 1-30, 2025',
      event: 'Startup Seva Month',
      description: 'Special startup legal kit at ₹1,499',
      registration: 'Opening Soon'
    },
    {
      date: 'Last Saturday Every Month',
      event: 'Free Legal Consultation Day',
      description: 'Free consultation for economically weaker sections',
      registration: 'Walk-in'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Megaphone className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Special Campaigns</h1>
            <p className="text-xl text-orange-100 mb-2">विशेष अभियान और सामुदायिक सेवाएं</p>
            <p className="text-lg text-orange-200 max-w-3xl mx-auto">
              Community-focused initiatives providing free and discounted legal services to support 
              different sections of society with special campaigns throughout the year.
            </p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Upcoming Events & Campaigns</h2>
            <p className="text-gray-600">Don't miss these special opportunities</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-6 border border-orange-200">
                <div className="flex items-center mb-3">
                  <Calendar className="h-5 w-5 text-orange-600 mr-2" />
                  <span className="text-sm font-medium text-orange-600">{event.date}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{event.event}</h3>
                <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                    event.registration === 'Open' ? 'bg-green-100 text-green-700' :
                    event.registration === 'Opening Soon' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {event.registration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Special Campaigns</h2>
            <p className="text-lg text-gray-600">Community service initiatives for social welfare</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {campaigns.map((campaign, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-orange-100 rounded-xl mr-4">
                      <campaign.icon className="h-8 w-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{campaign.title}</h3>
                      <p className="text-sm text-orange-600 font-medium">{campaign.hindi}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{campaign.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Duration</p>
                      <p className="text-sm font-semibold text-gray-900">{campaign.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Special Offer</p>
                      <p className="text-sm font-semibold text-orange-600">{campaign.offer}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Services Included:</p>
                    <div className="space-y-1">
                      {campaign.details.slice(0, 4).map((detail, idx) => (
                        <div key={idx} className="flex items-start text-xs text-gray-600">
                          <CheckCircle className="h-3 w-3 text-orange-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">Key Benefits:</p>
                    <div className="flex flex-wrap gap-2">
                      {campaign.benefits.map((benefit, idx) => (
                        <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-xs text-gray-500">Eligibility</p>
                        <p className="text-sm font-semibold text-gray-900">{campaign.eligibility}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Status</p>
                        <p className={`text-sm font-semibold ${
                          campaign.status.includes('Active') ? 'text-green-600' :
                          campaign.status.includes('Limited') ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                          {campaign.status}
                        </p>
                      </div>
                    </div>
                    
                    <a 
                      href={`/payment?purpose=${encodeURIComponent(campaign.title)}${extractAmount(campaign.offer) ? `&amount=${extractAmount(campaign.offer)}` : ''}`}
                      className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors duration-200 flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Register Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Participate */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How to Participate</h2>
            <p className="text-lg text-gray-600">Simple steps to join our special campaigns</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Check Eligibility</h3>
              <p className="text-gray-600 text-sm">Review campaign requirements and eligibility criteria</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Us</h3>
              <p className="text-gray-600 text-sm">Call or visit our center to register for the campaign</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Submit Documents</h3>
              <p className="text-gray-600 text-sm">Provide required documents for verification</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Avail Services</h3>
              <p className="text-gray-600 text-sm">Get the special services as per campaign benefits</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Impact */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Impact</h2>
            <p className="text-lg text-gray-600">Making a difference in our community</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">1000+</div>
              <div className="text-gray-600">People Helped</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
              <div className="text-gray-600">Free Campaigns</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">₹10L+</div>
              <div className="text-gray-600">Value Provided</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-gray-600">Community Focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Special Campaigns</h2>
          <p className="text-xl text-orange-100 mb-8">
            Be part of our community initiatives and get access to free and discounted legal services
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="tel:+919454950104" 
              className="bg-white text-orange-600 px-8 py-4 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-300 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Register: +91-9454950104
            </a>
            <a 
              href="https://wa.me/919454950104" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-orange-600 transition-all duration-300"
            >
              WhatsApp for Details
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}