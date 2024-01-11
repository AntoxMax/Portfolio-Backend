import Project from "../models/Project.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().exec();
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить проекты",
    });
  }
};

export const getOneProject = async (req, res) => {
  const projectId = req.params.id;

  Project.findOne({ _id: projectId })
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
};

export const createProject = async (req, res) => {
  try {
    const doc = new Project({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      skills: req.body.skills,
      link: req.body.link,
      gitHubLink: req.body.gitHubLink,
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
};

export const updateProject = async (req, res) => {
  const projectId = req.params.id;

  await Project.updateOne(
    {
      _id: projectId,
    },
    {
      title: req.body.title,
      text: req.body.text,
      skills: req.body.skills,
      link: req.body.link,
      gitHubLink: req.body.gitHubLink,
      imageUrl: req.body.imageUrl,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        });
      }

      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Не удалось обновить статью",
      });
    });
};

export const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  Project.findOneAndDelete({ _id: projectId })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Проект не найдена",
        });
      }

      res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Не удалось удалить",
      });
    });
};
