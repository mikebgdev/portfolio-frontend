import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';

export const ContactPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/mikebgdev',
      icon: '🐙',
      handle: '@mikebgdev',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/mikebgdev',
      icon: '💼',
      handle: 'linkedin.com/in/mikebgdev',
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/mikebgdev',
      icon: '🐦',
      handle: '@mikebgdev',
    },
    {
      name: 'Email',
      url: 'mailto:contact@mikebgdev.com',
      icon: '✉️',
      handle: 'contact@mikebgdev.com',
    },
  ];

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('contact.title')}
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-primary-light dark:text-primary-dark">
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent outline-none transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark focus:border-transparent outline-none transition-all resize-vertical"
                  placeholder="Your message..."
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
              >
                {t('contact.send')}
              </button>
            </form>
          </div>

          {/* Contact Information & Social Links */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-primary-light dark:text-primary-dark">
                Get in Touch
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                I'm always interested in new opportunities and collaborations. 
                Feel free to reach out if you'd like to work together or just say hello!
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">
                {t('contact.social')}
              </h3>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-2xl">{link.icon}</span>
                    <div>
                      <div className="font-medium">{link.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {link.handle}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};