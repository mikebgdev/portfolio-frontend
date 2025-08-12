import { useLanguage } from '../hooks/useLanguage';

export const ProjectsPage = () => {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Modern React portfolio with dark mode, internationalization, and responsive design.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux'],
      githubUrl: 'https://github.com/mikebgdev/portfolio',
      demoUrl: 'https://portfolio.mikebgdev.com',
      image: '🌐',
    },
    {
      id: 2,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with user authentication, payment processing, and admin panel.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      githubUrl: 'https://github.com/mikebgdev/ecommerce',
      demoUrl: 'https://shop.mikebgdev.com',
      image: '🛒',
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team collaboration features.',
      technologies: ['React', 'FastAPI', 'MongoDB', 'WebSocket'],
      githubUrl: 'https://github.com/mikebgdev/taskmanager',
      demoUrl: 'https://tasks.mikebgdev.com',
      image: '📋',
    },
  ];

  return (
    <div className="container-responsive section-padding">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">
          {t('projects.title')}
        </h1>
        
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="text-6xl text-center mb-4">
                  {project.image}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold mb-2 text-primary-light dark:text-primary-dark">
                    {t('projects.technologies')}:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-center rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    {t('projects.viewGitHub')}
                  </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-primary-light dark:bg-primary-dark text-white text-center rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
                  >
                    {t('projects.viewDemo')}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};