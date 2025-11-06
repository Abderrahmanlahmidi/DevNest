import React from "react";
import {
  getLevelColor,
  getCategoryIcon,
  getCategoryColor,
} from "../../constants/comptencesConstants.jsx";
import { querySchemas } from "../../constants/graphQl/graphQlSchemas.jsx";
import { useQueryQl } from "../../constants/graphQl/useGraphQl.jsx";
import { usePagination } from "../../components/usePagination.jsx";

const Competences = () => {
  const { data, error, loading } = useQueryQl(querySchemas.getCompetences);

  const competences = data?.allCompetences || [];

  const { viewBar, current } = usePagination(competences,3);

  return (
    <section className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8" id="competences">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-4">
            Core <span className="text-gray-600 font-normal">Competences</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            A comprehensive overview of my technical and professional
            capabilities across different domains
          </p>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {current.map((competence, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
            >

              <div className="flex items-start justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300 ${getCategoryColor(
                    competence.category
                  )}`}
                >
                  {getCategoryIcon(competence.category)}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getLevelColor(
                    competence.level
                  )}`}
                >
                  {competence.level}
                </span>
              </div>


              <h3 className="text-lg font-normal text-gray-800 mb-2 group-hover:text-gray-600 transition-colors">
                {competence.name}
              </h3>
              <p
                className={`text-sm font-medium mb-4 ${getCategoryColor(
                  competence.category
                )}`}
              >
                {competence.category}
              </p>


              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                {competence.description}
              </p>
            </div>
          ))}
        </div>

        <>{viewBar}</>
      </div>
    </section>
  );
};

export default Competences;
