import { useState } from 'react';
import {ExternalLink, Github, Code, Image, FileCode2} from 'lucide-react';
import {Badge} from '@/components/ui/badge';
import {Card, CardContent, CardFooter, CardHeader} from '@/components/ui/card';
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { useProjects } from '@/hooks/useApi';

interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    githubUrl: string;
    liveUrl?: string;
}

const ProjectImagePlaceholder = () => (
    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center">
        <div className="text-center text-gray-400 dark:text-gray-500">
            <FileCode2 className="h-16 w-16 mx-auto mb-2" />
            <p className="text-sm font-medium">Project Image</p>
        </div>
    </div>
);

const ProjectImage = ({ src, alt, title }: { src: string; alt: string; title: string }) => {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    // Show placeholder if no src provided, or if there's an error, or if src is empty/null
    if (!src || src.trim() === '' || imageError) {
        return <ProjectImagePlaceholder />;
    }

    return (
        <>
            {imageLoading && (
                <div className="w-full h-full bg-gray-200 dark:bg-slate-600 animate-pulse flex items-center justify-center">
                    <Image className="h-12 w-12 text-gray-400 dark:text-gray-500" />
                </div>
            )}
            <motion.img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-transform duration-500 hover:scale-110 ${imageLoading ? 'hidden' : 'block'}`}
                onError={handleImageError}
                onLoad={handleImageLoad}
                whileHover={{scale: 1.1}}
                transition={{duration: 0.3}}
            />
        </>
    );
};

const Projects = () => {
    const {t} = useTranslation('projects');
    const { projectsData, loading, error } = useProjects();

    // Show loading state
    if (loading || projectsData.length === 0) {
        return (
            <section id="projects" className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-300">Loading projects...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="projects" className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <strong>Error loading projects:</strong> {error}
                    </div>
                )}
                
                <FadeInWhenVisible delay={0.1}>
                    <h2 className="section-heading pb-3 mb-12">{t('title')}</h2>
                </FadeInWhenVisible>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectsData.map((project, index) => (
                        <FadeInWhenVisible 
                            key={index}
                            delay={index * 0.1}
                            duration={0.4}
                        >
                            <motion.div
                                whileHover={{y: -5}}
                                transition={{duration: 0.2}}
                            >
                            <Card className="project-card overflow-hidden h-full flex flex-col">
                                <div className="h-48 overflow-hidden">
                                    <ProjectImage 
                                        src={project.image}
                                        alt={project.title}
                                        title={project.title}
                                    />
                                </div>

                                <CardHeader className="pb-2">
                                    <h3 className="text-xl font-bold">
                                        {project.title}
                                    </h3>
                                </CardHeader>

                                <CardContent className="flex-grow">
                                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.map((tag, tagIndex) => (
                                            <motion.div
                                                key={tagIndex}
                                                whileHover={{scale: 1.1}}
                                                transition={{duration: 0.2}}
                                            >
                                                <Badge variant="secondary"
                                                       className="bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-200">
                                                    <Code className="h-3 w-3 mr-1"/>
                                                    {tag}
                                                </Badge>
                                            </motion.div>
                                        ))}
                                    </div>
                                </CardContent>

                                <CardFooter className="flex gap-3">
                                    <motion.a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                                        whileHover={{scale: 1.05}}
                                        whileTap={{scale: 0.95}}
                                    >
                                        <Github className="h-4 w-4"/>
                                        {t('buttons.code')}
                                    </motion.a>

                                    {project.liveUrl && (
                                        <motion.a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-3 py-2 text-sm bg-secondary text-white rounded-md hover:bg-secondary/90 transition-colors"
                                            whileHover={{scale: 1.05}}
                                            whileTap={{scale: 0.95}}
                                        >
                                            <ExternalLink className="h-4 w-4"/>
                                            {t('buttons.demo')}
                                        </motion.a>
                                    )}
                                </CardFooter>
                            </Card>
                            </motion.div>
                        </FadeInWhenVisible>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;