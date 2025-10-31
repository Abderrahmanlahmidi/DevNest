import mongoose, {Schema, Document, Types} from "mongoose";


export interface IProject extends Document {
  title: string;
  description?: string;
  technologies?: string;
  startDate?: Date;
  status: "ongoing" | "completed" | "paused";
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  userId: Types.ObjectId;
}

const projectSchema = new Schema<IProject>(
  {
    title:        { type: String, required: true },
    description:  { type: String },
    technologies: { type: String },
    startDate:    { type: Date },
    status: {
      type: String,
      enum: ["ongoing", "completed", "paused"],
      default: "ongoing",
    },
    githubUrl:    { type: String },
    liveUrl:      { type: String },
    image:        { type: String },
    userId:       { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "Project", timestamps: true }
);

const Project = mongoose.model<IProject>("Project", projectSchema);
export default Project;
