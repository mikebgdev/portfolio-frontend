import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import StaggerItem from '@/components/animations/StaggerItem';
import { useEducation } from '@/hooks/useApi';

interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
}

const Education = () => {
  const { t } = useTranslation('education');
  const { educationData, loading, error } = useEducation();

  // Show loading state
  if (loading || educationData.length === 0) {
    return (
      <section id="education" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading education...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
      <section id="education" className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Error loading education:</strong> {error}
          </div>
        )}
        
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title')}</h2>
        </FadeInWhenVisible>

          <div className="relative border-l-4 border-secondary ml-6 md:ml-0 pl-6 space-y-12">
            {educationData.map((item, index) => (
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
                    <GraduationCap className="h-4 w-4 text-white" />
                  </motion.div>

                  <div className="bg-gray-50 dark:bg-slate-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                    <h3 className="text-xl font-bold">
                      {item.degree}
                    </h3>
                      <div className="text-secondary font-medium flex items-center mt-2 md:mt-0">
                        <Calendar className="h-4 w-4 mr-1" />
                        {item.period}
                      </div>
                    </div>

                    <div className="mb-4 flex items-center text-gray-600 dark:text-gray-300">
                      <span className="font-medium">{item.institution}</span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                        {item.location}
                  </span>
                    </div>
                
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Education;