import { useState, useEffect } from 'react';
import {
  useGetAboutQuery,
  useGetSkillsQuery,
  useGetContactQuery,
} from '../services/portfolioApi';

export const LandingPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // API Queries
  const { data: aboutData, error: aboutError, isLoading: aboutLoading } = useGetAboutQuery();
  const { data: skillsData, error: skillsError, isLoading: skillsLoading } = useGetSkillsQuery();
  const { data: contactData } = useGetContactQuery();

  // Dark mode toggle
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}>
        <nav className="container-responsive">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="text-2xl font-bold text-blue-900 dark:text-white">
              Portfolio
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Inicio
              </a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Sobre mí
              </a>
              <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Habilidades
              </a>
              <a href="#projects" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Proyectos
              </a>
              <a href="#experience" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Experiencia
              </a>
              <a href="#education" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Educación
              </a>
              <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium">
                Contacto
              </a>
            </div>

            {/* Dark Mode Toggle & Mobile Menu */}
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-300"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-slate-900 shadow-lg border-t border-gray-200 dark:border-slate-700">
              <div className="py-4 space-y-2">
                <a href="#home" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Inicio
                </a>
                <a href="#about" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Sobre mí
                </a>
                <a href="#skills" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Habilidades
                </a>
                <a href="#projects" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Proyectos
                </a>
                <a href="#experience" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Experiencia
                </a>
                <a href="#education" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Educación
                </a>
                <a href="#contact" className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  Contacto
                </a>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.1) 0%, transparent 50%)`
          }}></div>
        </div>

        <div className="container-responsive text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            {/* Profile Image */}
            <div className="mb-8 animate-fade-in-delay-1">
              {aboutData?.photo_url ? (
                <img 
                  src={aboutData.photo_url} 
                  alt={`${aboutData.name} ${aboutData.last_name}`}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-white dark:border-slate-700 shadow-xl"
                />
              ) : (
                <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl border-4 border-white dark:border-slate-700 shadow-xl">
                  👨‍💻
                </div>
              )}
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-delay-2">
              Hola, soy{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {aboutData ? `${aboutData.name} ${aboutData.last_name}` : 'Michael Ballester'}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-fade-in-delay-3">
              Desarrollador de Software Profesional
            </p>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-delay-3">
              {aboutData?.bio_en ? 
                aboutData.bio_en.split('\r\n')[0] :
                'Especializado en desarrollo web moderno, creando experiencias digitales excepcionales con las últimas tecnologías.'
              }
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3">
              <a 
                href="#contact" 
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg hover:shadow-xl hover-lift"
              >
                Contáctame
              </a>
              <a 
                href="#projects" 
                className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-semibold hover-lift"
              >
                Ver mis proyectos
              </a>
            </div>

            {/* API Error Notice */}
            {aboutError && (
              <div className="mt-8 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg max-w-md mx-auto">
                <div className="flex items-center gap-2">
                  <span>💡</span>
                  <span>Mostrando contenido de respaldo - API lista para integrar</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gray-50 dark:bg-slate-800">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 section-heading">
                Sobre mí
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Conoce más sobre mi experiencia y pasión por el desarrollo
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="animate-fade-in-delay-1">
                {aboutLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ) : (
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
                      <>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                          Soy un desarrollador apasionado con experiencia en desarrollo web full-stack. 
                          Mi enfoque se centra en crear soluciones innovadoras y eficientes utilizando 
                          las tecnologías más modernas del mercado.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                          Con experiencia en React, TypeScript, Node.js y diversas bases de datos, 
                          me especializo en construir aplicaciones web escalables y de alto rendimiento.
                        </p>
                      </>
                    )}

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

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200 dark:border-gray-600">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Años de experiencia</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Proyectos completados</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Cliente satisfecho</div>
                      </div>
                    </div>

                    {aboutError && (
                      <div className="mt-6 text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-2">
                          <span>💡</span>
                          <span><strong>API Notice:</strong> Using fallback content - API integration ready</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Image & Info */}
              <div className="animate-fade-in-delay-2">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-slate-700">
                  {/* Profile Image */}
                  <div className="text-center mb-8">
                    {aboutData?.photo_url ? (
                      <img 
                        src={aboutData.photo_url} 
                        alt={`${aboutData.name} ${aboutData.last_name}`}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-blue-100 dark:border-blue-900 shadow-lg"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full mx-auto bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl border-4 border-blue-100 dark:border-blue-900 shadow-lg">
                        👨‍💻
                      </div>
                    )}
                  </div>

                  {/* Personal Info */}
                  <div className="space-y-4">
                    {aboutData?.location && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                          <span className="text-blue-600 dark:text-blue-400">📍</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">Ubicación</div>
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
                          <div className="font-medium text-gray-900 dark:text-white">Nacionalidad</div>
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
                          <div className="font-medium text-gray-900 dark:text-white">Email</div>
                          <div className="text-gray-600 dark:text-gray-400 break-all text-sm">{aboutData.email}</div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <span className="text-orange-600 dark:text-orange-400">💼</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Estado</div>
                        <div className="text-gray-600 dark:text-gray-400">Disponible para trabajar</div>
                      </div>
                    </div>

                    {/* Download CV */}
                    {contactData?.cv_file_url && (
                      <a
                        href={contactData.cv_file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all hover-lift"
                      >
                        📄 Descargar CV
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="container-responsive">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 section-heading">
                Habilidades
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Tecnologías y herramientas que domino
              </p>
            </div>

            {skillsLoading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1,2,3,4,5,6,7,8].map(i => (
                  <div key={i} className="skill-item animate-pulse">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : skillsError ? (
              <div className="text-center">
                <div className="inline-block text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-2xl">💡</span>
                    <span className="font-semibold">API Notice</span>
                  </div>
                  <p>Unable to load skills from API, showing sample data</p>
                </div>
              </div>
            ) : skillsData && skillsData.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in-delay-1">
                {skillsData.filter(skill => skill.activa).map((skill) => (
                  <div key={skill.id} className="skill-item hover-lift">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{skill.name}</h3>
                      {skill.is_in_progress && (
                        <span className="text-xs px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full">
                          Aprendiendo
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {skill.category.replace('_', ' ')}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Habilidades próximamente</h3>
                <p className="text-gray-600 dark:text-gray-400">Las habilidades se cargarán desde la API.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container-responsive">
          <div className="text-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2">Portfolio</h3>
              <p className="text-slate-300">Desarrollador de software profesional</p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-8">
              {contactData?.github_url && (
                <a
                  href={contactData.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <span>🐙</span>
                </a>
              )}
              {contactData?.linkedin_url && (
                <a
                  href={contactData.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <span>💼</span>
                </a>
              )}
              {contactData?.email && (
                <a
                  href={`mailto:${contactData.email}`}
                  className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-colors"
                >
                  <span>✉️</span>
                </a>
              )}
            </div>

            <div className="border-t border-slate-700 pt-8">
              <p className="text-slate-400">
                © {new Date().getFullYear()} {aboutData ? `${aboutData.name} ${aboutData.last_name}` : 'Portfolio'}. 
                Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};