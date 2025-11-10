import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion,AnimatePresence } from "framer-motion";

import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiFileText,
  FiBriefcase,
  FiCalendar,
  FiType,
  FiGithub,
  FiGlobe,
  FiImage,
  FiCode,
} from "react-icons/fi";
import {
  useCreateMutationQl,
  useQueryQl,
  useUpdateMutationQl,
  useDeleteMutationQl,
  useOneElement,
} from "../../../constants/graphQl/useGraphQl";
import {
  mutationSchemas,
  querySchemas,
} from "../../../constants/graphQl/graphQlSchemas";
import { HandleSearch } from "../../../constants/handleSearch";
import { convertTimestampToInputDate, handleDate } from "../../../constants/handleDate";
import { getStatusColor } from "../../../constants/projectsConstants";

const Projects = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [createImage, setCreateImage] = useState(null);
  const [updateImage, setUpdateImage] = useState(null);
  const [selectProjectId, setSelectProjectId] = useState(null);
  const userId = JSON.parse(localStorage.getItem("userId"));

  const [filteredData, setFilteredData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // !- GET Data
  const { data, refetch } = useQueryQl(querySchemas.getProjects);

  useEffect(() => {
    if (data?.allProjects) {
      setFilteredData(HandleSearch(data.allProjects, searchTerm));
    }
  }, [data, searchTerm]);



  const handleImageUpload = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      if (type === "create") {
        setCreateImage(previewUrl);
        setValue("image", file);
      } else {
        setUpdateImage(previewUrl);
        setValue("imageUpdate", file);
      }
    }
  };

  const removeImage = (type) => {
    if (type === "create") {
      setCreateImage(null);
      setValue("image", "");
    } else {
      setUpdateImage(null);
      setValue("imageUpdate", "");
    }
  };

  // !- Create Project
  const { handleCreate } = useCreateMutationQl(
    mutationSchemas.ProjectMutation.createProjectMutation
  );

  const onSubmitCreate = async (data) => {
    try {
      let imageUrl = "";
      
      if (data.image) {
        const formData = new FormData();
        formData.append("image", data.image);

        const res = await fetch("http://localhost:4000/upload", {
          method: "POST",
          body: formData,
        });

        const responseData = await res.json();
        imageUrl = responseData.imageUrl;
      }

      await handleCreate({
        title: data.title,
        description: data.description,
        technologies: data.technologies,
        startDate: data.startDate,
        status: data.status,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        image: imageUrl,
        userId: userId,
      });
      
      setShowCreateForm(false);
      reset();
      setCreateImage(null);
      refetch();
    } catch (error) {
      console.error("Create failed:", error);
    }
  };


