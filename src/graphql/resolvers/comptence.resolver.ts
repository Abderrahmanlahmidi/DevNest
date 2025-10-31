import Competence from "../../models/Competence";

export const competenceResolvers = {
    Query: {
        getUserCompetences: async (_: any, { userId }: any) => {
            try {
                return await Competence.find({ userId });
            } catch (error) {
                console.error("Error fetching competences:", error);
                throw new Error("Failed to fetch competences");
            }
        },
    },

    Mutation: {
        createCompetence: async (_: any, args: any) => {
            const { name, level, category, description, userId } = args;

            if (!name || !userId) {
                throw new Error("Name and userId are required");
            }

            try {
                return await Competence.create({
                    name,
                    level,
                    category,
                    description,
                    userId,
                });
            } catch (error) {
                console.error("Error creating competence:", error);
                throw new Error("Failed to create competence");
            }
        },

        updateCompetence: async (_: any, args: any) => {
            const { id, name, level, category, description } = args;

            if (!id) throw new Error("Competence ID is required");

            try {
                const competence = await Competence.findById(id);
                if (!competence) throw new Error("Competence not found");

                if (name !== undefined) competence.name = name;
                if (level !== undefined) competence.level = level;
                if (category !== undefined) competence.category = category;
                if (description !== undefined) competence.description = description;

                await competence.save();
                return competence;
            } catch (error) {
                console.error("Error updating competence:", error);
                throw new Error("Failed to update competence");
            }
        },

        deleteCompetence: async (_: any, { id }: any) => {
            try {
                const competence = await Competence.findById(id);
                if (!competence) throw new Error("Competence not found");

                await Competence.findByIdAndDelete(id);
                return competence;
            } catch (error) {
                console.error("Error deleting competence:", error);
                throw new Error("Failed to delete competence");
            }
        },
    },
};
