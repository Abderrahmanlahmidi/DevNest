import Experience from "../../models/Experience.ts";

export const experienceResolvers = {
    Query: {
        getUserExperiences: async (_: any, { userId }: any) => {
            try {
                return await Experience.find({ userId });
            } catch (error) {
                console.error("Error fetching experiences:", error);
                throw new Error("Failed to fetch experiences");
            }
        },
        allExperiences: async () => {
            return await Experience.find();
        }
    },

    Mutation: {
        createExperience: async (_: any, args: any) => {
            const { title, company, startDate, endDate, description, location, type, userId } = args;

            if (!title || !userId) {
                throw new Error("Title and userId are required");
            }

            try {
                return await Experience.create({
                    title,
                    company,
                    startDate,
                    endDate,
                    description,
                    location,
                    type,
                    userId,
                });
            } catch (error) {
                console.error("Error creating experience:", error);
                throw new Error("Failed to create experience");
            }
        },

        updateExperience: async (_: any, args: any) => {
            const { id, title, company, startDate, endDate, description, location, type } = args;

            if (!id) throw new Error("Experience ID is required");

            try {
                const experience = await Experience.findById(id);
                if (!experience) throw new Error("Experience not found");

                if (title !== undefined) experience.title = title;
                if (company !== undefined) experience.company = company;
                if (startDate !== undefined) experience.startDate = startDate;
                if (endDate !== undefined) experience.endDate = endDate;
                if (description !== undefined) experience.description = description;
                if (location !== undefined) experience.location = location;
                if (type !== undefined) experience.type = type;

                await experience.save();
                return experience;
            } catch (error) {
                console.error("Error updating experience:", error);
                throw new Error("Failed to update experience");
            }
        },

        deleteExperience: async (_: any, { id }: any) => {
            try {
                const experience = await Experience.findById(id);
                if (!experience) throw new Error("Experience not found");

                await Experience.findByIdAndDelete(id);
                return experience;
            } catch (error) {
                console.error("Error deleting experience:", error);
                throw new Error("Failed to delete experience");
            }
        },
    },
};
