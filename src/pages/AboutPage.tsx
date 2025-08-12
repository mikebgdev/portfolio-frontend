import { useLanguage } from '../hooks/useLanguage';

export const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('about.title')}
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-primary-light dark:text-primary-dark">
              {t('about.profession')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('about.description')}
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-primary-light dark:bg-primary-dark text-white rounded-lg hover:opacity-90 transition-opacity">
              <span className="mr-2">📄</span>
              {t('about.downloadCV')}
            </button>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-6xl">
              👨‍💻
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};