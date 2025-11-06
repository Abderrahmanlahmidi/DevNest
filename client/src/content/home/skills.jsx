import {
  getLevelColor,
  getCategoryColor,
  getIcon,
} from "../../constants/skillsConstants";
import { querySchemas } from "../../constants/graphQl/graphQlSchemas.jsx";
import { useQueryQl } from "../../constants/graphQl/useGraphQl.jsx";
import { usePagination } from "../../components/usePagination.jsx";

const Skills = () => {
  
  const { data } = useQueryQl(querySchemas.getSkills);
  const skills = data?.allSkills || [];
  const { viewBar, current } = usePagination(skills, 4);

  return (
    <section id="skills" className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

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


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {current.map((skill) => (
            <div
              key={skill._id}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:border-gray-300 group"
            >

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


              <p className="text-gray-500 text-sm leading-relaxed">
                {skill.description}
              </p>
            </div>
          ))}
        </div>

        <>{viewBar}</>
      </div>
    </section>
  );
};

export default Skills;
