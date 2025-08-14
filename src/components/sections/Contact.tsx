import { useState } from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

const Contact = () => {
  const { t } = useTranslation('contact');
  const { toast } = useToast();
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
        title: t('message_sent', 'Mensaje enviado'),
        description: t('message_sent_desc', 'Tu mensaje ha sido enviado correctamente. Me pondré en contacto contigo pronto.'),
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-secondary" />,
      title: t('email', 'Email'),
      value: "tu@email.com",
      link: "mailto:tu@email.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-secondary" />,
      title: t('phone', 'Teléfono'),
      value: "+34 123 456 789",
      link: "tel:+34123456789"
    },
    {
      icon: <MapPin className="h-6 w-6 text-secondary" />,
      title: t('location', 'Ubicación'),
      value: "Madrid, España",
      link: "#"
    }
  ];

  return (
      <section id="contact" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title', 'Contacto')}</h2>
        </FadeInWhenVisible>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <FadeInWhenVisible delay={0.3} direction="left">
            <div   className="lg:col-span-1 space-y-8">
            <h3 className="text-2xl font-semibold mb-6">{t('contact_info', 'Información de contacto')}</h3>

              <div className="space-y-6">
              {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 rounded-full bg-white dark:bg-slate-700 shadow-md mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1">{item.title}</h3>
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
              <h4 className="font-semibold mb-2">{t('cta.title', '¿Tienes un proyecto en mente?')}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('cta.description', 'Estoy siempre abierto a discutir nuevas oportunidades y proyectos interesantes. No dudes en contactarme para hablar sobre cómo puedo ayudarte.')}
              </p>
            </div>
            </div>
          </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2} direction="left">
              <div  className="lg:col-span-2 bg-white dark:bg-slate-700 p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">{t('send_message', 'Envíame un mensaje')}</h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                          type="text"
                          name="name"
                          placeholder={t('form.name', 'Tu nombre')}
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
                          placeholder={t('form.email', 'Tu email')}
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
                        placeholder={t('form.subject', 'Asunto')}
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full"
                    />
                  </div>

                  <div>
                    <Textarea
                        name="message"
                        placeholder={t('form.message', 'Tu mensaje')}
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
                        t('form.sending', 'Enviando...')
                    ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          {t('form.send_button', 'Enviar Mensaje')}
                        </>
                    )}
                  </Button>
                </form>
              </div>
            </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
};

export default Contact;