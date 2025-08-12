import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const navigationItems = [
    { key: 'home', path: '/' },
    { key: 'about', path: '/about' },
    { key: 'skills', path: '/skills' },
    { key: 'projects', path: '/projects' },
    { key: 'experience', path: '/experience' },
    { key: 'education', path: '/education' },
    { key: 'contact', path: '/contact' },
  ];

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="container-responsive">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-xl font-bold text-primary-light dark:text-primary-dark hover:opacity-80 transition-opacity"
          >
            Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                className={`
                  text-sm font-medium transition-colors duration-200
                  ${isActiveRoute(item.path)
                    ? 'text-primary-light dark:text-primary-dark border-b-2 border-primary-light dark:border-primary-dark'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark'
                  }
                `}
              >
                {t(`navigation.${item.key}`)}
              </Link>
            ))}
          </div>

          {/* Theme and Language Toggles */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`
                    text-base font-medium px-4 py-2 rounded-md transition-colors duration-200
                    ${isActiveRoute(item.path)
                      ? 'text-primary-light dark:text-primary-dark bg-blue-50 dark:bg-blue-900/20'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-dark hover:bg-gray-50 dark:hover:bg-gray-800'
                    }
                  `}
                >
                  {t(`navigation.${item.key}`)}
                </Link>
              ))}
              <div className="flex items-center justify-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <LanguageToggle />
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};