import { useState } from 'react';
import { Send, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { useSharedAboutData } from '@/contexts/AboutContext';
import { useContact } from '@/hooks/useApi';
import * as LucideIcons from 'lucide-react';

const Contact = () => {
  const { t } = useTranslation('contact');
  const { toast } = useToast();
  const { contactInfo, loading: contactLoading } = useSharedAboutData();
  const { contactData } = useContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: t('message_sent'),
        description: t('message_sent_desc'),
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  // Return early if data is still loading
  if (contactLoading || contactInfo.length === 0) {
    return (
      <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-secondary"></div>
          </div>
        </div>
      </section>
    );
  }

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'email':
        return <Mail className="h-6 w-6 text-secondary" />;
      case 'location':
        return <MapPin className="h-6 w-6 text-secondary" />;
      default:
        return <Mail className="h-6 w-6 text-secondary" />;
    }
  };

  const getSocialIcon = (iconName: string) => {
    const IconComponent = (LucideIcons as any)[iconName];
    if (IconComponent) {
      try {
        return <IconComponent className="h-6 w-6 text-secondary" />;
      } catch (error) {
        return <Mail className="h-6 w-6 text-secondary" />; // fallback
      }
    }
    return <Mail className="h-6 w-6 text-secondary" />; // fallback
  };

  const getContactTitle = (type: string) => {
    switch (type) {
      case 'email':
        return t('email');
      case 'location':
        return t('location');
      default:
        return t('email');
    }
  };

  return (
      <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title')}</h2>
        </FadeInWhenVisible>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Column 1: Contact Information */}
          <FadeInWhenVisible delay={0.2} direction="left">
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">{t('contact_info')}</h3>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 rounded-full bg-white dark:bg-slate-700 shadow-md mr-4">
                      {getContactIcon(item.type)}
                    </div>
                    <div>
                      <h4 className="text-lg font-medium mb-1">{getContactTitle(item.type)}</h4>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary transition-colors"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                <h4 className="font-semibold mb-2">{t('cta.title')}</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {t('cta.description')}
                </p>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Column 2: Contact Form */}
          <FadeInWhenVisible delay={0.3} direction="up">
            <div className="md:col-span-2 lg:col-span-1 bg-white dark:bg-slate-700 p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">{t('send_message')}</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                          type="text"
                          name="name"
                          placeholder={t('form.name')}
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full"
                      />
                    </div>
                    <div>
                      <Input
                          type="email"
                          name="email"
                          placeholder={t('form.email')}
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                        type="text"
                        name="subject"
                        placeholder={t('form.subject')}
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                  </div>

                  <div>
                    <Textarea
                        name="message"
                        placeholder={t('form.message')}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full resize-none"
                    />
                  </div>

                  <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto rounded-full font-medium"
                      size="lg"
                  >
                    {isLoading ? (
                        t('form.sending')
                    ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t('form.send_button')}
                        </>
                    )}
                  </Button>
                </form>
              </div>
            </FadeInWhenVisible>

            {/* Column 3: Social Networks */}
            <FadeInWhenVisible delay={0.4} direction="right">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold mb-6">{t('social_networks', 'Redes Sociales')}</h3>
                {contactData?.social_networks && contactData.social_networks.length > 0 ? (
                  <div className="space-y-4">
                    {contactData.social_networks.map((network) => (
                      <a
                        key={network.platform}
                        href={network.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 bg-white dark:bg-slate-700 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <div className="p-3 rounded-full bg-gray-100 dark:bg-slate-600">
                          {getSocialIcon(network.icon_name)}
                        </div>
                        <div>
                          <h4 className="font-medium text-lg">{network.platform}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {network.platform === 'GitHub' ? 'Ver repositorios' : 
                             network.platform === 'LinkedIn' ? 'Conectar profesionalmente' :
                             `Seguir en ${network.platform}`}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 bg-white dark:bg-slate-700 rounded-lg shadow-sm text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                      Redes sociales próximamente
                    </p>
                  </div>
                )}
              </div>
            </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default Contact;