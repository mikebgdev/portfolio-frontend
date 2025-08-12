import { useLanguage } from '../hooks/useLanguage';

export const SkillsPage = () => {
  const { t } = useLanguage();

  const technicalSkills = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'JavaScript', level: 95, category: 'frontend' },
    { name: 'Tailwind CSS', level: 88, category: 'frontend' },
    { name: 'Node.js', level: 82, category: 'backend' },
    { name: 'Python', level: 78, category: 'backend' },
    { name: 'PostgreSQL', level: 80, category: 'database' },
    { name: 'MongoDB', level: 75, category: 'database' },
  ];

  const interpersonalSkills = [
    'Team Leadership',
    'Project Management',
    'Problem Solving',
    'Communication',
    'Agile Methodologies',
    'Code Review',
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'frontend': return 'from-blue-500 to-cyan-500';
      case 'backend': return 'from-green-500 to-emerald-500';
      case 'database': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('skills.title')}
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-primary-light dark:text-primary-dark">
              {t('skills.technical')}
            </h2>
            
            <div className="space-y-6">
              {technicalSkills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-500">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${getCategoryColor(skill.category)}`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interpersonal Skills */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-primary-light dark:text-primary-dark">
              {t('skills.interpersonal')}
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {interpersonalSkills.map((skill) => (
                <div
                  key={skill}
                  className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg text-center border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};