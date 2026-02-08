import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, Phone, MapPin, ChevronDown, Scale, Building2, TrendingUp, Smartphone, Globe, Gavel, BookOpen, Newspaper, Search, ShieldCheck, Fingerprint, ArrowRight } from 'lucide-react';
import { useBlogs } from '../context/BlogContext';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const services = [
    { name: 'Legal Services', href: '/legal-services', icon: Scale, desc: 'Consultancy & Documentation', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'CSC Services', href: '/csc-services', icon: Building2, desc: 'Govt. Welfare & Banking', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Business Support', href: '/business-support', icon: TrendingUp, desc: 'GST, ITR & Registrations', color: 'text-purple-600', bg: 'bg-purple-50' },
    { name: 'Digital Services', href: '/digital-services', icon: Smartphone, desc: 'Web & Digital Marketing', color: 'text-pink-600', bg: 'bg-pink-50' },
    { name: 'Gulf Jobs & Visa', href: '/gulf-jobs-visa', icon: Globe, desc: 'Placement & Verification', color: 'text-orange-600', bg: 'bg-orange-50' },
    { name: 'Aadhaar eSign', href: '/esign', icon: Fingerprint, desc: 'Digital Paperless Signing', color: 'text-green-600', bg: 'bg-green-50' },
  ];

  const legalResources = [
    { name: 'Browse Advocates', href: '/advocates', icon: Gavel, desc: 'Connect with Top Lawyers' },
    { name: 'Acts & Judgments', href: '/acts-judgments', icon: BookOpen, desc: 'Indian Laws & Case Studies' },
    { name: 'Blogs & Articles', href: '/blogs', icon: Newspaper, desc: 'Latest Legal Updates & News' },
  ];



  const mainLinks = [
    { name: 'Home', href: '/' },
    // Advocates, Acts & Blogs moved to dropdown
    { name: 'Client Portal', href: '/client-portal' },
    { name: 'Payment', href: '/payment' },
    { name: 'Contact', href: '/contact' },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const { settings } = useBlogs();

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
            <Link to="/admin" className="flex items-center text-gray-400 hover:text-white transition-colors">
              <Shield className="h-3 w-3 mr-1" />
              <span>Admin Panel</span>
            </Link>
            <div className="flex items-center font-bold">
              <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1 text-gray-400" />
              <span>{settings?.phone || "+91-9454950104"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-gray-100" ref={navRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 md:py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 md:space-x-3 group">
              <div className="p-2 bg-black rounded-lg shadow-lg group-hover:scale-105 transition-transform duration-300">
                <Shield className="h-6 w-6 md:h-8 md:w-8 text-white" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl md:text-2xl font-black text-black tracking-tight leading-none group-hover:text-gray-800 transition-colors">ZoyaLegal</h1>
                <p className="text-[10px] md:text-[11px] text-gray-500 font-bold uppercase tracking-widest hidden sm:block leading-tight">Digital Legal & CSC Centre</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link
                to="/"
                className={`${location.pathname === '/' ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'} px-4 py-2 rounded-lg transition-all font-bold text-sm`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all font-bold text-sm group ${services.some(s => location.pathname === s.href) || activeDropdown === 'services' ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                >
                  <span>Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
                </button>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-72 mt-2 bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden transition-all duration-300 origin-top ${activeDropdown === 'services' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 translate-y-2 invisible'
                    }`}
                >
                  <div className="p-2 space-y-1">
                    {services.map((service) => (
                      <Link
                        key={service.name}
                        to={service.href}
                        className={`flex items-center p-3 rounded-lg transition-all group/item ${location.pathname === service.href ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      >
                        <div className={`p-2 rounded-md mr-3 bg-gray-100 text-gray-600 group-hover/item:bg-black group-hover/item:text-white transition-colors`}>
                          <service.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${location.pathname === service.href ? 'text-black' : 'text-gray-800'}`}>{service.name}</p>
                          <p className="text-[10px] text-gray-500">{service.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advocates & Resources (Grouped) */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('advocates')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all font-bold text-sm group ${['/advocates', '/acts-judgments'].includes(location.pathname) || activeDropdown === 'advocates' ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'
                    }`}
                >
                  <span>Legal Centre</span>
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeDropdown === 'advocates' ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} />
                </button>

                <div
                  className={`absolute top-full left-0 w-72 mt-2 bg-white rounded-xl shadow-xl ring-1 ring-black/5 overflow-hidden transition-all duration-300 origin-top ${activeDropdown === 'advocates' ? 'opacity-100 scale-100 translate-y-0 visible' : 'opacity-0 scale-95 translate-y-2 invisible'
                    }`}
                >
                  <div className="p-2 space-y-1">
                    {legalResources.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`flex items-center p-3 rounded-lg transition-all group/item ${location.pathname === item.href ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                      >
                        <div className={`p-2 rounded-md mr-3 bg-gray-100 text-gray-600 group-hover/item:bg-black group-hover/item:text-white transition-colors`}>
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className={`font-bold text-sm ${location.pathname === item.href ? 'text-black' : 'text-gray-800'}`}>{item.name}</p>
                          <p className="text-[10px] text-gray-500">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/case-status"
                className={`${location.pathname === '/case-status' ? 'text-black bg-gray-100' : 'text-gray-600 hover:text-black hover:bg-gray-50'} px-4 py-2 rounded-lg transition-all font-bold text-sm`}
              >
                Case Status
              </Link>



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

            {/* Actions */}
            <div className="flex items-center space-x-4">

              <Link
                to="/payment"
                className="hidden sm:flex bg-black text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-800 shadow-lg hover:shadow-xl transition-all active:scale-95 items-center"
              >
                <span>Pay Now</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              {/* Mobile Menu Button */}
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
        < div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-[100vh] border-t border-gray-100' : 'max-h-0'}`
        }>
          <div className="px-4 py-6 space-y-6 bg-white h-screen overflow-y-auto pb-40"> {/* pb-40 to ensure bottom content is visible */}
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-xl font-bold text-gray-900 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors">Home</Link>

            {/* Mobile Services */}
            <div className="space-y-3">
              <div className="px-4 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Our Services</p>
                <div className="h-px bg-gray-100 flex-1 ml-4"></div>
              </div>
              <div className="grid gap-2 px-2">
                {services.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center p-3 rounded-xl bg-gray-50 border border-transparent active:border-gray-200 active:scale-[0.98] transition-all"
                  >
                    <div className={`p-2 rounded-lg mr-3 ${item.bg} ${item.color}`}>
                      <item.icon className="h-5 w-5" />
                    </div>
                    <span className="font-bold text-gray-800">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile Legal Centre */}
            <div className="space-y-3">
              <div className="px-4 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Legal Centre</p>
                <div className="h-px bg-gray-100 flex-1 ml-4"></div>
              </div>
              <div className="grid gap-2 px-2">
                {legalResources.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center p-3 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <item.icon className="h-5 w-5 mr-3 text-gray-600" />
                    <div>
                      <span className="font-bold block text-gray-800">{item.name}</span>
                      <span className="text-xs text-gray-500">{item.desc}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="px-4 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Case Status & Portals</p>
                <div className="h-px bg-gray-100 flex-1 ml-4"></div>
              </div>
              <div className="px-2">
                <Link
                  to="/case-status"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center p-3 rounded-xl bg-gray-50/50 hover:bg-gray-100 transition-colors"
                >
                  <div className="p-2 rounded-lg mr-3 bg-white shadow-sm text-gray-600">
                    <Search className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <span className="font-bold block text-gray-800 text-sm">
                      Check Case Status
                    </span>
                    <span className="text-[10px] text-gray-500">Access all court and legal portals</span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Other Links */}
            <div className="space-y-2 border-t border-gray-100 pt-4">
              {mainLinks.slice(1).map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-lg font-bold text-gray-900 px-4 py-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="pt-6 space-y-4 border-t border-gray-100">


              <Link to="/payment" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-black text-white py-4 rounded-xl font-bold shadow-lg active:scale-95 transition-transform">Pay Online Now</Link>
            </div>
          </div>
        </div >
      </header >
    </>
  );
}