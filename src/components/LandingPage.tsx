import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useTheme } from '../hooks/useTheme';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import { AdminPanel } from './AdminPanel';
import {
  useGetAboutQuery,
  useGetSkillsQuery,
  useGetFeaturedProjectsQuery,
  useSendContactMessageMutation,
} from '../services/portfolioApi';

export const LandingPage = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [showAdmin, setShowAdmin] = useState(false);

  // API Queries
  const { data: aboutData, error: aboutError, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: skillsData, error: skillsError, isLoading: skillsLoading } = useGetSkillsQuery();
  const { data: projectsData, error: projectsError, isLoading: projectsLoading } = useGetFeaturedProjectsQuery();
  
  // Contact mutation
  const [sendMessage, { isLoading: sendingMessage }] = useSendContactMessageMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const result = await sendMessage(formData).unwrap();
      if (result.success) {
        alert(result.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error: any) {
      console.error('Failed to send message:', error);
      alert('Failed to send message. Please try again later.');
    }
  };

  if (showAdmin) {
    return <AdminPanel />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // TODO: These should come from API
  const suggestedSkills = [
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'TypeScript', level: 85, category: 'frontend' },
    { name: 'Node.js', level: 82, category: 'backend' },
    { name: 'Python', level: 78, category: 'backend' },
  ];

  const suggestedProjects = [
    {
      id: 1,
      title: 'Portfolio Website',
      description: 'Modern React portfolio with dark mode and internationalization.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      githubUrl: '#', // TODO: Get from API
      demoUrl: '#', // TODO: Get from API
    },
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
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 z-50">
        <div className="container-responsive">
          <div className="flex justify-between items-center h-16">
            <a href="#home" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Portfolio
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('navigation.about')}
              </a>
              <a href="#skills" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('navigation.skills')}
              </a>
              <a href="#projects" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('navigation.projects')}
              </a>
              <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('navigation.contact')}
              </a>
              <button 
                onClick={() => setShowAdmin(true)}
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t('navigation.admin')}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container-responsive text-center">
          <div className="max-w-4xl mx-auto">
            {aboutLoading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
              </div>
            ) : (
              <>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {aboutData?.name || 'Full Stack Developer'}
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
                  {aboutData?.description || 'Building modern web applications with React, TypeScript, and cutting-edge technologies'}
                </p>
                {aboutError && (
                  <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-4">
                    💡 <strong>API Notice:</strong> Unable to load profile data from API, showing fallback content
                  </div>
                )}
              </>
            )}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <a href="#contact" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                {t('contact.title')}
              </a>
              <a href="#projects" className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                {t('projects.title')}
              </a>
            </div>
            
            {/* Theme indicator */}
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current theme: <span className="font-medium">{theme}</span> mode
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">{t('about.title')}</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                  {aboutData?.profession || t('about.profession')}
                </h3>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  {aboutData?.description || 'Passionate developer with experience in modern web technologies, focused on creating efficient and user-friendly applications.'}
                </p>
                {aboutError && (
                  <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg">
                    💡 <strong>API Notice:</strong> About content is using fallback data - API integration ready
                  </div>
                )}
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
                <div className="w-48 h-48 mx-auto bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-6xl">
                  👨‍💻
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{t('skills.title')}</h2>
            
            {skillsLoading ? (
              <div className="animate-pulse space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : skillsError ? (
              <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-8">
                💡 <strong>API Notice:</strong> Unable to load skills from API, showing sample data
              </div>
            ) : skillsData && skillsData.length > 0 ? (
              <div className="space-y-6">
                {skillsData.filter(skill => skill.level).map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full bg-gradient-to-r ${getCategoryColor(skill.category || 'default')}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Fallback skills if no API data */}
            {!skillsLoading && (!skillsData || skillsData.length === 0) && (
              <>
                <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-8">
                  💡 <strong>API Notice:</strong> Skills API integration ready - showing sample data
                </div>
                <div className="space-y-6">
                  {suggestedSkills.map((skill) => (
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
              </>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section-padding">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{t('projects.title')}</h2>
            
            {projectsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1,2,3].map(i => (
                  <div key={i} className="animate-pulse bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="flex gap-2 mb-6">
                      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex gap-3">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded flex-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : projectsError ? (
              <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-8">
                💡 <strong>API Notice:</strong> Unable to load projects from API, showing sample data
              </div>
            ) : projectsData && projectsData.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                  >
                    <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                    
                    <div className="mb-6">
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
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-center rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                      >
                        GitHub
                      </a>
                      {project.demo_url && (
                        <a
                          href={project.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                        >
                          Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Fallback projects if no API data */}
            {!projectsLoading && (!projectsData || projectsData.length === 0) && (
              <>
                <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-8">
                  💡 <strong>API Notice:</strong> Projects API integration ready - showing sample data
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {suggestedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
                >
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="mb-6">
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
                      className="flex-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-center rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demoUrl}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-500 transition-colors text-sm font-medium"
                    >
                      Demo
                    </a>
                  </div>
                </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{t('contact.title')}</h2>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
                  Send a Message
                </h3>
                
                {sendingMessage && (
                  <div className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-6">
                    ⏳ Sending message...
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('contact.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('contact.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('contact.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-vertical"
                      placeholder="Your message..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={sendingMessage}
                    className={`w-full px-6 py-3 text-white rounded-lg font-medium transition-colors ${
                      sendingMessage 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                  >
                    {sendingMessage ? 'Sending...' : t('contact.send')}
                  </button>
                </form>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-blue-600 dark:text-blue-400">
                    Get in Touch
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    I'm always interested in new opportunities and collaborations.
                  </p>
                  
                  <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-6">
                    💡 <strong>Suggestion:</strong> Social links should come from API
                  </div>
                </div>

                <div className="space-y-4">
                  <a
                    href="mailto:contact@example.com"
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-2xl">✉️</span>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        contact@example.com
                      </div>
                    </div>
                  </a>
                  
                  <a
                    href="#"
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                  >
                    <span className="text-2xl">🐙</span>
                    <div>
                      <div className="font-medium">GitHub</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        github.com/username
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="container-responsive text-center">
          <p>© 2024 Portfolio. Built with React, TypeScript & Tailwind CSS.</p>
          <div className="text-sm text-amber-400 bg-amber-900/20 p-2 rounded mt-4 inline-block">
            💡 Footer content should be configurable via API
          </div>
        </div>
      </footer>
    </div>
  );
};