import Project from "../models/Project.js";

export const getProjectsCategory = async (req, res) => {
  const category = req.query.category;

  try {
    const projects = await Project.find({ category: category }).exec();
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить проекты",
    });
  }
};

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
      category: req.body.category,
      imageUrl: req.body.imageUrl,
      skills: req.body.skills,
      link: req.body.link,
      gitLink: req.body.gitLink,
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
      category: req.body.category,
      skills: req.body.skills,
      link: req.body.link,
      gitLink: req.body.gitLink,
      imageUrl: req.body.imageUrl,
    }
  )
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
      res.status(500).json({
        message: "Не удалось обновить проект",
      });
    });
};

export const deleteProject = async (req, res) => {
  const projectId = req.params.id;

  Project.findOneAndDelete({ _id: projectId })
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Проект не найден",
        });
      }

      res.json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        message: "Не удалось удалить проект",
      });
    });
};
