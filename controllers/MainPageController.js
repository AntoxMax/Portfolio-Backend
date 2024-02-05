import MainPage from "../models/MainPage.js";

// Получаем контент главной страницы
export default async (req, res) => {
  try {
    const content = await MainPage.find().exec();
    res.json(content);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось получить контент",
    });
  }
};

// Обновляем контент для главной стрнаницы
export const updateContent = async (req, res) => {
  await MainPage.updateOne(
    {},
    {
      firstBlock: req.body.firstBlock,
      skills: req.body.skills,
      textAboutMe: req.body.textAboutMe,
      contacts: req.body.contacts,
    }
  )
    .then(() => {})
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Не удалось обновить контент",
      });
    });
  const content = await MainPage.find().exec();
  res.json(content);
};
