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
  Clock,
  Calendar
} from 'lucide-react';
import { useBlogs } from '../context/BlogContext';
import AboutSection from '../components/AboutSection';

export default function Home() {
  const { blogs, loading: blogsLoading, language, cleanHindi } = useBlogs();
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
    },
    {
      title: 'Our Advocates',
      hindi: 'हमारे अधिवक्ता',
      icon: Users,
      color: 'blue',
      description: 'Connect with verified advocates across India for expert legal representation.',
      link: '/advocates',
      features: ['Verified Advocates', 'All India Network', 'Direct Connection', 'Expert Consultancy']
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
      <section className="relative bg-black text-white py-24 md:py-32 border-b border-gray-800">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-none animate-fade-in">
              ZoyaLegal
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-gray-300 tracking-wide animate-fade-in-delay">
              CSC + Advocate Multi-Service Centre
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl mb-12 text-gray-400 max-w-3xl mx-auto leading-relaxed animate-slide-up">
              AI-Powered Legal Solutions at Your Fingertips
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 mb-12 text-base md:text-lg animate-fade-in-delay">
              <div className="flex items-center text-gray-300 font-medium">
                <CheckCircle className="h-5 w-5 mr-2" />
                📍 Husain Ganj, Lucknow
              </div>
              <div className="flex items-center text-gray-300 font-medium">
                <CheckCircle className="h-5 w-5 mr-2" />
                PAN India Digital Support
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-scale-in">
              <Link
                to="/payment"
                className="bg-white text-black px-10 py-5 rounded-xl font-black text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                Pay Online
              </Link>
              <Link
                to="/legal-services"
                className="border-2 border-white text-white px-10 py-5 rounded-xl font-black text-lg hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group p-8 rounded-[2rem] hover:bg-gray-50 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.03)] transform hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gray-100 rounded-2xl group-hover:bg-black group-hover:text-white transition-all duration-500 transform group-hover:rotate-12 group-hover:scale-110 shadow-sm">
                    <stat.icon className="h-8 w-8 text-black group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>
                <div className="text-4xl font-black text-black mb-2 tracking-tighter transform transition-all group-hover:scale-110">
                  {stat.number}
                </div>
                <div className="text-gray-400 font-black uppercase text-[10px] tracking-[0.2em] group-hover:text-black transition-colors duration-500">
                  {stat.label}_
                </div>
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
                <div className="p-4 bg-gray-100 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <service.icon className="h-8 w-8 text-black" />
                </div>

                <h3 className="text-xl font-bold text-black mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 font-bold mb-3">
                  {service.hindi}
                </p>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2 mb-4">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <CheckCircle className="h-4 w-4 text-black mr-2 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-black font-bold group-hover:text-gray-700">
                    Learn More
                  </span>
                  <ArrowRight className="h-5 w-5 text-black group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Campaigns */}
      <section className="py-16 bg-white border-y border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <Megaphone className="h-14 w-14 mx-auto mb-4 text-black animate-pulse" />
            <h2 className="text-4xl font-black mb-4 text-black tracking-tighter uppercase">Special Campaigns</h2>
            <p className="text-xl text-gray-500 font-medium">
              Limited time offers and special initiatives for our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-black transition-all shadow-sm hover:shadow-2xl transform hover:-translate-y-2 group">
              <div className="bg-black text-white text-xs font-black tracking-widest py-1 px-3 rounded-full inline-block mb-4">CYBER SECURITY</div>
              <h3 className="text-2xl font-black mb-3 text-black">Cyber Suraksha Week</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                मुफ्त साइबर सहायता - Free cyber security consultation and FIR assistance
              </p>
              <Link to="/special-campaigns" className="text-black font-black hover:underline flex items-center group/link">
                Learn More <ArrowRight className="h-5 w-5 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-black transition-all shadow-sm hover:shadow-2xl transform hover:-translate-y-2 group">
              <div className="bg-black text-white text-xs font-black tracking-widest py-1 px-3 rounded-full inline-block mb-4">STARTUPS</div>
              <h3 className="text-2xl font-black mb-3 text-black">Startup Seva Month</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                ₹1499 लीगल किट - Complete legal documentation package for startups
              </p>
              <Link to="/special-campaigns" className="text-black font-black hover:underline flex items-center group/link">
                Learn More <ArrowRight className="h-5 w-5 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-black transition-all shadow-sm hover:shadow-2xl transform hover:-translate-y-2 group">
              <div className="bg-black text-white text-xs font-black tracking-widest py-1 px-3 rounded-full inline-block mb-4">SENIOR CITIZENS</div>
              <h3 className="text-2xl font-black mb-3 text-black">Senior Citizen Will Week</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                वसीयत ड्राफ्टिंग - Free will drafting services for senior citizens
              </p>
              <Link to="/special-campaigns" className="text-black font-black hover:underline flex items-center group/link">
                Learn More <ArrowRight className="h-5 w-5 ml-2 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-black text-black tracking-tighter uppercase italic mb-6 leading-tight">
                Insights & News_
              </h2>
              <p className="text-gray-500 text-lg font-bold leading-relaxed">
                Stay updated with the latest legal trends, business compliance, and digital security insights from our experts.
              </p>
            </div>
            <Link
              to="/blogs"
              className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-gray-800 transition-all shadow-2xl flex items-center group"
            >
              View All Posts
              <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogsLoading ? (
              [1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-video bg-gray-200 rounded-3xl mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded-full w-1/4"></div>
                </div>
              ))
            ) : blogs.slice(0, 3).map((blog) => (
              <Link key={blog._id} to={`/blogs/${blog._id}`} className="group block">
                <div className="relative aspect-video overflow-hidden rounded-3xl mb-6 bg-white border border-gray-200 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-black transform group-hover:-translate-y-2">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <h3 className="text-xl font-black text-black group-hover:underline decoration-2 underline-offset-4 transition-all">
                  {language === 'hi' && blog.title_hi ? cleanHindi(blog.title_hi) : blog.title}
                </h3>
                <p className="text-gray-500 text-sm mt-2 font-bold uppercase tracking-widest flex items-center">
                  <Calendar className="h-3 w-3 mr-1.5" /> {blog.date}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Contact us today for professional legal and CSC services. Our expert team is ready to assist you with all your needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/contact"
              className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Contact Us Now
            </Link>
            <a
              href="https://wa.me/919454950104"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-black transition-all duration-300"
            >
              WhatsApp Chat
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}