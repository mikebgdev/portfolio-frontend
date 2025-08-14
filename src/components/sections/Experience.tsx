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
      <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title', 'Experiencia Profesional')}</h2>
        </FadeInWhenVisible>

          <div className="relative border-l-4 border-secondary ml-6 md:ml-0 pl-6 space-y-12">
            {experiences.map((exp, index) => (
              <StaggerItem key={index}>
                <motion.div
                  className="relative"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div
                    className="absolute -left-[42px] p-2 bg-secondary rounded-full"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Briefcase className="h-4 w-4 text-white" />
                  </motion.div>
                  <div className="bg-white dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <div className="text-secondary font-medium flex items-center mt-2 md:mt-0">
                        <Calendar className="h-4 w-4 mr-1" />
                        {exp.period}
                      </div>
                    </div>

                    <div className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
                      <span className="font-medium">{exp.company}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                        {exp.location}
                  </span>
                    </div>

                    <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
                      {exp.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;