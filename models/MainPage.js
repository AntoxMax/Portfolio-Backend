import mongoose from "mongoose";

const MainPageSchema = new mongoose.Schema(
  {
    skills: {
      type: Array,
      default: [],
    },
    textAbotMe: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MainPage", MainPageSchema);
