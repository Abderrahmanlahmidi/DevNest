import React from 'react';
import { FiCode, FiDatabase, FiCloud, FiLayers, FiSmartphone, FiServer, FiUsers, FiTool } from 'react-icons/fi';

const Competences = () => {
    const competences = [
        {
            name: "Frontend Development",
            level: "Advanced",
            category: "Development",
            description: "Building responsive and interactive user interfaces with modern frameworks and best practices."
        },
        {
            name: "Backend Development",
            level: "Advanced",
            category: "Development",
            description: "Creating robust server-side applications, APIs, and database architectures."
        },
        {
            name: "Database Design",
            level: "Intermediate",
            category: "Database",
            description: "Designing efficient database schemas, queries, and optimization strategies."
        },
        {
            name: "Cloud Infrastructure",
            level: "Intermediate",
            category: "DevOps",
            description: "Deploying and managing applications on cloud platforms with scalability in mind."
        },
        {
            name: "UI/UX Design",
            level: "Intermediate",
            category: "Design",
            description: "Creating intuitive user experiences and visually appealing interfaces."
        },
        {
            name: "Mobile Development",
            level: "Beginner",
            category: "Development",
            description: "Building cross-platform mobile applications with responsive design principles."
        },
        {
            name: "API Development",
            level: "Advanced",
            category: "Development",
            description: "Designing and implementing RESTful APIs with proper documentation and security."
        },
        {
            name: "Team Collaboration",
            level: "Advanced",
            category: "Soft Skills",
            description: "Working effectively in agile teams with strong communication and project management."
        },
        {
            name: "Problem Solving",
            level: "Advanced",
            category: "Soft Skills",
            description: "Analyzing complex problems and implementing effective technical solutions."
        }
    ];

    const getLevelColor = (level) => {
        switch (level) {
            case 'Beginner': return 'bg-green-100 text-green-800';
            case 'Intermediate': return 'bg-blue-100 text-blue-800';
            case 'Advanced': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'Development': return <FiCode className="text-2xl" />;
            case 'Database': return <FiDatabase className="text-2xl" />;
            case 'DevOps': return <FiCloud className="text-2xl" />;
            case 'Design': return <FiLayers className="text-2xl" />;
            case 'Soft Skills': return <FiUsers className="text-2xl" />;
            default: return <FiTool className="text-2xl" />;
        }
    };

    const getCategoryColor = (category) => {
        switch (category) {
            case 'Development': return 'text-blue-600';
            case 'Database': return 'text-green-600';
            case 'DevOps': return 'text-purple-600';
            case 'Design': return 'text-pink-600';
            case 'Soft Skills': return 'text-orange-600';
            default: return 'text-gray-600';
        }
    };

    const getProgressWidth = (level) => {
        switch (level) {
            case 'Beginner': return 'w-1/3';
            case 'Intermediate': return 'w-2/3';
            case 'Advanced': return 'w-full';
            default: return 'w-1/2';
        }
    };



    return (
        <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8" id="competences">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
                        Core <span className="text-gray-600 font-normal">Competences</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        A comprehensive overview of my technical and professional capabilities across different domains
                    </p>
                </div>

                {/* Competences Grid - 3 cards per line */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {competences.map((competence, index) => (
                        <div 
                            key={index}
                            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Icon and Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 ${getCategoryColor(competence.category)}`}>
                                    {getCategoryIcon(competence.category)}
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(competence.level)}`}>
                                    {competence.level}
                                </span>
                            </div>

                            {/* Competence Name and Category */}
                            <h3 className="text-lg font-normal text-gray-800 mb-2 group-hover:text-gray-600 transition-colors">
                                {competence.name}
                            </h3>
                            <p className={`text-sm font-medium mb-4 ${getCategoryColor(competence.category)}`}>
                                {competence.category}
                            </p>

                            {/* Description */}
                            <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                                {competence.description}
                            </p>

                           
                        </div>
                    ))}
                </div>

            

            
            </div>
        </section>
    );
};

export default Competences;