import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  AlertTriangle, 
  FileText, 
  Scale,
  CheckCircle,
  Phone,
  Shield,
  Clock,
  Users
} from 'lucide-react';

export default function LoadRecovery() {
  const services = [
    {
      icon: AlertTriangle,
      title: 'EMI Bounce Recovery',
      hindi: 'ईएमआई बाउंस रिकवरी',
      description: 'Professional recovery services for bounced EMIs and loan defaults.',
      details: [
        'EMI bounce notice drafting and dispatch',
        'Legal recovery proceedings initiation',
        'Negotiation with defaulting parties',
        'Settlement agreement preparation',
        'Court filing for recovery cases',
        'Asset attachment procedures',
        'Recovery timeline management',
        'Documentation and compliance'
      ],
      price: 'Starting from ₹2,000',
      successRate: '85%'
    },
    {
      icon: FileText,
      title: 'Legal Notice Services',
      hindi: 'कानूनी नोटिस सेवाएं',
      description: 'Professional legal notice drafting and dispatch for various disputes.',
      details: [
        'Demand notice for money recovery',
        'Breach of contract notices',
        'Property dispute notices',
        'Employment termination notices',
        'Consumer complaint notices',
        'Defamation and harassment notices',
        'Partnership dissolution notices',
        'Intellectual property infringement'
      ],
      price: 'Starting from ₹1,500',
      turnaround: '2-3 days'
    },
    {
      icon: Scale,
      title: 'Financial Dispute Resolution',
      hindi: 'वित्तीय विवाद समाधान',
      description: 'Complete resolution services for financial disputes and conflicts.',
      details: [
        'Loan default case handling',
        'Credit card dispute resolution',
        'Insurance claim disputes',
        'Banking service complaints',
        'Investment fraud cases',
        'Partnership financial disputes',
        'Vendor payment disputes',
        'Salary and wage recovery'
      ],
      price: 'Starting from ₹3,000',
      expertise: 'Financial Law'
    },
    {
      icon: TrendingUp,
      title: 'Debt Collection Services',
      hindi: 'ऋण संग्रह सेवाएं',
      description: 'Professional debt collection services for businesses and individuals.',
      details: [
        'Outstanding invoice recovery',
        'Trade debt collection',
        'Personal loan recovery',
        'Credit card debt recovery',
        'Rental arrears collection',
        'Professional fees recovery',
        'Supplier payment recovery',
        'Bad debt write-off assistance'
      ],
      price: 'Commission-based',
      approach: 'Legal & Ethical'
    },
    {
      icon: Shield,
      title: 'Asset Protection Services',
      hindi: 'संपत्ति सुरक्षा सेवाएं',
      description: 'Legal services to protect assets during recovery proceedings.',
      details: [
        'Asset attachment and seizure',
        'Property lien registration',
        'Bank account freezing procedures',
        'Vehicle attachment orders',
        'Salary garnishment procedures',
        'Asset valuation and auction',
        'Recovery execution services',
        'Asset protection planning'
      ],
      price: 'Starting from ₹5,000',
      coverage: 'All Asset Types'
    },
    {
      icon: Users,
      title: 'Mediation & Settlement',
      hindi: 'मध्यस्थता और समझौता',
      description: 'Alternative dispute resolution through mediation and settlement.',
      details: [
        'Pre-litigation settlement negotiations',
        'Mediation session coordination',
        'Settlement agreement drafting',
        'Payment plan structuring',
        'Compromise and settlement deeds',
        'Out-of-court resolution',
        'Mutual release agreements',
        'Follow-up and compliance monitoring'
      ],
      price: 'Starting from ₹2,500',
      benefit: 'Cost-effective'
    }
  ];

  const recoveryTypes = [
    {
      type: 'Personal Loans',
      description: 'Individual loan defaults and EMI bounces',
      avgRecovery: '75-90%',
      timeline: '3-6 months'
    },
    {
      type: 'Business Loans',
      description: 'Commercial loan defaults and business debt',
      avgRecovery: '60-80%',
      timeline: '6-12 months'
    },
    {
      type: 'Credit Cards',
      description: 'Credit card outstanding and defaults',
      avgRecovery: '70-85%',
      timeline: '2-4 months'
    },
    {
      type: 'Trade Debts',
      description: 'B2B outstanding payments and invoices',
      avgRecovery: '80-95%',
      timeline: '1-3 months'
    },
    {
      type: 'Property Disputes',
      description: 'Real estate related financial disputes',
      avgRecovery: '85-95%',
      timeline: '6-18 months'
    },
    {
      type: 'Professional Fees',
      description: 'Service provider fee recovery',
      avgRecovery: '90-98%',
      timeline: '1-2 months'
    }
  ];

  const process = [
    {
      step: '1',
      title: 'Case Assessment',
      description: 'Detailed analysis of the debt/dispute and recovery prospects'
    },
    {
      step: '2',
      title: 'Legal Notice',
      description: 'Formal demand notice to the defaulting party'
    },
    {
      step: '3',
      title: 'Negotiation',
      description: 'Settlement discussions and payment plan negotiations'
    },
    {
      step: '4',
      title: 'Legal Action',
      description: 'Court proceedings if settlement fails'
    },
    {
      step: '5',
      title: 'Recovery',
      description: 'Asset attachment and recovery execution'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <TrendingUp className="h-16 w-16 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Loan Recovery Services</h1>
            <p className="text-xl text-red-100 mb-2">ऋण वसूली और वित्तीय विवाद समाधान</p>
            <p className="text-lg text-red-200 max-w-3xl mx-auto">
              Professional debt recovery and financial dispute resolution services. We help individuals and businesses 
              recover outstanding amounts through legal and ethical means with high success rates.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">85%</div>
              <div className="text-gray-600">Average Recovery Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-600">Cases Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">₹2Cr+</div>
              <div className="text-gray-600">Amount Recovered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Recovery Services</h2>
            <p className="text-lg text-gray-600">Comprehensive debt recovery and dispute resolution solutions</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-red-100 rounded-xl mr-4">
                      <service.icon className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{service.title}</h3>
                      <p className="text-sm text-red-600 font-medium">{service.hindi}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    {service.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <p className="text-sm text-gray-500">Starting Price</p>
                        <p className="text-lg font-bold text-red-600">{service.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {service.successRate && `Success Rate: ${service.successRate}`}
                          {service.turnaround && `Turnaround: ${service.turnaround}`}
                          {service.expertise && `Expertise: ${service.expertise}`}
                          {service.approach && `Approach: ${service.approach}`}
                          {service.coverage && `Coverage: ${service.coverage}`}
                          {service.benefit && `Benefit: ${service.benefit}`}
                        </p>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/payment?purpose=${encodeURIComponent(service.title)}${service.price ? `&amount=${service.price.replace(/[^0-9]/g,'')}` : ''}`}
                      className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center">
                      <Phone className="h-4 w-4 mr-2" />
                      Pay & Consult
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recovery Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Types of Recovery Cases</h2>
            <p className="text-lg text-gray-600">We handle various types of debt recovery with proven success rates</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recoveryTypes.map((type, index) => (
              <div key={index} className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{type.type}</h3>
                <p className="text-gray-600 text-sm mb-4">{type.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Avg Recovery:</span>
                    <span className="text-sm font-semibold text-red-600">{type.avgRecovery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Timeline:</span>
                    <span className="text-sm font-semibold text-gray-900">{type.timeline}</span>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Recovery Process</h2>
            <p className="text-lg text-gray-600">Systematic approach to debt recovery with maximum success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Recovery Services?</h2>
            <p className="text-lg text-gray-600">Professional, ethical, and effective debt recovery solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="p-4 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Scale className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Legal Expertise</h3>
              <p className="text-gray-600 text-sm">Expert legal team with deep knowledge of recovery laws</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ethical Approach</h3>
              <p className="text-gray-600 text-sm">Strictly legal and ethical recovery methods only</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">High Success Rate</h3>
              <p className="text-gray-600 text-sm">Proven track record with 85% average recovery rate</p>
            </div>

            <div className="text-center">
              <div className="p-4 bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Resolution</h3>
              <p className="text-gray-600 text-sm">Fast and efficient recovery process with regular updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Recovering Your Money?</h2>
          <p className="text-xl text-red-100 mb-8">
            Contact our expert recovery team for professional debt collection and dispute resolution services
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="tel:+919454950104" 
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 flex items-center justify-center"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call: +91-9454950104
            </a>
            <a 
              href="https://wa.me/919454950104" 
              target="_blank" 
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-red-600 transition-all duration-300"
            >
              Free Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}