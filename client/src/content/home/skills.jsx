import { useState } from "react";
import {
  getLevelColor,
  getCategoryColor,
  getIcon,
} from "../../constants/skillsConstants";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const GET_SKILLS = gql`
  query {
    allSkills {
      _id
      name
      level
      icon
      category
      description
    }
  }
`;

const Skills = () => {
  const { data } = useQuery(GET_SKILLS);
  const [page, setPage] = useState(1);
  const limit = 4;

  console.log("skills", data?.allSkills);

  const skills = data?.allSkills || [];
  const startIndex = (page - 1) * limit;
  const currentSkills = skills.slice(startIndex, startIndex + limit);

  return (
    <section id="skills" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
            Skills &{" "}
            <span className="text-gray-600 font-normal">Expertise</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical skills and proficiency
            levels across different domains
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentSkills.map((skill, index) => (
            <div
              key={skill._id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 group"
            >
              {/* Icon and Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                  <div className="text-gray-600">{getIcon(skill.icon)}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                    skill.level
                  )}`}
                >
                  {skill.level}
                </span>
              </div>

              {/* Skill Name and Category */}
              <h3 className="text-lg font-normal text-gray-800 mb-2">
                {skill.name}
              </h3>
              <p
                className={`text-sm font-medium mb-3 ${getCategoryColor(
                  skill.category
                )}`}
              >
                {skill.category}
              </p>

              {/* Description */}
              <p className="text-gray-500 text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        {/* Simple Pagination */}
        <div className="flex items-center gap-4 mt-8 justify-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            <FiChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <span className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 border border-gray-200 rounded-lg">
            Page {page} of {Math.ceil(skills.length / limit)}
          </span>

          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={startIndex + limit >= skills.length}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
