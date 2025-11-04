import mongoose, {Schema, Document, Types} from "mongoose";

export interface ICompetence extends Document {
  name: string;
  level?: string;
  category?: string;
  description?: string;
  userId: Types.ObjectId;
}

const competenceSchema = new Schema<ICompetence>(
  {
    name:        { type: String, required: true },
    level:       { type: String },
    category:    { type: String },
    description: { type: String },
    userId:      { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { collection: "Competence", timestamps: true }
);

const Competence = mongoose.model<ICompetence>("Competence", competenceSchema);
export default Competence;
