import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';

export const HomePage = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  return (
    <div className="container-responsive section-padding">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {t('home.welcome')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          {t('home.description', { theme })}
        </p>
      </section>
      
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800 dark:text-blue-300">
            {t('home.themeSystem.title')}
          </h3>
          <p className="text-gray-700 dark:text-gray-400">
            {t('home.themeSystem.description')}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 p-8 rounded-xl border border-purple-200 dark:border-purple-800">
          <h3 className="text-2xl font-semibold mb-4 text-purple-800 dark:text-purple-300">
            {t('home.reduxStore.title')}
          </h3>
          <p className="text-gray-700 dark:text-gray-400">
            {t('home.reduxStore.description')}
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-8 rounded-xl border border-green-200 dark:border-green-800">
          <h3 className="text-2xl font-semibold mb-4 text-green-800 dark:text-green-300">
            {t('home.development.title')}
          </h3>
          <p className="text-gray-700 dark:text-gray-400">
            {t('home.development.description')}
          </p>
        </div>
      </section>

      <section className="text-center bg-gray-50 dark:bg-gray-800 rounded-2xl p-12">
        <h2 className="text-3xl font-bold mb-6">
          {t('about.profession')}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          {t('about.description')}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'Vite'].map((tech) => (
            <span
              key={tech}
              className="px-6 py-3 bg-white dark:bg-gray-700 rounded-full text-sm font-medium shadow-md border border-gray-200 dark:border-gray-600"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};