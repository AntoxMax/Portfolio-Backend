import checkAuth from "../utils/checkAuth.js";
import { projectValidation } from "../validation/validation.js";
import handleValidation from "../utils/handleValidation.js";
import { ProjectsController } from "../controllers/index.js";

export const projectRoutes = (app) => {
  app.get("/projects-category", ProjectsController.getProjectsCategory);
  app.get("/projects", ProjectsController.getAllProjects);
  app.get("/projects/:id", ProjectsController.getOneProject);
  app.post(
    "/projects",
    checkAuth,
    projectValidation,
    handleValidation,
    ProjectsController.createProject
  );
  app.patch(
    "/projects/:id",
    checkAuth,
    projectValidation,
    handleValidation,
    ProjectsController.updateProject
  );
  app.delete("/projects/:id", checkAuth, ProjectsController.deleteProject);
};
