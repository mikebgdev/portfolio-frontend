import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

const Education = () => {
  const { t } = useTranslation('education');
  
  const fallbackEducation: EducationItem[] = [
    {
      degree: t('education1.degree', 'Máster en Ingeniería Informática'),
      institution: t('education1.institution', 'Universidad Politécnica'),
      location: t('education1.location', 'Madrid, España'),
      period: t('education1.period', '2014 - 2016'),
      description: t('education1.description', 'Especialización en Desarrollo de Software y Sistemas Distribuidos. Proyecto final sobre sistemas de recomendación basados en machine learning.')
    },
    {
      degree: t('education2.degree', 'Grado en Ingeniería del Software'),
      institution: t('education2.institution', 'Universidad de Tecnología'),
      location: t('education2.location', 'Barcelona, España'),
      period: t('education2.period', '2010 - 2014'),
      description: t('education2.description', 'Formación completa en fundamentos de programación, algoritmos, bases de datos y desarrollo de aplicaciones.')
    },
    {
      degree: t('education3.degree', 'Certificación en Desarrollo Web Full-Stack'),
      institution: t('education3.institution', 'Tech Academy'),
      location: t('education3.location', 'Online'),
      period: t('education3.period', '2020'),
      description: t('education3.description', 'Formación intensiva en desarrollo web moderno con React, Node.js, y bases de datos NoSQL.')
    }
  ];
  
  const educationItems = fallbackEducation;

  return (
    <section id="education" className="py-16 lg:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title', 'Formación Académica')}</h2>
        </FadeInWhenVisible>
        
        <div className="relative border-l-4 border-secondary ml-6 md:ml-0 pl-8 space-y-10">
          <StaggerContainer>
            {educationItems.map((item, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="relative"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="absolute -left-[34px] p-2 bg-secondary rounded-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <GraduationCap className="h-4 w-4 text-white" />
                  </motion.div>
                  
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {item.degree}
                    </h3>
                    <p className="text-lg text-secondary font-medium">
                      {item.institution}
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:items-end mt-2 md:mt-0 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{item.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>
                
                    <motion.p 
                      className="text-gray-700 dark:text-gray-300 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      viewport={{ once: true }}
                    >
                      {item.description}
                    </motion.p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Education;