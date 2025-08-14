import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const Experience = () => {
  const { t } = useTranslation('experience');
  
  const fallbackExperiences: ExperienceItem[] = [
    {
      title: t('experience1.title', 'Senior Full Stack Developer'),
      company: t('experience1.company', 'Tech Solutions Inc.'),
      location: t('experience1.location', 'Madrid, España'),
      period: t('experience1.period', 'Enero 2021 - Presente'),
      description: [
        "Desarrollo y mantenimiento de aplicaciones web utilizando React, Node.js y MongoDB.",
        "Implementación de arquitectura de microservicios y CI/CD para mejorar la escalabilidad.",
        "Liderazgo de un equipo de 5 desarrolladores y mentoría a desarrolladores junior.",
        "Optimización del rendimiento que resultó en una mejora del 40% en los tiempos de carga de la página."
      ]
    },
    {
      title: t('experience2.title', 'Web Developer'),
      company: t('experience2.company', 'Digital Agency'),
      location: t('experience2.location', 'Barcelona, España'),
      period: t('experience2.period', 'Marzo 2018 - Diciembre 2020'),
      description: [
        "Desarrollo de sitios web y aplicaciones para clientes de diversos sectores.",
        "Implementación de soluciones e-commerce usando Symfony y PHP.",
        "Colaboración con diseñadores UX/UI para implementar interfaces atractivas y funcionales.",
        "Optimización de bases de datos y consultas SQL para mejorar el rendimiento."
      ]
    },
    {
      title: t('experience3.title', 'Junior Developer'),
      company: t('experience3.company', 'StartUp Tech'),
      location: t('experience3.location', 'Valencia, España'),
      period: t('experience3.period', 'Junio 2016 - Febrero 2018'),
      description: [
        "Desarrollo frontend utilizando HTML, CSS y JavaScript.",
        "Contribución al desarrollo de una aplicación móvil híbrida con Ionic.",
        "Implementación de pruebas unitarias y de integración.",
        "Corrección de bugs y mejoras de rendimiento en aplicaciones existentes."
      ]
    }
  ];
  
  const experiences = fallbackExperiences;

  return (
    <section id="experience" className="py-16 lg:py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title', 'Experiencia Profesional')}</h2>
        </FadeInWhenVisible>
        
        <div className="relative border-l-4 border-secondary ml-6 md:ml-0 pl-8 space-y-10">
          <StaggerContainer>
            {experiences.map((exp, index) => (
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
                    <Briefcase className="h-4 w-4 text-white" />
                  </motion.div>
                  
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-slate-700">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {exp.title}
                    </h3>
                    <p className="text-lg text-secondary font-medium">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex flex-col md:items-end mt-2 md:mt-0 text-sm text-gray-600 dark:text-gray-300">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-4 w-4" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>
                
                    <ul className="space-y-2">
                      {exp.description.map((item, itemIndex) => (
                        <motion.li 
                          key={itemIndex} 
                          className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span className="h-1.5 w-1.5 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
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

export default Experience;