import checkAuth from "../utils/checkAuth.js";
import { authValidation } from "../validation/validation.js";
import handleValidation from "../utils/handleValidation.js";
import { AuthController } from "../controllers/index.js";

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

  app.get("/admin/getAuth", checkAuth, AuthController.getUser);
};
