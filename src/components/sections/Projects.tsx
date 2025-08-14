import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
}

const Projects = () => {
  const { t } = useTranslation('projects');
  
  const fallbackProjects: Project[] = [
    {
      title: t('project1.title', 'E-Commerce Platform'),
      description: t('project1.description', 'Una plataforma completa de comercio electrónico construida con React, Node.js y MongoDB. Incluye gestión de productos, carrito de compras, pasarela de pago y panel de administración.'),
      image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2664&auto=format&fit=crop&ixlib=rb-4.0.3",
      tags: ["React", "Node.js", "MongoDB", "Express", "Redux"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: t('project2.title', 'Task Management App'),
      description: t('project2.description', 'Aplicación de gestión de tareas con funcionalidades de arrastrar y soltar, categorías personalizables, recordatorios y estadísticas de productividad.'),
      image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3",
      tags: ["Vue.js", "Firebase", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: t('project3.title', 'Portfolio Website'),
      description: t('project3.description', 'Sitio web de portafolio personal construido con Symfony y React, con un panel de administración para gestionar contenido dinámico y soporte multilenguaje.'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&ixlib=rb-4.0.3",
      tags: ["Symfony", "React", "TypeScript", "MySQL"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: t('project4.title', 'Weather Dashboard'),
      description: t('project4.description', 'Dashboard meteorológico con pronósticos, mapas interactivos, alertas personalizadas y visualización de datos históricos del clima.'),
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3",
      tags: ["React", "D3.js", "API Integration", "Charts"],
      githubUrl: "#",
      liveUrl: "#"
    },
    {
      title: t('project5.title', 'Social Media Analytics'),
      description: t('project5.description', 'Herramienta de análisis de redes sociales que proporciona métricas detalladas, seguimiento de tendencias y generación de reportes automatizados.'),
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop&ixlib=rb-4.0.3",
      tags: ["Python", "Django", "PostgreSQL", "Chart.js"],
      githubUrl: "#"
    },
    {
      title: t('project6.title', 'Cryptocurrency Tracker'),
      description: t('project6.description', 'Aplicación para seguimiento de criptomonedas con alertas de precios, análisis de cartera, gráficos en tiempo real y noticias del mercado.'),
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2532&auto=format&fit=crop&ixlib=rb-4.0.3",
      tags: ["Next.js", "WebSocket", "Redis", "TradingView"],
      githubUrl: "#",
      liveUrl: "#"
    }
  ];
  
  const projects = fallbackProjects;

  return (
    <section id="projects" className="py-16 lg:py-20 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <FadeInWhenVisible delay={0.1}>
          <h2 className="section-heading pb-3 mb-12">{t('title', 'Proyectos')}</h2>
        </FadeInWhenVisible>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <CardHeader>
                    <h3 className="text-xl font-semibold group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.div
                          key={tagIndex}
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Badge variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-4 w-4" />
                      {t('buttons.code', 'Código')}
                    </motion.a>
                    
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 text-sm bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="h-4 w-4" />
                        {t('buttons.demo', 'Demo')}
                      </motion.a>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};

export default Projects;