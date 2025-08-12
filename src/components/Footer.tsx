import { useLanguage } from '../hooks/useLanguage';

export const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/mikebgdev',
      icon: '🐙',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mikebgdev',
      icon: '💼',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/mikebgdev',
      icon: '🐦',
    },
    {
      name: 'Email',
      url: 'mailto:contact@mikebgdev.com',
      icon: '✉️',
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="container-responsive py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Portfolio
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {t('about.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              {t('navigation.home')}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <a href="#about" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                {t('navigation.about')}
              </a>
              <a href="#skills" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                {t('navigation.skills')}
              </a>
              <a href="#projects" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                {t('navigation.projects')}
              </a>
              <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-primary-light dark:hover:text-primary-dark transition-colors">
                {t('navigation.contact')}
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="text-md font-semibold text-gray-900 dark:text-white">
              {t('contact.social')}
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl hover:scale-110 transition-transform duration-200"
                  aria-label={link.name}
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-6 text-center text-gray-600 dark:text-gray-400">
          <p>
            © {currentYear} Portfolio. Made with ❤️ using React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
};