import { AuthController } from "../controllers/index.js";
import checkAuth from "../utils/checkAuth.js";
import handleValidation from "../utils/handleValidation.js";
import { authValidation } from "../validation/validation.js";

export const authRoutes = (app) => {
  app.post(
    "/admin/register",
    authValidation,
    handleValidation,
    AuthController.adminRegister
  );

  app.post(
    "/admin/login",
    authValidation,
    handleValidation,
    AuthController.adminLogin
  );
  app.patch(
    "/admin/:id",
    checkAuth,
    authValidation,
    handleValidation,
    AuthController.adminUpdateData
  );
};
