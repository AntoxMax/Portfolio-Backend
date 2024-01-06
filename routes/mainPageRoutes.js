import checkAuth from "../utils/checkAuth.js";
import { mainPageValidation } from "../validation/validation.js";
import handleValidation from "../utils/handleValidation.js";
import { MainPageController } from "../controllers/index.js";

export const mainPageRoutes = (app) => {
  app.get("/mainpage", MainPageController.getContent);
  // TODO: Сделать роут для обновление контента
  app.post(
    "/mainpage",
    checkAuth,
    mainPageValidation,
    handleValidation,
    MainPageController.updateContent
  );
};
