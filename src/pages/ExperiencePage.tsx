import { useLanguage } from '../hooks/useLanguage';

export const ExperiencePage = () => {
  const { t } = useLanguage();

  const experiences = [
    {
      id: 1,
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      location: 'Remote',
      description: 'Led development of scalable web applications using React, Node.js, and cloud technologies. Mentored junior developers and collaborated with cross-functional teams.',
      achievements: [
        'Increased application performance by 40%',
        'Implemented CI/CD pipelines',
        'Led team of 5 developers',
      ],
    },
    {
      id: 2,
      company: 'Digital Agency Co.',
      position: 'Frontend Developer',
      period: '2020 - 2022',
      location: 'New York, NY',
      description: 'Developed responsive web applications and collaborated with design teams to create engaging user experiences.',
      achievements: [
        'Built 15+ client websites',
        'Improved SEO scores by 60%',
        'Integrated third-party APIs',
      ],
    },
    {
      id: 3,
      company: 'StartupXYZ',
      position: 'Junior Developer',
      period: '2019 - 2020',
      location: 'San Francisco, CA',
      description: 'Contributed to MVP development and learned modern web development practices in a fast-paced startup environment.',
      achievements: [
        'Contributed to product launch',
        'Learned React and modern JavaScript',
        'Participated in agile development',
      ],
    },
  ];

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('experience.title')}
        </h1>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-light dark:bg-primary-dark"></div>
          
          <div className="space-y-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary-light dark:bg-primary-dark rounded-full border-4 border-white dark:border-gray-900"></div>
                
                <div className="ml-16 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 w-full">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark">
                        {exp.position}
                      </h3>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                        {exp.company}
                      </h4>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2 md:mt-0">
                      <div>{exp.period}</div>
                      <div>{exp.location}</div>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {exp.description}
                  </p>
                  
                  <div>
                    <h5 className="font-semibold mb-2">Key Achievements:</h5>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};