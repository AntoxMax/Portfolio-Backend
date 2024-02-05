import { body } from "express-validator";

export const authValidation = [
  body("login", "Login должен быть минимум 3 символа").isLength({ min: 3 }),
  body("password", "Пароль должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];

export const projectValidation = [
  body("title", "Введите заголовок проекта").isLength({ min: 3 }).isString(),
  body("text", "Введите описание проекта")
    .isLength({
      min: 10,
    })
    .isString(),
  body("skills", "Неверный формат (укажите массив)").optional(),
  body("skills", "Неверный формат (укажите массив)").optional(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];

export const mainPageValidation = [
  body("skills", "Укажите хотя бы один навык").isLength({ min: 1 }),
  body("text", "Текст должен быть минимум 5 символов").isLength({
    min: 5,
  }),
];
