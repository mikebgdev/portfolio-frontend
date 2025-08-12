import { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { ThemeToggle } from './ThemeToggle';
import { LanguageToggle } from './LanguageToggle';
import {
  useGetAboutQuery,
  useGetSkillsQuery,
  useGetFeaturedProjectsQuery,
  useGetExperienceQuery,
  useGetEducationQuery,
  useGetContactQuery,
  useSendContactMessageMutation,
} from '../services/portfolioApi';

export const LandingPage = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // API Queries
  const { data: aboutData, error: aboutError, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: skillsData, error: skillsError, isLoading: skillsLoading } = useGetSkillsQuery();
  const { data: projectsData, error: projectsError, isLoading: projectsLoading } = useGetFeaturedProjectsQuery();
  const { data: experienceData, error: experienceError, isLoading: experienceLoading } = useGetExperienceQuery();
  const { data: educationData, error: educationError, isLoading: educationLoading } = useGetEducationQuery();
  const { data: contactData, error: contactError } = useGetContactQuery();
  
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


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };


  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'web_development': return 'from-blue-500 to-cyan-500';
      case 'infrastructure': return 'from-green-500 to-emerald-500';
      case 'tools': return 'from-purple-500 to-pink-500';
      case 'interpersonal': return 'from-yellow-500 to-orange-500';
      case 'learning': return 'from-indigo-500 to-purple-500';
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
              <a href="#experience" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('navigation.experience')}
              </a>
              <a href="#education" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('navigation.education')}
              </a>
              <a href="#contact" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {t('navigation.contact')}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-black dark:via-purple-950 dark:to-black">
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle, rgba(156, 146, 172, 0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}></div>
          
          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-24 h-24 bg-cyan-500/10 rounded-full blur-xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container-responsive text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            {aboutLoading ? (
              <div className="animate-pulse space-y-6">
                <div className="h-20 bg-white/10 rounded-lg"></div>
                <div className="h-8 bg-white/10 rounded-lg w-3/4 mx-auto"></div>
                <div className="h-32 bg-white/10 rounded-lg w-48 mx-auto"></div>
              </div>
            ) : (
              <>
                {/* Profile Image */}
                <div className="mb-8 flex justify-center">
                  {aboutData?.photo_url ? (
                    <div className="relative">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl backdrop-blur-sm">
                        <img 
                          src={aboutData.photo_url} 
                          alt={`${aboutData.name} ${aboutData.last_name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-purple-500/20 to-transparent"></div>
                    </div>
                  ) : (
                    <div className="w-40 h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-6xl border-4 border-white/20 shadow-2xl">
                      👨‍💻
                    </div>
                  )}
                </div>

                {/* Main Heading */}
                <h1 className="text-6xl md:text-8xl font-extrabold mb-6 text-white tracking-tight">
                  <span className="block">
                    {aboutData?.name || 'Michael'}
                  </span>
                  <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {aboutData?.last_name || 'Developer'}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Full Stack Developer & Software Engineer
                </p>

                {/* Bio excerpt */}
                <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                  {aboutData?.bio_en ? 
                    aboutData.bio_en.split('\r\n')[0].substring(0, 150) + '...' :
                    'Passionate about creating modern web applications with cutting-edge technologies and best practices.'
                  }
                </p>

                {aboutError && (
                  <div className="text-sm text-amber-400 bg-amber-500/10 backdrop-blur-sm border border-amber-400/20 p-4 rounded-lg mb-8 max-w-md mx-auto">
                    <div className="flex items-center justify-center gap-2">
                      <span>💡</span>
                      <span>Using fallback content - API integration ready</span>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a 
                href="#contact" 
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <span className="flex items-center justify-center gap-2">
                  <span>Get In Touch</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </a>
              <a 
                href="#projects" 
                className="px-8 py-4 border-2 border-white/20 text-white rounded-full hover:bg-white/10 transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:scale-105 transform"
              >
                View My Work
              </a>
            </div>

            {/* Location & Status */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400">
              {aboutData?.location && (
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span>Based in {aboutData.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Available for opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 animate-bounce">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-3 gap-12 items-start">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">👨‍💻</span>
                    Full Stack Developer
                  </h3>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    {aboutData?.bio_en ? (
                      <div className="space-y-4">
                        {aboutData.bio_en.split('\r\n').map((paragraph, index) => (
                          paragraph.trim() ? (
                            <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed">
                              {paragraph}
                            </p>
                          ) : null
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Passionate developer with experience in modern web technologies, focused on creating efficient and user-friendly applications. I love building solutions that make a difference and constantly learning new technologies.
                      </p>
                    )}
                  </div>

                  {aboutData?.extra_content_en && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                      <div className="space-y-4">
                        {aboutData.extra_content_en.split('\r\n').map((paragraph, index) => (
                          paragraph.trim() ? (
                            <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed">
                              {paragraph}
                            </p>
                          ) : null
                        ))}
                      </div>
                    </div>
                  )}

                  {aboutError && (
                    <div className="mt-6 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                      <div className="flex items-center gap-2">
                        <span>💡</span>
                        <span><strong>API Notice:</strong> Using fallback content - API integration ready</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Stats */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white text-center">
                    <div className="text-3xl font-bold mb-2">5+</div>
                    <div className="text-blue-100">Years Experience</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white text-center">
                    <div className="text-3xl font-bold mb-2">50+</div>
                    <div className="text-purple-100">Projects Completed</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white text-center">
                    <div className="text-3xl font-bold mb-2">100%</div>
                    <div className="text-green-100">Client Satisfaction</div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Personal Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                  <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Personal Info</h4>
                  
                  <div className="space-y-4">
                    {aboutData?.location && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400">📍</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Location</div>
                          <div className="text-gray-600 dark:text-gray-400">{aboutData.location}</div>
                        </div>
                      </div>
                    )}
                    
                    {aboutData?.nationality_en && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-purple-600 dark:text-purple-400">🌍</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Nationality</div>
                          <div className="text-gray-600 dark:text-gray-400">{aboutData.nationality_en}</div>
                        </div>
                      </div>
                    )}

                    {aboutData?.email && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-green-600 dark:text-green-400">✉️</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-800 dark:text-white">Email</div>
                          <div className="text-gray-600 dark:text-gray-400 break-all">{aboutData.email}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 dark:text-orange-400">💼</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Status</div>
                        <div className="text-gray-600 dark:text-gray-400">Available for work</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download CV Button */}
                {contactData?.cv_file_url && (
                  <a
                    href={contactData.cv_file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 text-white rounded-xl p-4 text-center font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <span>📄</span>
                      <span>Download CV</span>
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-6"></div>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Technologies and tools I use to bring ideas to life
              </p>
            </div>
            
            {skillsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : skillsError ? (
              <div className="text-center">
                <div className="inline-block text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl">💡</span>
                    <span className="font-semibold">API Notice</span>
                  </div>
                  <p>Unable to load skills from API, showing sample data</p>
                </div>
              </div>
            ) : skillsData && skillsData.length > 0 ? (
              <>
                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {skillsData.filter(skill => skill.activa).map((skill) => (
                    <div 
                      key={skill.id} 
                      className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:scale-105 transform"
                    >
                      {/* Skill Icon */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${getCategoryColor(skill.category)} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <span className="text-white font-bold text-lg">
                          {skill.category === 'web_development' ? '🌐' :
                           skill.category === 'infrastructure' ? '🏗️' :
                           skill.category === 'tools' ? '🛠️' :
                           skill.category === 'interpersonal' ? '🤝' :
                           skill.category === 'learning' ? '📚' : '💡'}
                        </span>
                      </div>

                      {/* Skill Name */}
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {skill.name}
                      </h3>

                      {/* Category */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {skill.category.replace('_', ' ')}
                        </span>
                        
                        {skill.is_in_progress && (
                          <span className="text-xs px-2 py-1 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full font-medium">
                            Learning
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Skills Categories Summary */}
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { category: 'web_development', label: 'Web Development', icon: '🌐', color: 'from-blue-500 to-cyan-500' },
                    { category: 'infrastructure', label: 'Infrastructure', icon: '🏗️', color: 'from-green-500 to-emerald-500' },
                    { category: 'tools', label: 'Tools', icon: '🛠️', color: 'from-purple-500 to-pink-500' },
                    { category: 'interpersonal', label: 'Soft Skills', icon: '🤝', color: 'from-yellow-500 to-orange-500' },
                    { category: 'learning', label: 'Learning', icon: '📚', color: 'from-indigo-500 to-purple-500' }
                  ].map((cat) => {
                    const count = skillsData.filter(skill => skill.activa && skill.category === cat.category).length;
                    return count > 0 ? (
                      <div key={cat.category} className={`bg-gradient-to-r ${cat.color} rounded-xl p-4 text-white text-center`}>
                        <div className="text-2xl mb-1">{cat.icon}</div>
                        <div className="font-bold text-lg">{count}</div>
                        <div className="text-xs opacity-90">{cat.label}</div>
                      </div>
                    ) : null;
                  })}
                </div>
              </>
            ) : null}

            {/* No data message */}
            {!skillsLoading && (!skillsData || skillsData.length === 0) && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Skills Coming Soon</h3>
                <p className="text-gray-600 dark:text-gray-400">Skills data will be loaded from the API.</p>
              </div>
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
                    <h3 className="text-xl font-semibold mb-3">{project.title_en}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description_en}</p>
                    
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.split(/[,;]/).map((tech, index) => (
                          tech.trim() && (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-xs font-medium"
                            >
                              {tech.trim()}
                            </span>
                          )
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      {project.source_url && (
                        <a
                          href={project.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white text-center rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                          GitHub
                        </a>
                      )}
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

            {/* No data message */}
            {!projectsLoading && (!projectsData || projectsData.length === 0) && (
              <div className="text-center text-gray-600 dark:text-gray-400 py-8">
                <p>No projects data available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{t('experience.title')}</h2>
            
            {experienceLoading ? (
              <div className="animate-pulse space-y-6">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-1/3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : experienceError ? (
              <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-8">
                💡 <strong>API Notice:</strong> Unable to load experience from API, showing sample data
              </div>
            ) : experienceData && experienceData.length > 0 ? (
              <div className="space-y-6">
                {experienceData.map((experience) => (
                  <div key={experience.id} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          {experience.position_en}
                        </h3>
                        <h4 className="text-lg font-medium mb-2">{experience.company}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {new Date(experience.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {experience.end_date ? new Date(experience.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Present'}
                        </p>
                      </div>
                      {experience.location && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          📍 {experience.location}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {experience.description_en.split('\r\n').map((paragraph, index) => (
                        paragraph.trim() ? <p key={index} className="mb-2">{paragraph}</p> : null
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-8">
                💡 <strong>API Notice:</strong> Experience API integration ready - no data available
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section-padding">
        <div className="container-responsive">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">{t('education.title')}</h2>
            
            {educationLoading ? (
              <div className="animate-pulse space-y-6">
                {[1,2].map(i => (
                  <div key={i} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-1/3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-1/4"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : educationError ? (
              <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-8">
                💡 <strong>API Notice:</strong> Unable to load education from API, showing sample data
              </div>
            ) : educationData && educationData.length > 0 ? (
              <div className="space-y-6">
                {educationData.map((education) => (
                  <div key={education.id} className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">
                          {education.degree_en}
                        </h3>
                        <h4 className="text-lg font-medium mb-2">{education.institution}</h4>
                        {education.field_of_study_en && (
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {education.field_of_study_en}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          {new Date(education.start_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} - {education.end_date ? new Date(education.end_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Present'}
                        </p>
                      </div>
                      {education.location && (
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          📍 {education.location}
                        </div>
                      )}
                    </div>
                    {education.description_en && (
                      <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {education.description_en.split('\r\n').map((paragraph, index) => (
                          paragraph.trim() ? <p key={index} className="mb-2">{paragraph}</p> : null
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-8">
                💡 <strong>API Notice:</strong> Education API integration ready - no data available
              </div>
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
                    {contactData?.contact_message_en || "I'm always interested in new opportunities and collaborations."}
                  </p>
                  
                  {contactError && (
                    <div className="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-3 rounded-lg mb-6">
                      💡 <strong>API Notice:</strong> Unable to load contact data from API, using fallback content
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  {contactData?.email && (
                    <a
                      href={`mailto:${contactData.email}`}
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-2xl">✉️</span>
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {contactData.email}
                        </div>
                      </div>
                    </a>
                  )}
                  
                  {contactData?.linkedin_url && (
                    <a
                      href={contactData.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-2xl">👤</span>
                      <div>
                        <div className="font-medium">LinkedIn</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Professional Profile
                        </div>
                      </div>
                    </a>
                  )}
                  
                  {contactData?.github_url && (
                    <a
                      href={contactData.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-2xl">🐙</span>
                      <div>
                        <div className="font-medium">GitHub</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Open Source Projects
                        </div>
                      </div>
                    </a>
                  )}
                  
                  {contactData?.cv_file_url && (
                    <a
                      href={contactData.cv_file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-lg hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-700"
                    >
                      <span className="text-2xl">📄</span>
                      <div>
                        <div className="font-medium">Download CV</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          PDF Resume
                        </div>
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-8">
        <div className="container-responsive text-center">
          <p>
            © {new Date().getFullYear()} {aboutData ? `${aboutData.name} ${aboutData.last_name}` : 'Portfolio'}. 
            Built with React, TypeScript & Tailwind CSS.
          </p>
          {aboutData?.location && (
            <p className="text-sm text-gray-400 mt-2">
              Based in {aboutData.location} • {aboutData.nationality_en}
            </p>
          )}
        </div>
      </footer>
    </div>
  );
};