import React from 'react';
import { motion } from 'framer-motion';
import { FiTool, FiBriefcase, FiAward, FiUser, FiClock } from 'react-icons/fi';
import { useQueryQl } from '../../../constants/graphQl/useGraphQl';
import { querySchemas } from '../../../constants/graphQl/graphQlSchemas';

const Statics = () => {

    const { data: skillsData } = useQueryQl(querySchemas.getSkills);
    const { data: projectsData } = useQueryQl(querySchemas.getProjects);
    const { data: competencesData } = useQueryQl(querySchemas.getCompetences);
    const { data: experiencesData } = useQueryQl(querySchemas.getExperiences);

    const stats = [
        { 
            icon: FiTool, 
            label: "Skills", 
            value: skillsData?.allSkills?.length || 0, 
            color: "blue"
        },
        { 
            icon: FiBriefcase, 
            label: "Projects", 
            value: projectsData?.allProjects?.length || 0, 
            color: "green"
        },
        { 
            icon: FiAward, 
            label: "Competences", 
            value: competencesData?.allCompetences?.length || 0, 
            color: "purple"
        },
        { 
            icon: FiUser, 
            label: "Experiences", 
            value: experiencesData?.allExperiences?.length || 0, 
            color: "orange"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-50 text-blue-600 border-blue-200',
            green: 'bg-green-50 text-green-600 border-green-200',
            purple: 'bg-purple-50 text-purple-600 border-purple-200',
            orange: 'bg-orange-50 text-orange-600 border-orange-200'
        };
        return colors[color] || 'bg-gray-50 text-gray-600 border-gray-200';
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { 
            opacity: 0, 
            y: 20,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: { 
            scale: 1, 
            rotate: 0,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2
            }
        },
        hover: {
            scale: 1.1,
            rotate: 5,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    const numberVariants = {
        hidden: { scale: 0 },
        visible: { 
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 150,
                damping: 15,
                delay: 0.3
            }
        }
    };



    return (
        <div className="p-6">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl font-light text-gray-800 mb-2"
            >
                Dashboard Overview
            </motion.h1>
            
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-gray-500 mb-8 flex items-center gap-2"
            >
                <FiClock className="w-4 h-4" />
                Real-time statistics from your portfolio
            </motion.p>

            <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {stats.map((stat, index) => (
                    <motion.div 
                        key={index} 
                        variants={itemVariants}
                        whileHover={{ 
                            y: -5,
                            scale: 1.02,
                            transition: { type: "spring", stiffness: 400, damping: 17 }
                        }}
                        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
                    >
                        {/* Background accent */}
                        <motion.div 
                            className={`absolute top-0 left-0 w-1 h-full ${getColorClasses(stat.color).split(' ')[0]}`}
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
                        />
                        
                        <div className="flex items-center justify-between">
                            <div className="flex-1">
                                <p className="text-gray-500 text-sm font-medium mb-2">
                                    {stat.label}
                                </p>
                                
                                <motion.p 
                                    className="text-3xl font-light text-gray-800"
                                    variants={numberVariants}
                                >
                                    {stat.value}
                                </motion.p>
                            </div>
                            
                            <motion.div 
                                className={`p-3 rounded-lg border ${getColorClasses(stat.color)} group-hover:shadow-md transition-shadow`}
                                variants={iconVariants}
                                whileHover="hover"
                            >
                                <stat.icon className="w-6 h-6" />
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}

export default Statics;