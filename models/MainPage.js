import mongoose from "mongoose";

const MainPageSchema = new mongoose.Schema(
  {
    firstBlock: {
      title1: String,
      title2: String,
      imageUrl: String,
    },
    skills: [
      {
        title: String,
        skills: Array,
      },
    ],
    textAboutMe: {
      text: String,
      imageUrl: String,
    },
    contacts: [
      {
        iconUrl: String,
        textContact: String,
        urlContact: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("MainPage", MainPageSchema);
