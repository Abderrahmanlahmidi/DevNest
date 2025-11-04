import React from 'react';
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';

const Experiences = () => {
    const experiences = [
        {
            title: "Senior Full Stack Developer",
            company: "TechInnovate Inc.",
            startDate: "2022-03",
            endDate: "Present",
            description: "Lead development of scalable web applications using React, Node.js, and cloud technologies. Mentor junior developers and implement best practices for code quality and performance optimization.",
            location: "San Francisco, CA",
            type: "Full-time"
        },
        {
            title: "Frontend Developer",
            company: "Digital Solutions LLC",
            startDate: "2020-06",
            endDate: "2022-02",
            description: "Developed responsive user interfaces for client projects using React and Vue.js. Collaborated with design teams to implement pixel-perfect designs and improve user experience.",
            location: "Remote",
            type: "Full-time"
        },
        {
            title: "Software Engineer Intern",
            company: "StartUp Ventures",
            startDate: "2019-01",
            endDate: "2019-12",
            description: "Built and maintained RESTful APIs, implemented new features for the main product, and participated in agile development processes with daily stand-ups and sprint planning.",
            location: "New York, NY",
            type: "Internship"
        },
        {
            title: "Full Stack Developer",
            company: "Freelance",
            startDate: "2018-09",
            endDate: "2020-05",
            description: "Worked with various clients to develop custom web applications, e-commerce solutions, and business websites. Managed projects from conception to deployment.",
            location: "Remote",
            type: "Freelance"
        },
        {
            title: "Junior Web Developer",
            company: "WebCraft Studio",
            startDate: "2017-03",
            endDate: "2018-08",
            description: "Created and maintained websites for small businesses using HTML, CSS, JavaScript, and WordPress. Provided technical support and implemented SEO best practices.",
            location: "Boston, MA",
            type: "Full-time"
        },
        {
            title: "Web Development Bootcamp",
            company: "Code Academy",
            startDate: "2016-09",
            endDate: "2017-02",
            description: "Completed intensive full-stack web development program covering modern technologies including JavaScript, React, Node.js, and database management.",
            location: "Chicago, IL",
            type: "Education"
        }
    ];

    const getTypeColor = (type) => {
        switch (type) {
            case 'Full-time': return 'bg-blue-100 text-blue-800';
            case 'Part-time': return 'bg-green-100 text-green-800';
            case 'Internship': return 'bg-purple-100 text-purple-800';
            case 'Freelance': return 'bg-orange-100 text-orange-800';
            case 'Education': return 'bg-pink-100 text-pink-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        if (dateString === 'Present') return 'Present';
        const date = new Date(dateString + '-01');
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    };

    return (
        <section className="py-20 bg-white px-4 sm:px-6 lg:px-8" id="experiences">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
                        Professional <span className="text-gray-600 font-normal">Experience</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        A timeline of my career journey, showcasing growth and diverse professional experiences
                    </p>
                </div>

                {/* Experience Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
                    
                    {/* Experience Items */}
                    <div className="space-y-12">
                        {experiences.map((experience, index) => (
                            <div 
                                key={index}
                                className="relative flex flex-col md:flex-row items-start group"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 rounded-full bg-gray-800 border-4 border-white z-10"></div>

                                {/* Date - Left side */}
                                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0 ml-12 md:ml-0">
                                    <div className="text-gray-500 text-sm font-medium mb-1">
                                        {formatDate(experience.startDate)} - {formatDate(experience.endDate)}
                                    </div>
                                </div>

                                {/* Content - Right side */}
                                <div className="md:w-1/2 md:pl-12 ml-12 md:ml-0">
                                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group-hover:border-gray-300">
                                        {/* Type Badge */}
                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(experience.type)}`}>
                                                {experience.type}
                                            </span>
                                        </div>

                                        {/* Title and Company */}
                                        <h3 className="text-xl font-normal text-gray-800 mb-1">
                                            {experience.title}
                                        </h3>
                                        <p className="text-gray-600 font-medium mb-4 flex items-center gap-1">
                                            <FiBriefcase className="text-gray-400 text-sm" />
                                            {experience.company}
                                        </p>

                                        {/* Description */}
                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                            {experience.description}
                                        </p>

                                        {/* Location */}
                                        <div className="flex items-center gap-1 text-gray-400 text-sm">
                                            <FiMapPin className="text-sm" />
                                            <span>{experience.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-6">
                        Interested in working together?
                    </p>
                    <button className="border border-gray-300 text-gray-600 px-8 py-3 rounded-full text-sm font-normal hover:border-gray-400 hover:text-gray-700 transition-all duration-300">
                        Download Resume
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Experiences;