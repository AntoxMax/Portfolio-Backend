import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import Project from "./models/Project.js";

//Подключение к MangoDB
mongoose
  .connect(
    "mongodb+srv://admin:12345@portfolio.bdpi3gz.mongodb.net/blog?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB err", err));

//Включаем express, обходим cors
const app = express();
app.use(express.json());
app.use(cors());

//Routes
app.get("/projects", async (req, res) => {
  try {
    const projects = await Project.find().exec();
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить проекты",
    });
  }
});

app.get("/projects/:id", async (req, res) => {
  const projectId = req.params.id;

  PostModel.findOne({ _id: projectId })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Проект не найден",
        });
      }

      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Не удалось вернуть проект",
      });
    });
});

app.post("/projects", async (req, res) => {
  try {
    const doc = new Project({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      skills: req.body.skills,
    });

    const project = await doc.save();

    res.json({
      project,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать проект",
    });
  }
});

//Настроили backend на 4444 порт
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
