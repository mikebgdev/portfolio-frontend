import React from 'react';
import * as LucideIcons from 'lucide-react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import StaggerContainer from '@/components/animations/StaggerContainer';
import { useSkills } from '@/hooks/useApi';

// Helper function to log available icons (for debugging)
const logAvailableIcons = () => {
    const iconNames = Object.keys(LucideIcons).filter(key => 
        typeof (LucideIcons as any)[key] === 'function' && 
        key !== 'createLucideIcon' && 
        key !== 'default'
    );
    return iconNames;
};

// Dynamic icon component that can render any Lucide React icon
const getIconComponent = (iconName: string, color?: string | null) => {
    if (!iconName) {
        return <LucideIcons.Code className={`h-5 w-5 ${color || 'text-gray-600'}`} />;
    }

    // If color is a CSS color value (hex, rgb, etc.), use style prop
    const isCustomColor = color && (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('hsl'));
    const iconProps = isCustomColor 
        ? { className: 'h-5 w-5', style: { color } }
        : { className: `h-5 w-5 ${color || 'text-gray-600'}` };

    // Clean the icon name - handle different naming conventions
    const toPascalCase = (str: string) => {
        return str
            .trim()
            .split(/[-_\s]+/) // Split on hyphens, underscores, or spaces
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join('');
    };
    
    const cleanIconName = toPascalCase(iconName);

    // Try multiple variations of the icon name
    const possibleNames = [
        cleanIconName, // PascalCase version (most likely to work)
        iconName, // Original name
        iconName.charAt(0).toUpperCase() + iconName.slice(1), // Simple capitalize
        iconName.toLowerCase(), // All lowercase
        iconName.replace(/[-_]/g, ''), // Remove separators but keep original case
    ];

    for (const name of possibleNames) {
        const IconComponent = (LucideIcons as any)[name];
        
        // Check if it's a valid component - try to render it
        if (IconComponent) {
            try {
                const result = <IconComponent {...iconProps} />;
                return result;
            } catch (error) {
                // Continue to next variation
            }
        }
    }
    
    // Fallback to Code icon if none of the variations work
    return <LucideIcons.Code {...iconProps} />;
};

// Default colors for skills when color is null
const getDefaultSkillColor = (skillName: string) => {
    const colorMap: { [key: string]: string } = {
        'JavaScript': 'text-yellow-500',
        'Python': 'text-blue-600',
        'FastAPI': 'text-green-600',
        'Git': 'text-orange-600',
        'Docker': 'text-blue-600',
        'Machine Learning': 'text-purple-600',
        'Communication': 'text-blue-500',
    };
    return colorMap[skillName] || 'text-gray-600';
};

const Skills = () => {
    const {t} = useTranslation('skills');
    const { skillsData, loading, error } = useSkills();

    // Show loading state
    if (loading || !skillsData) {
        return (
            <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-300">Loading skills...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const renderSkills = (skills: any[]) => {
        return (
            <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-6">
                {skills.map((skill, index) => {
                    const skillColor = skill.color || getDefaultSkillColor(skill.name);
                    const skillIcon = getIconComponent(skill.icon_name, skillColor);
                    
                    return (
                        <motion.div
                            key={index}
                            className="skill-card"
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                            }}
                            whileTap={{scale: 0.98}}
                            transition={{duration: 0.2}}
                        >
                            <div className="p-3 rounded-full bg-gray-100 dark:bg-slate-600 flex items-center justify-center">
                                {skillIcon}
                            </div>
                            <span>{skill.name}</span>
                        </motion.div>
                    );
                })}
            </StaggerContainer>
        );
    };

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
            <div className="container mx-auto px-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <strong>Error loading skills:</strong> {error}
                    </div>
                )}

                <FadeInWhenVisible delay={0.1}>
                    <h2 className="section-heading pb-3 mb-8">{t('title')}</h2>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.2}>
                    <Tabs defaultValue={skillsData.categories[0]?.id || "web"} className="w-full">
                        <div className="flex justify-center mb-8">
                            <TabsList className="grid gap-2" style={{gridTemplateColumns: `repeat(${skillsData.categories.length}, minmax(0, 1fr))`}}>
                                {skillsData.categories.map((category) => (
                                    <TabsTrigger
                                        key={category.id}
                                        value={category.id}
                                        className="flex items-center gap-2 text-xs md:text-sm data-[state=active]:bg-secondary data-[state=active]:text-white rounded-md transition-all duration-200"
                                    >
                                        {getIconComponent(category.icon_name)}
                                        <span className="hidden sm:inline">{category.label}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {skillsData.categories.map((category) => (
                            <TabsContent key={category.id} value={category.id} className="mt-0">
                                <div className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md">
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        {getIconComponent(category.icon_name)}
                                        {category.label}
                                    </h3>
                                    {renderSkills(category.skills)}
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </FadeInWhenVisible>
            </div>
        </section>
    );
};

export default Skills;