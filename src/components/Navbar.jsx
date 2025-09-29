import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/ask', label: 'Ask Question', icon: '❓' }
  ];

  return (
    <nav className="sticky top-0 z-40 bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md border-b border-surface-border-light dark:border-surface-border-dark transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="group flex items-center gap-2 text-xl font-bold text-content-primary hover:text-primary-600 dark:hover:text-primary-400 transition-all duration-200">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white group-hover:scale-110 transform transition-transform duration-200 shadow-soft group-hover:shadow-primary-500/25">
                📚
              </div>
              <span className="hidden sm:block bg-gradient-primary bg-clip-text text-transparent group-hover:from-primary-700 group-hover:to-secondary-700">
                StackIt
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group relative px-4 py-2 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  isActiveRoute(link.path)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 shadow-soft'
                    : 'text-content-primary hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark hover:text-content-primary'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-lg transition-transform duration-200 ${
                    isActiveRoute(link.path) ? 'scale-110' : 'group-hover:scale-110'
                  }`}>
                    {link.icon}
                  </span>
                  <span>{link.label}</span>
                </div>
                
                {/* Active indicator */}
                {isActiveRoute(link.path) && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                )}
              </Link>
            ))}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="group relative p-2 rounded-xl bg-surface-hover-light dark:bg-surface-hover-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-all duration-200 transform hover:scale-105 active:scale-95 border border-surface-border-light dark:border-surface-border-dark"
              title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
            >
              <div className="relative w-6 h-6 overflow-hidden">
                <div className={`absolute inset-0 transition-all duration-300 transform ${
                  darkMode ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
                }`}>
                  <span className="text-xl group-hover:scale-110 transform transition-transform duration-200">☀️</span>
                </div>
                <div className={`absolute inset-0 transition-all duration-300 transform ${
                  darkMode ? '-rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}>
                  <span className="text-xl group-hover:scale-110 transform transition-transform duration-200">🌙</span>
                </div>
              </div>
            </button>

            {/* Profile/User Menu */}
            <div className="hidden sm:block">
              <button className="group flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-primary hover:from-primary-600 hover:to-secondary-600 text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-soft hover:shadow-primary-500/25">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transform transition-transform duration-200">
                  👤
                </div>
                <span className="text-sm">Sign In</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl text-content-primary hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark transition-all duration-200 transform hover:scale-105 active:scale-95"
            >
              <div className="relative w-6 h-6">
                <div className={`absolute inset-0 transition-all duration-300 transform ${
                  isMenuOpen ? 'rotate-45 opacity-0' : 'rotate-0 opacity-100'
                }`}>
                  <span className="text-xl">☰</span>
                </div>
                <div className={`absolute inset-0 transition-all duration-300 transform ${
                  isMenuOpen ? 'rotate-0 opacity-100' : 'rotate-45 opacity-0'
                }`}>
                  <span className="text-xl">✕</span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-in slide-in-from-top-2 duration-200 bg-surface-light dark:bg-surface-dark border-t border-surface-border-light dark:border-surface-border-dark">
          <div className="px-4 py-3 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                  isActiveRoute(link.path)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                    : 'text-content-primary hover:bg-surface-hover-light dark:hover:bg-surface-hover-dark'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
            
            {/* Mobile Sign In */}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-primary text-white font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-soft">
              <span className="text-lg">👤</span>
              <span>Sign In</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
