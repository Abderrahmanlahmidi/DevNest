import mongoose, {Schema, Document, Types} from "mongoose";


export interface IExperience extends Document {
  title: string;
  company?: string;
  startDate?: Date;
  endDate?: Date;
  description?: string;
  location?: string;
  type?: string;
  userId: Types.ObjectId;
}

const experienceSchema = new Schema<IExperience>(
  {
    title:       { type: String, required: true },
    company:     { type: String },
    startDate:   { type: Date },
    endDate:     { type: Date },
    description: { type: String },
    location:    { type: String },
    type:        { type: String },
    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "Experience", timestamps: true }
);

const Experience = mongoose.model<IExperience>("Experience", experienceSchema);
export default Experience;
