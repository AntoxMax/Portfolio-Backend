import AdminUser from "../models/AdminUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const adminRegister = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new AdminUser({
      login: req.body.login,
      password: hash,
    });

    const adminUser = await doc.save();

    const token = jwt.sign(
      {
        _id: adminUser._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = adminUser._doc;

    res.json({
      ...adminUser._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегестрироваться",
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const admin = await AdminUser.findOne({ login: req.body.login });

    if (!admin) {
      return res.status(404).json({
        message: "Ошибка логина",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      admin._doc.password
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Ошибка пароля",
      });
    }

    const token = jwt.sign(
      {
        _id: admin._id,
      },
      "secret123",
      {
        expiresIn: "30d",
      }
    );

    const { passwordHash, ...userData } = admin._doc;

    res.json({
      ...admin._doc,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const adminUpdateData = async (req, res) => {
  const token = (req.headers.authorization || "").replace(/Bearer\s?/, "");
  const id = req.params.id;
  const admin = await AdminUser.findOne({ _id: id });

  const isValidPass = await bcrypt.compare(
    req.body.oldPass,
    admin._doc.password
  );

  if (!isValidPass) {
    return res.status(400).json({
      message: "Ошибка пароля",
    });
  }

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await AdminUser.updateOne(
    {
      _id: id,
    },
    {
      login: req.body.login,
      password: hash,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Пользователь не найден",
        });
      }

      const token = jwt.sign(
        {
          _id: req.body.id,
        },
        "secret123",
        {
          expiresIn: "30d",
        }
      );

      const { passwordHash, ...userData } = admin._doc;

      res.json({
        ...admin._doc,
        token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Не удалось обновить пользователя",
      });
    });
};

export const getUser = async (req, res) => {
  try {
    const user = await AdminUser.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Не удалось найти пользователя",
      });
    }

    const { passwordHash, ...userData } = user._doc;

    res.json({ user });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Нет доступа",
    });
  }
};
