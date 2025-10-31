import mongoose, { Schema, Document, Types } from "mongoose";

export interface ISkill extends Document {
    name: string;
    level?: number;
    category?: string;
    description?: string;
    icon?: string;
    userId: Types.ObjectId;
}

const skillSchema = new Schema<ISkill>(
    {
        name:        { type: String, required: true },
        level:       { type: Number},
        category:    { type: String },
        description: { type: String },
        icon:        { type: String },
        userId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { collection: "Skill", timestamps: true }
);

const Skill = mongoose.model<ISkill>("Skill", skillSchema);
export default Skill;
