import AdminUser from "../models/AdminUser.js";

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
        message: "Email error",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      admin._doc.password
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "pass error",
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

  const password = req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  await AdminUser.updateOne(
    {
      _id: adminId,
    },
    {
      login: req.body.login,
      password: hash,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.status(404).json({
          message: "Статья не найдена",
        });
      }

      const token = jwt.sign(
        {
          _id: adminId,
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
        message: "Не удалось обновить статью",
      });
    });
};
