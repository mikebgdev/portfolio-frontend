import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';

const About = () => {
  const { t } = useTranslation('about');
  const { toast } = useToast();

  const fallbackData = {
    full_name: t('name'),
    title: t('job_title'),
    image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3",
    description: t('description', { returnObjects: true }) as string[],
    cv_url: "#"
  };

  const {
    full_name = fallbackData.full_name,
    title = fallbackData.title,
    image_url = fallbackData.image_url,
    description = fallbackData.description,
    cv_url = fallbackData.cv_url
  } = fallbackData;

  const handleCVDownload = () => {
    if (cv_url && cv_url !== "#") {
      window.open(cv_url, '_blank');
    } else {
      toast({
        title: t('cv_not_available'),
        description: t('cv_not_available_desc'),
        variant: "destructive",
      });
    }
  };

  return (
    <section id="about" className="py-16 lg:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title')}</h2>
        </FadeInWhenVisible>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <FadeInWhenVisible delay={0.2} direction="right">
            <div className="relative flex justify-center lg:justify-start">
              <div className="relative">
                <motion.img
                  src={image_url}
                  alt={full_name}
                  className="w-72 h-72 lg:w-80 lg:h-80 object-cover rounded-full shadow-2xl border-4 border-white dark:border-slate-800"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-secondary/20 to-transparent"></div>
              </div>
            </div>
          </FadeInWhenVisible>
          
          <div className="space-y-6">
            <FadeInWhenVisible delay={0.3} direction="left">
              <div>
                <h3 className="text-3xl font-bold mb-2">{full_name}</h3>
                <p className="text-xl text-secondary mb-4">{title}</p>
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.4} direction="left">
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                {Array.isArray(description) ? (
                  description.map((paragraph, index) => (
                    <motion.p 
                      key={index} 
                      className="leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      {paragraph}
                    </motion.p>
                  ))
                ) : (
                  <p className="leading-relaxed">{description}</p>
                )}
              </div>
            </FadeInWhenVisible>
            
            <FadeInWhenVisible delay={0.7} direction="left">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleCVDownload}
                  className="rounded-full font-medium"
                  size="lg"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {t('download_cv')}
                </Button>
              </motion.div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;