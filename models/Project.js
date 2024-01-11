import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    skills: {
      type: Array,
      default: [],
    },
    link: {
      type: String,
    },
    gitHubLink: {
      type: String,
    },
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", ProjectSchema);
