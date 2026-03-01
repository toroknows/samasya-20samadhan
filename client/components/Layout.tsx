import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageSquare, Users, Home, Menu, X, Heart, Sparkles, Instagram, Facebook, Search } from "lucide-react";
import { useState } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/", icon: Home },
    { name: "Find Expert", href: "/mentor", icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen relative overflow-hidden bg-white">
      {/* GLOBAL BACKGROUND: Swapped Purple for Soft Blue/White */}
      <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-100"></div>
      
      {/* Floating background elements - Adjusted to soft blues */}
      <div className="fixed top-20 left-20 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="fixed bottom-20 right-20 w-32 h-32 bg-sky-200/20 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}}></div>
      <div className="fixed top-1/2 left-10 w-24 h-24 bg-blue-100/20 rounded-full blur-xl animate-float" style={{animationDelay: '4s'}}></div>

      <div className="relative z-10">
      {/* Header - White with Blue border */}
      <header className="fixed top-0 z-50 w-full bg-white/90 backdrop-blur-lg border-b border-blue-100 shadow-sm">
        <div className="container px-4 sm:px-6">
          <div className="flex h-16 sm:h-18 items-center justify-between">
            {/* Logo - Blue Theme */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-400 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="text-xl sm:text-2xl font-bold">
                  <span className="text-blue-600">Samasya</span>
                  <span className="text-sky-500">Samadhan</span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation & Search */}
            <div className="hidden md:flex items-center space-x-6">
              <nav className="flex items-center space-x-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 ${
                        active
                          ? "bg-blue-100 text-blue-700 shadow-sm"
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search name..."
                  className="pl-4 pr-10 py-2 rounded-full border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm bg-white w-48 transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-2.5" />
              </div>
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full px-4 sm:px-5" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-full px-4 sm:px-6 py-2.5 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105" asChild>
                <Link to="/signup">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gray-100 hover:bg-blue-100 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-blue-100 bg-white">
            <div className="container py-4 space-y-4">
              {/* Mobile Search Bar */}
              <div className="px-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search name..."
                    className="w-full pl-4 pr-10 py-3 rounded-xl border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-base bg-gray-50/50"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
                </div>
              </div>

              {/* Mobile Navigation Links */}
              <div className="space-y-2 px-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors duration-200 ${
                        active
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth Buttons */}
              <div className="border-t border-blue-100 pt-4 px-4 space-y-3">
                <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 rounded-xl py-3" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white rounded-xl py-3 shadow-lg" asChild>
                  <Link to="/signup">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Get Started
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1 pt-16 sm:pt-18">{children}</main>

      {/* Enhanced Footer - Dark Blue Theme */}
      <footer className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-sky-900"></div>
        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-sky-500/10 rounded-full blur-xl"></div>

        <div className="relative">
          <div className="container py-12 sm:py-16 px-4 sm:px-6">
            <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-4">
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-400 to-sky-400 rounded-2xl flex items-center justify-center shadow-lg">
                    <Heart className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl font-bold">
                    <span className="text-blue-300">Samasya</span>
                    <span className="text-sky-300">Samadhan</span>
                  </div>
                </div>

                <p className="text-blue-100 max-w-lg leading-relaxed text-base sm:text-lg">
                  Hey, we get it. Every problem has a solution. Get help safely and confidentially - no judgment, just real support when you need it.
                </p>

                <div className="flex flex-wrap gap-3 sm:gap-4">
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-white text-xs sm:text-sm">100% Anonymous</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-white text-xs sm:text-sm">Safe & Secure</span>
                  </div>
                </div>

                <div className="pt-4">
                  <Button className="bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-white rounded-xl px-6 py-2.5 shadow-lg" asChild>
                    <Link to="/submit">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Get Help Now
                    </Link>
                  </Button>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-white font-bold text-lg border-b border-white/20 pb-3">Quick Links</h3>
                <ul className="space-y-4">
                  <li>
                    <Link to="/how-it-works" className="text-blue-200 hover:text-white transition-colors flex items-center space-x-2 group">
                      <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-sky-400"></div>
                      <span>How It Works</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-white font-bold text-lg border-b border-white/20 pb-3">Support</h3>
                <ul className="space-y-4">
                  <li><Link to="/about" className="text-blue-200 hover:text-white flex items-center space-x-2"><div className="w-2 h-2 bg-sky-400 rounded-full"></div><span>About</span></Link></li>
                  <li><Link to="/terms" className="text-blue-200 hover:text-white flex items-center space-x-2"><div className="w-2 h-2 bg-blue-400 rounded-full"></div><span>Terms</span></Link></li>
                </ul>

                <div className="pt-2 flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-500 transition-all"><Instagram className="w-5 h-5" /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-blue-600 transition-all"><Facebook className="w-5 h-5" /></a>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-blue-200 text-sm">&copy; 2024 SamasyaSamadhan • Made with <Heart className="w-4 h-4 inline text-blue-400 animate-pulse" /> by Vishal</p>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}
