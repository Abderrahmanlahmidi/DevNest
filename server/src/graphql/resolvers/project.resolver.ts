import Project from "../../models/Project.ts";

export const projectResolvers = {
  Query: {
    getUserProjects: async (_: any, { userId }: any) => {
      try {
        return await Project.find({ userId });
      } catch (error) {
        console.error("Error fetching user projects:", error);
        throw new Error("Failed to fetch projects");
      }
    },
    allProjects: async () => {
      return await Project.find();
    },
    project: async (_: any, { id }: any) => {
      const project = await Project.findById(id);
      if (!project) throw new Error("project not found");
      return project;
    },
  },

  Mutation: {
    createProject: async (_: any, args: any) => {
      const {
        title,
        description,
        technologies,
        startDate,
        status,
        githubUrl,
        liveUrl,
        image,
        userId,
      } = args;

      if (!title || !userId) {
        throw new Error("Title and userId are required");
      }

      try {
        return await Project.create({
          title,
          description,
          technologies,
          startDate,
          status,
          githubUrl,
          liveUrl,
          image,
          userId,
        });
      } catch (error) {
        console.error("Error creating project:", error);
        throw new Error("Failed to create project");
      }
    },

    updateProject: async (_: any, args: any) => {
      const {
        id,
        title,
        description,
        technologies,
        startDate,
        status,
        githubUrl,
        liveUrl,
        image,
      } = args;

      if (!id) throw new Error("Project ID is required");

      try {
        const project = await Project.findById(id);
        if (!project) throw new Error("Project not found");

        if (title !== undefined) project.title = title;
        if (description !== undefined) project.description = description;
        if (technologies !== undefined) project.technologies = technologies;
        if (startDate !== undefined) project.startDate = startDate;
        if (status !== undefined) project.status = status;
        if (githubUrl !== undefined) project.githubUrl = githubUrl;
        if (liveUrl !== undefined) project.liveUrl = liveUrl;
        if (image !== undefined) project.image = image;

        await project.save();
        return project;
      } catch (error) {
        console.error("Error updating project:", error);
        throw new Error("Failed to update project");
      }
    },

    deleteProject: async (_: any, { id }: any) => {
      try {
        const project = await Project.findById(id);
        if (!project) throw new Error("Project not found");

        await Project.findByIdAndDelete(id);
        return project;
      } catch (error) {
        console.error("Error deleting project:", error);
        throw new Error("Failed to delete project");
      }
    },
  },
};
