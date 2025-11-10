import React from "react";
import { FiGithub, FiExternalLink, FiCalendar, FiCode } from "react-icons/fi";
import { getStatusColor } from "../../constants/projectsConstants";
import { usePagination } from "../../components/usePagination.jsx";
import { querySchemas } from '../../constants/graphQl/graphQlSchemas.jsx';
import { useQueryQl } from '../../constants/graphQl/useGraphQl.jsx';
import { handleDate } from "../../constants/handleDate.jsx";
import { socialLinks } from "../../constants/socialMedia.jsx";



const Projects = () => {
  
  const {data} = useQueryQl(querySchemas.getProjects)

  const projects = data?.allProjects || [];
  console.log("projects", projects);

  const { viewBar, current } = usePagination(projects, 3);

  return (
    <section className="py-20 bg-white px-4 sm:px-6 lg:px-8" id="projects">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
            Featured <span className="text-gray-600 font-normal">Projects</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A collection of my recent work showcasing full-stack development
            capabilities and problem-solving skills
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
{current.map((project, index) => (
  <div
    key={index}
    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
  >
    {/* Improved Image Section */}
    <div className="h-48 bg-gray-100 relative overflow-hidden">
      <div className="w-full h-full flex items-center justify-center bg-gray-50">
        <img 
          src={`http://localhost:4000${project.image}`}
          alt={project.title}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCAwIDIwMCAxMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMTIwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik04MCA1MEg2MFY3MEg4MFY1MFpNMTAwIDUwSDgwVjcwSDEwMFY1MFpNMTIwIDUwSDEwMFY3MEgxMjBWNTBaTTYwIDMwSDQwVjUwSDYwVjMwWk04MCAzMEg2MFY1MEg4MFYzMFpNMTAwIDMwSDgwVjUwSDEwMFYzMFpNNDAgMzBIMjBWNTBINDBWMzBaTTYwIDEwSDQwVjMwSDYwVjEwWk04MCAxMEg2MFYzMEg4MFYxMFpNMTAwIDEwSDgwVjMwSDEwMFYxMFpNNDAgMTBIMjBWMzBINDBWMTBaIiBmaWxsPSIjRDREOEREIi8+Cjwvc3ZnPgo=';
          }}
        />
      </div>
      <div className="absolute top-3 right-3">
        <span
          className={`px-3 py-1.5 rounded-full text-xs font-medium ${getStatusColor(
            project.status
          )}`}
        >
          {project.status}
        </span>
      </div>
    </div>

    <div className="p-5 flex-1 flex flex-col">
      <h3 className="text-lg font-normal text-gray-800 mb-2 group-hover:text-gray-600 transition-colors line-clamp-1">
        {project.title}
      </h3>
      <p className="text-gray-500 text-sm mb-4 leading-relaxed line-clamp-3 flex-1">
        {project.description}
      </p>

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

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-gray-400 text-xs">
          <FiCalendar className="text-xs" />
          <span>Started {handleDate(project.startDate)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-3 border-t border-gray-100">

    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-1 text-xs font-normal flex-1 justify-center py-1 rounded transition-colors ${
        project.githubUrl 
          ? "text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer" 
          : "text-gray-300 cursor-not-allowed"
      }`}
    >
      <FiGithub className="text-sm" />
      Code
    </a>

  

    <a
      href={project.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-1 text-xs font-normal flex-1 justify-center py-1 rounded transition-colors ${
        project.liveUrl 
          ? "text-gray-500 hover:text-gray-700 hover:bg-gray-50 cursor-pointer" 
          : "text-gray-300 cursor-not-allowed"
      }`}
    >
      <FiExternalLink className="text-sm" />
      Live Demo
    </a>

</div>
    </div>
  </div>
))}
        </div>

        <>{viewBar}</>


        <div className="text-center mt-12">
          <p className="text-gray-500 mb-6 text-sm">
            Interested in seeing more of my work?
          </p>
          <a
            href={socialLinks.githubLink}
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
