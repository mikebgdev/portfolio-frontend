import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import StaggerItem from '@/components/animations/StaggerItem';
import { useExperience } from '@/hooks/useApi';

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
}

const Experience = () => {
  const { t } = useTranslation('experience');
  const { experienceData, loading, error } = useExperience();

  // Show loading state
  if (loading || experienceData.length === 0) {
    return (
      <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading experience...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
      <section id="experience" className="py-20 bg-gray-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error loading experience:</strong> {error}
          </div>
        )}
        
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title')}</h2>
        </FadeInWhenVisible>

          <div className="relative border-l-4 border-secondary ml-6 md:ml-0 pl-6 space-y-12">
            {experienceData.map((exp, index) => (
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
                          {item}
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