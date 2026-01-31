import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Phone, MapPin, ChevronDown, Scale, Building2, TrendingUp, Smartphone, Globe } from 'lucide-react';
import { useBlogs } from '../context/BlogContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const services = [
    { name: 'Legal Services', href: '/legal-services', icon: Scale, desc: 'Consultancy & Documentation' },
    { name: 'CSC Services', href: '/csc-services', icon: Building2, desc: 'Govt. Welfare & Banking' },
    { name: 'Business Support', href: '/business-support', icon: TrendingUp, desc: 'GST, ITR & Registrations' },
    { name: 'Digital Services', href: '/digital-services', icon: Smartphone, desc: 'Web & Digital Marketing' },
    { name: 'Gulf Jobs & Visa', href: '/gulf-jobs-visa', icon: Globe, desc: 'Placement & Verification' },
  ];

  const mainLinks = [
    { name: 'Home', href: '/' },
    { name: 'Advocates', href: '/advocates' },
    { name: 'Acts & Judgments', href: '/acts-judgments' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Payment', href: '/payment' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location]);

  const { settings, language, setLanguage } = useBlogs();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-black text-white py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-400" />
              <span className="opacity-90">{settings?.address || "Husain Ganj, Lucknow | PAN India Support"}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-1 sm:mt-0">
            <div className="flex items-center font-bold">
              <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-400" />
              <span>{settings?.phone || "+91-9454950104"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/98 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
              <div className="p-2 bg-black rounded-lg shadow-md group-hover:scale-105 transition-transform">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-black text-black tracking-tight">ZoyaLegal</h1>
                <p className="text-[10px] md:text-xs text-gray-600 font-bold uppercase tracking-widest hidden sm:block">CSC + Advocate Centre</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {/* Language Switcher Desktop */}
              <div className="flex bg-gray-100 p-1 rounded-xl mr-2">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${language === 'en' ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${language === 'hi' ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black'}`}
                >
                  हिन्दी
                </button>
              </div>

              <Link
                to="/"
                className={`${location.pathname === '/' ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'} px-4 py-2 rounded-lg transition-all font-bold text-sm`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  onMouseEnter={() => setIsServicesOpen(true)}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all font-bold text-sm ${services.some(s => location.pathname === s.href) ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <div
                  className={`absolute top-full left-0 w-80 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 origin-top-left ${isServicesOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <div className="p-4 grid gap-2">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        to={service.href}
                        className={`flex items-start p-3 rounded-lg transition-all group ${location.pathname === service.href ? 'bg-gray-100' : 'hover:bg-gray-50'
                          }`}
                      >
                        <div className={`p-2 rounded-lg mr-4 transition-colors ${location.pathname === service.href ? 'bg-black text-white' : 'bg-gray-100 text-black group-hover:bg-black group-hover:text-white'
                          }`}>
                          <service.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${location.pathname === service.href ? 'text-black' : 'text-gray-900'}`}>{service.name}</p>
                          <p className="text-xs text-gray-500 font-medium">{service.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <div className="bg-gray-50 p-4 border-t border-gray-100">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">All India Digital Legal Support</p>
                  </div>
                </div>
              </div>

              {mainLinks.slice(1).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${location.pathname === item.href
                    ? 'text-black bg-gray-100'
                    : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    } px-4 py-2 rounded-lg transition-all font-bold text-sm`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-2">
              <Link
                to="/payment"
                className="hidden sm:flex bg-black text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 shadow-md transition-all active:scale-95"
              >
                Pay Now
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-black hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[100vh] border-t border-gray-100' : 'max-h-0'}`}>
          <div className="px-4 py-6 space-y-4 bg-white">
            <Link to="/" className="block text-lg font-bold text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">Home</Link>

            <div className="space-y-2">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest px-4 mb-2">Our Services</p>
              <div className="grid gap-1 px-2">
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-4 text-black" />
                    <span className="font-bold">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-4 space-y-2 border-t border-gray-100">
              {mainLinks.slice(1).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block text-lg font-bold text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 space-y-4 border-t border-gray-100">
              <div className="flex bg-gray-100 p-1.5 rounded-xl w-full">
                <button
                  onClick={() => setLanguage('en')}
                  className={`flex-1 py-3 rounded-lg font-black uppercase text-xs tracking-widest transition-all ${language === 'en' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('hi')}
                  className={`flex-1 py-3 rounded-lg font-black uppercase text-xs tracking-widest transition-all ${language === 'hi' ? 'bg-white text-black shadow-sm' : 'text-gray-400'}`}
                >
                  हिन्दी
                </button>
              </div>

              <Link to="/payment" className="block w-full text-center bg-black text-white py-4 rounded-xl font-bold shadow-lg">Pay Online Now</Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}