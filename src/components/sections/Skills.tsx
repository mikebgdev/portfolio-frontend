import {Code, Server, Wrench, Database, Globe, Users, Cpu, Palette, Brain, Lightbulb} from 'lucide-react';
import {Card, CardContent} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import StaggerContainer from '@/components/animations/StaggerContainer';
import StaggerItem from '@/components/animations/StaggerItem';

interface Skill {
    name: string;
    icon: React.ReactNode;
}

const Skills = () => {
    const {t} = useTranslation('skills');
    const skillCategories = [
        {
            id: "web",
            label: t('categories.web'),
            icon: <Globe className="h-5 w-5"/>,
            skills: [
                {name: t('skills.html5'), icon: <Code className="h-5 w-5 text-orange-500"/>},
                {name: t('skills.css3'), icon: <Palette className="h-5 w-5 text-blue-500"/>},
                {name: t('skills.javascript'), icon: <Code className="h-5 w-5 text-yellow-500"/>},
                {name: t('skills.typescript'), icon: <Code className="h-5 w-5 text-blue-600"/>},
                {name: t('skills.react'), icon: <Code className="h-5 w-5 text-cyan-500"/>},
                {name: t('skills.vue'), icon: <Code className="h-5 w-5 text-green-500"/>},
                {name: t('skills.nodejs'), icon: <Server className="h-5 w-5 text-green-600"/>},
                {name: t('skills.php_symfony'), icon: <Code className="h-5 w-5 text-purple-600"/>},
            ],
        },
        {
            id: "tools",
            label: t('categories.tools'),
            icon: <Wrench className="h-5 w-5"/>,
            skills: [
                {name: t('skills.git'), icon: <Wrench className="h-5 w-5 text-orange-600"/>},
                {name: t('skills.docker'), icon: <Cpu className="h-5 w-5 text-blue-600"/>},
                {name: t('skills.vscode'), icon: <Code className="h-5 w-5 text-blue-500"/>},
                {name: t('skills.figma'), icon: <Palette className="h-5 w-5 text-purple-500"/>},
                {name: t('skills.postman'), icon: <Server className="h-5 w-5 text-orange-500"/>},
                {name: t('skills.npm_yarn'), icon: <Code className="h-5 w-5 text-red-500"/>},
            ],
        },
        {
            id: "server",
            label: t('categories.server'),
            icon: <Server className="h-5 w-5"/>,
            skills: [
                {name: t('skills.apache'), icon: <Server className="h-5 w-5 text-red-600"/>},
                {name: t('skills.nginx'), icon: <Server className="h-5 w-5 text-green-600"/>},
                {name: t('skills.aws'), icon: <Cpu className="h-5 w-5 text-orange-500"/>},
                {name: t('skills.linux'), icon: <Server className="h-5 w-5 text-yellow-600"/>},
            ],
        },
        {
            id: "database",
            label: t('categories.database'),
            icon: <Database className="h-5 w-5"/>,
            skills: [
                {name: t('skills.mysql'), icon: <Database className="h-5 w-5 text-blue-600"/>},
                {name: t('skills.postgresql'), icon: <Database className="h-5 w-5 text-blue-700"/>},
                {name: t('skills.mongodb'), icon: <Database className="h-5 w-5 text-green-600"/>},
                {name: t('skills.redis'), icon: <Database className="h-5 w-5 text-red-600"/>},
            ],
        },
        {
            id: "soft",
            label: t('categories.soft'),
            icon: <Users className="h-5 w-5"/>,
            skills: [
                {name: t('skills.teamwork'), icon: <Users className="h-5 w-5 text-blue-500"/>},
                {name: t('skills.communication'), icon: <Brain className="h-5 w-5 text-green-500"/>},
                {name: t('skills.problem_solving'), icon: <Lightbulb className="h-5 w-5 text-yellow-500"/>},
                {name: t('skills.adaptability'), icon: <Brain className="h-5 w-5 text-purple-500"/>},
            ],
        },
    ];

    const renderSkills = (skills: Skill[]) => {
        return (
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {skills.map((skill, index) => (
                    <div key={index} className="skill-item">
                        <motion.div
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                            }}
                            whileTap={{scale: 0.95}}
                            transition={{duration: 0.2}}
                            className="p-2 rounded-full bg-gray-100 dark:bg-slate-700">
                            {skill.icon}
                        </motion.div>
                        <span className="font-medium">{skill.name}</span>
                    </div>
                ))}
            </StaggerContainer>
        );
    };

    return (
        <section id="skills" className="py-20 bg-gray-50 dark:bg-slate-800">
            <div className="container mx-auto px-4">
                <FadeInWhenVisible delay={0.1}>
                    <h2 className="section-heading pb-3 mb-8">{t('title')}</h2>
                </FadeInWhenVisible>

                <FadeInWhenVisible delay={0.2}>
                    <Tabs defaultValue="web" className="w-full">
                        <div
                            className="flex justify-center mb-8"
                        >
                            <TabsList className="grid grid-cols-6 md:grid-cols-5 gap-2">
                                {skillCategories.map((category) => (
                                    <TabsTrigger
                                        key={category.id}
                                        value={category.id}
                                        className="flex items-center gap-2 text-xs md:text-sm data-[state=active]:bg-secondary data-[state=active]:text-white rounded-md transition-all duration-200"
                                    >
                                        {category.icon}
                                        <span className="hidden sm:inline">{category.label}</span>
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </div>

                        {skillCategories.map((category) => (
                            <TabsContent key={category.id} value={category.id} className="mt-0">
                                <div
                                    className="bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md"
                                >
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                                        {category.icon}
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