// !- Get single project for update
const { elementData: project } = useOneElement(
  querySchemas.project,
  selectProjectId ? { id: selectProjectId } : null
);



  useEffect(() => {

    console.log(project)
    if (project) {
      reset({
        titleUpdate: project.title,
        descriptionUpdate: project.description,
        technologiesUpdate: project.technologies,
        startDateUpdate:convertTimestampToInputDate(project.startDate),
        statusUpdate: project.status,
        githubUrlUpdate: project.githubUrl,
        liveUrlUpdate: project.liveUrl,
      });
      if (project.image) {
        setUpdateImage(`http://localhost:4000${project.image}`);
      }
    }

    
  }, [project, reset]);

  const { handleUpdate } = useUpdateMutationQl(
    mutationSchemas.ProjectMutation.updateProjectMutation
  );

  const onSubmitUpdate = async (data) => {
    try {
      let imageUrl = project?.image || "";

      if (data.imageUpdate) {
        const formData = new FormData();
        formData.append("image", data.imageUpdate);

        const res = await fetch("http://localhost:4000/upload", {
          method: "POST",
          body: formData,
        });

        const responseData = await res.json();
        imageUrl = responseData.imageUrl;
      }

      await handleUpdate({
        id: selectProjectId,
        title: data.titleUpdate,
        description: data.descriptionUpdate,
        technologies: data.technologiesUpdate,
        startDate: data.startDateUpdate,
        status: data.statusUpdate,
        githubUrl: data.githubUrlUpdate,
        liveUrl: data.liveUrlUpdate,
        image: imageUrl,
      });
      
      setShowUpdateForm(false);
      reset();
      setUpdateImage(null);
      setSelectProjectId(null);
      refetch();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  // !- Delete Project
  const { handleDelete } = useDeleteMutationQl(
    mutationSchemas.ProjectMutation.deleteProjectMutation
  );

  const handleDeleteProject = async (id) => {
    try {
      await handleDelete(id);
      refetch();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const openUrl = (url) => {
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light text-gray-800">
          Projects Management
        </h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <FiPlus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[470px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Technologies
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Links
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.length > 0 ? (
                  filteredData.map((project) => (
                    <tr key={project._id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={`http://localhost:4000${project.image}`}
                            alt={project.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {project.title}
                            </div>
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies && project.technologies.split(", ").map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {handleDate(project.startDate)}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(project.status)}`}
                        >
                          {project.status}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openUrl(project.githubUrl)}
                            className={`p-2 rounded-lg ${
                              project.githubUrl
                                ? "text-gray-600 hover:bg-gray-100"
                                : "text-gray-300 cursor-not-allowed"
                            }`}
                            disabled={!project.githubUrl}
                          >
                            <FiGithub className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => openUrl(project.liveUrl)}
                            className={`p-2 rounded-lg ${
                              project.liveUrl
                                ? "text-blue-600 hover:bg-blue-50"
                                : "text-gray-300 cursor-not-allowed"
                            }`}
                            disabled={!project.liveUrl}
                          >
                            <FiGlobe className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectProjectId(project._id);
                              setShowUpdateForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-900 p-2"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteProject(project._id)}
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
                      <p className="text-gray-500 text-lg">No projects found</p>
                      <p className="text-gray-400 text-sm mt-2">
                        {searchTerm
                          ? "Try adjusting your search terms"
                          : "Get started by adding your first project"}
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>


<AnimatePresence>
  {showCreateForm && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light text-gray-800">
              Create New Project
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCreateForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-6 h-6" />
            </motion.button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitCreate)}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <FiType className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Project Title"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              <FiFileText className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <textarea
                {...register("description")}
                placeholder="Project Description"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                rows="3"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <FiCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register("technologies")}
                type="text"
                placeholder="Technologies (comma separated)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("startDate")}
                  type="date"
                  placeholder="Start Date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  {...register("status")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <FiGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("githubUrl")}
                  type="url"
                  placeholder="GitHub URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("liveUrl")}
                  type="url"
                  placeholder="Live Demo URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-3"
            >
              <label className="block text-sm font-medium text-gray-700">
                Project Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {createImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative inline-block"
                  >
                    <img
                      src={createImage}
                      alt="Preview"
                      className="max-h-48 rounded-lg mx-auto"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => removeImage("create")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX className="w-3 h-3" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <FiImage className="w-8 h-8 text-gray-400 mx-auto" />
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="image-upload"
                        className="relative cursor-pointer"
                      >
                        <span className="text-blue-600 hover:text-blue-500">
                          Upload an image
                        </span>
                        <input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleImageUpload(e, "create")}
                        />
                      </label>
                      <span className="ml-1">or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </motion.div>
                )}
              </div>
              <input {...register("image")} type="hidden" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end gap-3 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Create Project
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

<AnimatePresence>
  {showUpdateForm && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-light text-gray-800">
              Update Project
            </h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setShowUpdateForm(false);
                setSelectProjectId(null);
                setUpdateImage(null);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiX className="w-6 h-6" />
            </motion.button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmitUpdate)}
            className="space-y-4"
          >
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <FiType className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register("titleUpdate")}
                type="text"
                placeholder="Project Title"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
              {errors.titleUpdate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.titleUpdate.message}
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="relative"
            >
              <FiFileText className="absolute left-3 top-4 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <textarea
                {...register("descriptionUpdate")}
                placeholder="Project Description"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                rows="3"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <FiCode className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                {...register("technologiesUpdate")}
                type="text"
                placeholder="Technologies (comma separated)"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("startDateUpdate")}
                  type="date"
                  placeholder="Start Date"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiBriefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  {...register("statusUpdate")}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                >
                  <option value="">Select Status</option>
                  <option value="Planning">Planning</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="relative">
                <FiGithub className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("githubUrlUpdate")}
                  type="url"
                  placeholder="GitHub URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>

              <div className="relative">
                <FiGlobe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  {...register("liveUrlUpdate")}
                  type="url"
                  placeholder="Live Demo URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-3"
            >
              <label className="block text-sm font-medium text-gray-700">
                Project Image
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                {updateImage ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative inline-block"
                  >
                    <img
                      src={updateImage}
                      alt="Preview"
                      className="max-h-48 rounded-lg mx-auto"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => removeImage("update")}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <FiX className="w-3 h-3" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-2"
                  >
                    <FiImage className="w-8 h-8 text-gray-400 mx-auto" />
                    <div className="text-sm text-gray-600">
                      <label
                        htmlFor="image-upload-update"
                        className="relative cursor-pointer"
                      >
                        <span className="text-blue-600 hover:text-blue-500">
                          Upload an image
                        </span>
                        <input
                          id="image-upload-update"
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => handleImageUpload(e, "update")}
                        />
                      </label>
                      <span className="ml-1">or drag and drop</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </motion.div>
                )}
              </div>
              <input {...register("imageUpdate")} type="hidden" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex justify-end gap-3 pt-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={() => {
                  setShowUpdateForm(false);
                  setSelectProjectId(null);
                  setUpdateImage(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
              >
                Update Project
              </motion.button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default Projects;