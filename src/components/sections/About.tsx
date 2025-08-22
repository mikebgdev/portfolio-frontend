import {Download} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useToast} from '@/hooks/use-toast';
import {useTranslation} from 'react-i18next';
import {motion} from 'framer-motion';
import FadeInWhenVisible from '@/components/animations/FadeInWhenVisible';
import { useSharedAboutData } from '@/contexts/AboutContext';
import { useContact } from '@/hooks/useApi';

const About = () => {
    const {t} = useTranslation('about');
    const {toast} = useToast();
    const { aboutData, loading, error } = useSharedAboutData();
    const { contactData } = useContact();

    // Return early if no data available yet
    if (loading || !aboutData) {
        return (
            <section id="about" className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center items-center min-h-[400px]">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto mb-4"></div>
                            <p className="text-gray-600 dark:text-gray-300">Loading profile data...</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const { full_name, title, image_url, description } = aboutData;

    const handleCVDownload = () => {
        if (contactData?.cv_data?.data) {
            // Handle base64 CV data
            const link = document.createElement('a');
            link.href = contactData.cv_data.data;
            link.download = contactData.cv_data.filename || 'CV.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else if (contactData?.cv_url && contactData.cv_url !== "#") {
            // Handle CV URL
            window.open(contactData.cv_url, '_blank');
        } else {
            toast({
                title: t('cv_not_available'),
                description: t('cv_not_available_desc'),
                variant: "destructive",
            });
        }
    };

    return (
        <section id="about" className="py-20 bg-white dark:bg-slate-900">
            <div className="container mx-auto px-4">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <strong>Error loading profile data:</strong> {error}
                    </div>
                )}
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-2/5 mb-8 md:mb-0">
                        <FadeInWhenVisible delay={0.2} direction="right">
                            <div className="relative">
                                <div
                                    className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden mx-auto border-4 border-secondary">
                                    <motion.img
                                        src={image_url}
                                        alt={full_name}
                                        className="w-full h-full object-cover"
                                        whileHover={{scale: 1.05}}
                                        transition={{duration: 0.3}}
                                    />
                                    <div
                                        className="absolute inset-0 rounded-full border-t-4 border-secondary opacity-30 animate-spin-slow"></div>
                                </div>
                            </div>
                        </FadeInWhenVisible>
                    </div>

                    <div className="w-full md:w-3/5">
                        <div>
                        <FadeInWhenVisible delay={0.1}>
                            <h2 className="section-heading pb-3 mb-8">{t('title')}</h2>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.3}>
                                <h3 className="text-3xl font-bold mb-2">{full_name}</h3>
                                <p className="text-xl text-secondary mb-4">{title}</p>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.4} >
                            <div className="space-y-4 text-gray-600 dark:text-gray-300 mb-6">
                                {Array.isArray(description) && description.length > 0 ? (
                                    description.map((paragraph, index) => (
                                        <motion.p
                                            key={index}
                                            className="leading-relaxed mb-4"
                                            initial={{opacity: 0, y: 20}}
                                            whileInView={{opacity: 1, y: 0}}
                                            transition={{delay: 0.5 + index * 0.1}}
                                            viewport={{once: true}}
                                        >
                                            {paragraph}
                                        </motion.p>
                                    ))
                                ) : (
                                    <p className="leading-relaxed">
                                        No description available
                                    </p>
                                )}
                            </div>
                        </FadeInWhenVisible>

                        <FadeInWhenVisible delay={0.7} >
                            <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.95}}>
                                <Button
                                    onClick={handleCVDownload}
                                    className="rounded-full font-medium"
                                    size="lg"
                                >
                                    <Download className="mr-2 h-5 w-5"/>
                                    {t('download_cv')}
                                </Button>
                            </motion.div>
                        </FadeInWhenVisible>
                    </div>
                </div></div>
            </div>
        </section>
    );
};

export default About;