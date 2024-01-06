import MainPage from "../models/MainPage.js";

export const getContent = async (req, res) => {
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

//Сделать обновление контента
export const updateContent = async (req, res) => {};
