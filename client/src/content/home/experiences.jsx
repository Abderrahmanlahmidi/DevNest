import React from 'react';
import { FiCalendar, FiMapPin, FiBriefcase } from 'react-icons/fi';
import {getTypeColor, formatDate} from "../../constants/experiencesConstants.jsx"
import { querySchemas } from "../../constants/graphQl/graphQlSchemas.jsx";
import { useQueryQl } from "../../constants/graphQl/useGraphQl.jsx";
import { downloadDocument } from "../../constants/downloadDocument";
import { handleDate } from '../../constants/handleDate.jsx';



const Experiences = () => {
  const url = "../../../src/assets/documents/Abderrahmane-Lahmidi.pdf";

  const { data } = useQueryQl(querySchemas.getExperiences);
  const experiences = data?.allExperiences || [];

  console.log(experiences)

    

    return (
        <section className="py-20 bg-white px-4 sm:px-6 lg:px-8" id="experiences">
            <div className="max-w-6xl mx-auto">

                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
                        Professional <span className="text-gray-600 font-normal">Experience</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        A timeline of my career journey, showcasing growth and diverse professional experiences
                    </p>
                </div>


                <div className="relative">

                    <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gray-200"></div>
                    

                    <div className="space-y-12">
                        {experiences.map((experience, index) => (
                            <div 
                                key={index}
                                className="relative flex flex-col md:flex-row items-start group"
                            >

                                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 rounded-full bg-gray-800 border-4 border-white z-10"></div>


                                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0 ml-12 md:ml-0">
                                    <div className="text-gray-500 text-sm font-medium mb-1">
                                        {handleDate(experience.startDate)} - {handleDate(experience.endDate)}
                                    </div>
                                </div>


                                <div className="md:w-1/2 md:pl-12 ml-12 md:ml-0">
                                    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group-hover:border-gray-300">

                                        <div className="flex justify-between items-start mb-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(experience.type)}`}>
                                                {experience.type}
                                            </span>
                                        </div>


                                        <h3 className="text-xl font-normal text-gray-800 mb-1">
                                            {experience.title}
                                        </h3>
                                        <p className="text-gray-600 font-medium mb-4 flex items-center gap-1">
                                            <FiBriefcase className="text-gray-400 text-sm" />
                                            {experience.company}
                                        </p>

                                        <p className="text-gray-500 text-sm leading-relaxed mb-4">
                                            {experience.description}
                                        </p>


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


                <div className="text-center mt-16">
                    <p className="text-gray-500 mb-6">
                        Interested in working together?
                    </p>
                    <button onClick={() => {
                        downloadDocument(url)
                    }} className="border cursor-pointer border-gray-300 text-gray-600 px-8 py-3 rounded-full text-sm font-normal hover:border-gray-400 hover:text-gray-700 transition-all duration-300">
                        Download Resume
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Experiences;