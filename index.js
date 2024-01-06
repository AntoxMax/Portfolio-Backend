import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { projectRoutes } from "./routes/projectRoutes.js";
import { authRoutes } from "./routes/authRoutes.js";
import { mainPageRoutes } from "./routes/mainPageRoutes.js";

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

// Routes
projectRoutes(app);
authRoutes(app);
mainPageRoutes(app);

//Настроили backend на 4444 порт
app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server OK");
});
