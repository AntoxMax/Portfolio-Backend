import { MainPageController } from "../controllers/index.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidation from "../utils/handleValidation.js";
import { mainPageValidation } from "../validation/validation.js";

export const mainPageRoutes = (app) => {
  app.get("/mainpage", MainPageController.getContent);
  // TODO: Сделать роут для обновление контента
};
