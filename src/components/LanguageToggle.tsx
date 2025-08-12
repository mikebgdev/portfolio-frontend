import { useLanguage } from '../hooks/useLanguage';

interface LanguageToggleProps {
  className?: string;
  showLabels?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ 
  className = '', 
  showLabels = true 
}) => {
  const { language, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className={`
        flex items-center gap-2 p-2
        rounded-md 
        bg-gray-200 dark:bg-gray-800 
        text-gray-800 dark:text-gray-200
        hover:bg-gray-300 dark:hover:bg-gray-700
        transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500
        ${className}
      `}
      aria-label={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
      title={`Switch to ${language === 'en' ? 'Spanish' : 'English'}`}
    >
      <span className="text-base">
        {language === 'en' ? '🇺🇸' : '🇪🇸'}
      </span>
      {showLabels && (
        <span className="text-sm font-medium">
          {language === 'en' ? 'EN' : 'ES'}
        </span>
      )}
    </button>
  );
};