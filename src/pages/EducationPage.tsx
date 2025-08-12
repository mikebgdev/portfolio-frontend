import { useLanguage } from '../hooks/useLanguage';

export const EducationPage = () => {
  const { t } = useLanguage();

  const education = [
    {
      id: 1,
      institution: 'University of Technology',
      degree: 'Bachelor of Science in Computer Science',
      period: '2015 - 2019',
      location: 'Boston, MA',
      description: 'Focused on software engineering, data structures, and algorithms. Graduated Magna Cum Laude.',
      courses: [
        'Data Structures & Algorithms',
        'Software Engineering',
        'Database Systems',
        'Web Development',
      ],
    },
    {
      id: 2,
      institution: 'Code Academy',
      degree: 'Full Stack Web Development Bootcamp',
      period: '2019',
      location: 'Online',
      description: 'Intensive 6-month program covering modern web development technologies and best practices.',
      courses: [
        'React & Redux',
        'Node.js & Express',
        'MongoDB & PostgreSQL',
        'DevOps & Deployment',
      ],
    },
  ];

  const certifications = [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023',
      credential: 'AWS-DEV-2023-001',
    },
    {
      name: 'React Professional Certificate',
      issuer: 'Meta',
      date: '2022',
      credential: 'META-REACT-2022-001',
    },
    {
      name: 'Scrum Master Certified',
      issuer: 'Scrum Alliance',
      date: '2021',
      credential: 'CSM-2021-001',
    },
  ];

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('education.title')}
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-primary-light dark:text-primary-dark">
              Education
            </h2>
            
            <div className="space-y-8">
              {education.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-primary-light dark:text-primary-dark">
                      {edu.degree}
                    </h3>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {edu.institution}
                    </h4>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {edu.period} • {edu.location}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {edu.description}
                  </p>
                  
                  <div>
                    <h5 className="font-semibold mb-2">Key Courses:</h5>
                    <div className="flex flex-wrap gap-2">
                      {edu.courses.map((course, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-2xl font-semibold mb-8 text-primary-light dark:text-primary-dark">
              Certifications
            </h2>
            
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">
                        {cert.name}
                      </h3>
                      <p className="text-green-700 dark:text-green-400 text-sm mb-2">
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Credential: {cert.credential}
                      </p>
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                      {cert.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};