import React from "react";
import { FiGithub, FiExternalLink, FiCalendar, FiCode } from "react-icons/fi";
import { getStatusColor } from "../../constants/projectsConstants";
import { usePagination } from "../../components/usePagination.jsx";
import { querySchemas } from '../../constants/graphQl/graphQlSchemas.jsx';
import { useQueryQl } from '../../constants/graphQl/useGraphQl.jsx';



const Projects = () => {
  
  const {data} = useQueryQl(querySchemas.getProjects)

  const projects = data?.allProjects || [];
  console.log("projects", projects);

  const { viewBar, current } = usePagination(projects, 3);

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8" id="projects">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
            Featured <span className="text-gray-600 font-normal">Projects</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A collection of my recent work showcasing full-stack development
            capabilities and problem-solving skills
          </p>
        </div>

        {/* Projects Grid - 3 cards per line */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {current.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                  <img src={project.image}/>
                </div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      project.status
                    )}`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Title and Description */}
                <h3 className="text-lg font-normal text-gray-800 mb-2 group-hover:text-gray-600 transition-colors line-clamp-1">
                  {project.title}
                </h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FiCode className="text-gray-400 text-xs" />
                    <span className="text-xs text-gray-600 font-medium">
                      Technologies
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {project.technologies}
                  </p>
                </div>

                {/* Project Metadata */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-gray-400 text-xs">
                    <FiCalendar className="text-xs" />
                    <span>Started {project.startDate}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors text-xs font-normal flex-1 justify-center py-1 hover:bg-gray-50 rounded"
                  >
                    <FiGithub className="text-sm" />
                    Code
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors text-xs font-normal flex-1 justify-center py-1 hover:bg-gray-50 rounded"
                    >
                      <FiExternalLink className="text-sm" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <>{viewBar}</>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-6 text-sm">
            Interested in seeing more of my work?
          </p>
          <a
            href="https://github.com/Abderrahmanlahmidi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gray-300 text-gray-600 px-6 py-2 rounded-full text-sm font-normal hover:border-gray-400 hover:text-gray-700 transition-all duration-300"
          >
            <FiGithub className="text-base" />
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
