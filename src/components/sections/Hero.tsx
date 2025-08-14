import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import FloatingIcon from '@/components/animations/FloatingIcon';
import SmoothScroll from '@/components/animations/SmoothScroll';

const Hero = () => {
  const { t } = useTranslation('hero');
  return (
    <section id="home" className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-visible">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="max-w-3xl">
          <FadeInWhenVisible delay={0.2} direction="up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('greeting')} <span className="text-secondary">{t('name')}</span>
            </h1>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.4} direction="up">
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
              {t('subtitle')}
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.6} direction="up">
            <div className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="lg" className="rounded-full font-medium">
                  <SmoothScroll to="#contact">{t('cta.contact')}</SmoothScroll>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild variant="outline" size="lg" className="rounded-full font-medium">
                  <SmoothScroll to="#about">{t('cta.about')}</SmoothScroll>
                </Button>
              </motion.div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <div className="py-4">
          <FloatingIcon useCSS>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const target = document.getElementById('about');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-block p-3 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowDown className="h-6 w-6 text-secondary" />
            </a>
          </FloatingIcon>
        </div>
      </div>
    </section>
  );
};

export default Hero;