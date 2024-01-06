import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import Project from "./models/Project.js";
import AdminUser from "./models/AdminUser.js";

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

app.post("/register-admin", async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new AdminUser({
      login: req.body.login,
      password: hash,
    });

    const adminUser = await doc.save();

    const token = jwt.sign(
      {
        _id: adminUser._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = adminUser._doc;

    res.json({
      ...adminUser._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегестрироваться",
    });
  }
});

app.post("/login-admin", async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ login: req.body.login });

    if (!admin) {
      return res.status(404).json({
        message: "Email error",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      admin._doc.password
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "pass error",
      });
    }

    const token = jwt.sign(
      {
        _id: admin._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = admin._doc;

    res.json({
      ...admin._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
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
