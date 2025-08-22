import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useSiteConfig } from '@/hooks/useApi';

interface HeaderProps {
  toggleDarkMode: () => void;
  isDarkMode: boolean;
}

const Header = ({ toggleDarkMode, isDarkMode }: HeaderProps) => {
  const { t } = useTranslation('navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { siteConfig } = useSiteConfig();
  
  const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
  const activeSection = useScrollSpy(sectionIds, 80);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleSmoothScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false); // Close mobile menu after click
  };

  const navLinks = [
    { name: t('home'), href: '#home', id: 'home' },
    { name: t('about'), href: '#about', id: 'about' },
    { name: t('skills'), href: '#skills', id: 'skills' },
    { name: t('projects'), href: '#projects', id: 'projects' },
    { name: t('experience'), href: '#experience', id: 'experience' },
    { name: t('education'), href: '#education', id: 'education' },
    { name: t('contact'), href: '#contact', id: 'contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-slate-900/90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a 
          href="#home" 
          onClick={(e) => handleSmoothScroll(e, 'home')}
          className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary"
        >
          {siteConfig?.favicon_data?.data && (
            <img 
              src={siteConfig.favicon_data.data} 
              alt="Favicon" 
              className="w-6 h-6 md:w-8 md:h-8"
            />
          )}
          {siteConfig?.brand_name || t('brand')}<span className="text-secondary">.</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                  className={`text-sm font-medium transition-colors relative ${
                    activeSection === link.id
                      ? 'text-secondary'
                      : 'text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary'
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary rounded-full"></span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleDarkMode}
              title={t('theme.toggle')}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden">
          <LanguageSwitcher />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="mx-2"
            title={t('theme.toggle')}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-md py-4 px-4 md:hidden">
            <ul className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.id)}
                    className={`block py-2 text-sm font-medium transition-colors ${
                      activeSection === link.id
                        ? 'text-secondary'
                        : 'text-gray-700 dark:text-gray-200 hover:text-secondary dark:hover:text-secondary'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;