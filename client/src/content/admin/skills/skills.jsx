import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiFileText,
  FiBarChart2,
  FiLayers,
  FiType,
  FiCode,
} from "react-icons/fi";
import { HandleSearch } from "../../../constants/handleSearch.jsx";
import {
  useDeleteMutationQl,
  useQueryQl,
  useOneElement,
  useUpdateMutationQl,
} from "../../../constants/graphQl/useGraphQl.jsx";
import {
  querySchemas,
  mutationSchemas,
} from "../../../constants/graphQl/graphQlSchemas.jsx";

const Skills = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSkillId, setSelectedSkillId] = useState(null);

  const {
    register,
    handleSubmit,

    formState: { errors },
    reset,
  } = useForm();

  const { data, refetch } = useQueryQl(querySchemas.getSkills);
  const { handleDelete } = useDeleteMutationQl(
    mutationSchemas.SkillsMutation.deleteSkillMutation
  );

  useEffect(() => {
    if (data?.allSkills) {
      const filteredSkills = HandleSearch(data.allSkills, searchTerm);
      setFilteredData(filteredSkills);
    }
  }, [data, searchTerm]);

  const onSubmitCreate = (data) => {
    console.log("Create skill:", data);
    setShowCreateForm(false);
    reset();
  };



  const { elementData: skill } = useOneElement(
    querySchemas.userSkillsQuery.getSkill,
    {
      id: selectedSkillId,
    }
  );

  useEffect(() => {
    if (skill) {
      reset({
        name: skill.name || "",
        level: skill.level || "",
        category: skill.category || "",
        description: skill.description || "",
        icon: skill.icon || "",
      });
    }
  }, [skill, reset]);

  const { handleUpdate } = useUpdateMutationQl(
    mutationSchemas.SkillsMutation.updateSkillMutation
  );

  const onSubmitUpdate = (data) => {
    console.log("Update skill data:", data);
    handleUpdate({
      id: selectedSkillId,
      name: data.name,
      level: data.level,
      category: data.category,
      description: data.description,
      icon:data.icon
    });
    setShowUpdateForm(false);
    reset();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light text-gray-800">Skills Management</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Skill
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Icon
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((skill) => (
                    <tr key={skill.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {skill.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {skill.level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {skill.category}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {skill.description}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {skill.icon}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedSkillId(skill._id);
                              setShowUpdateForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-2"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={async () => {
                              await handleDelete(skill._id);
                              refetch();
                            }}
                            className="text-red-600 hover:text-red-900 p-2"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center">
                      <FiFileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No skills found</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {searchTerm
                          ? "Try adjusting your search terms"
                          : "Get started by adding your first skill"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-gray-800">
                Create New Skill
              </h2>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmitCreate)} className="space-y-4">
              <div className="relative">
                <FiType className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <FiBarChart2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("level")}
                  type="text"
                  placeholder="Level"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("category")}
                  type="text"
                  placeholder="Category"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiFileText className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <div className="relative">
                <FiCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("icon")}
                  type="text"
                  placeholder="Icon"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-light text-gray-800">
                Update Skill
              </h2>
              <button
                onClick={() => setShowUpdateForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-4">
              <div className="relative">
                <FiType className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Name"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="relative">
                <FiBarChart2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("level")}
                  type="text"
                  placeholder="Level"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiLayers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("category")}
                  type="text"
                  placeholder="Category"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiFileText className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  rows="3"
                />
              </div>

              <div className="relative">
                <FiCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("icon")}
                  type="text"
                  placeholder="Icon"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateForm(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;
