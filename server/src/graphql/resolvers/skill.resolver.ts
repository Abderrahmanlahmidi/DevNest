import Skill from "../../models/Skill.ts";

export const skillResolvers = {
  Query: {
    userSkills: async (_: any, { userId }: any) => {
      return await Skill.find({ userId });
    },
    allSkills: async () => {
      return await Skill.find();
    },
    skill: async (_: any, { id }: any) => {
      const skill = await Skill.findById(id);
      if (!skill) throw new Error("Skill not found");
      return skill;
    },
  },

  Mutation: {
    createSkill: async (_: any, args: any) => {
      const { name, level, category, description, icon, userId } = args;

      if (!name || !level || !category || !description || !icon || !userId) {
        throw new Error("All required fields must be provided");
      }

      try {
        return await Skill.create({
          name,
          level,
          category,
          description,
          icon,
          userId,
        });
      } catch (error) {
        console.error("Error creating skill:", error);
        throw new Error("Failed to create skill");
      }
    },

    updateSkill: async (_: any, args: any) => {
      const { id, name, level, category, description, icon } = args;

      if (!id) throw new Error("Skill ID is required");

      try {
        const existingSkill = await Skill.findById(id);
        if (!existingSkill) throw new Error("Skill not found");

        if (name !== undefined) existingSkill.name = name;
        if (level !== undefined) existingSkill.level = level;
        if (category !== undefined) existingSkill.category = category;
        if (description !== undefined) existingSkill.description = description;
        if (icon !== undefined) existingSkill.icon = icon;

        await existingSkill.save();
        return existingSkill;
      } catch (error) {
        console.error("Error updating skill:", error);
        throw new Error("Failed to update skill");
      }
    },

    deleteSkill: async (_: any, { id }: any) => {
      const skill = await Skill.findById(id);
      if (!skill) throw new Error("Skill not found");

      try {
        await Skill.findByIdAndDelete(id);
        return skill.id;
      } catch (error) {
        console.error("Error deleting skill:", error);
        throw new Error("Failed to delete skill");
      }
    },
  },
};
