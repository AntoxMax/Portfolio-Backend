import MainPage from "../models/MainPage.js";

// Получаем контент главной страницы
export default async (req, res) => {
  try {
    const content = await MainPage.find().exec();
    res.json(content);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить проекты",
    });
  }
};

// Обновляем контент для главной стрнаницы
export const updateContent = async (req, res) => {
  await MainPage.updateOne(
    {},
    {
      firstBlock: {
        title1: "test title1",
        title2: "test title2",
        imageUrl: "http://localhost:4444/uploads/2024-01-06 02.25.21.png",
      },
      skills: req.body.skills,
      textAboutMe: req.body.textAboutMe,
      contacts: req.body.contacts,
    }
  ).then((doc) => {
    if (!doc) {
      return res.status(404).json({
        message: "Статья не найдена",
      });
    }

    res.json(doc);
  });
};
