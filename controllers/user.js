const User = require("../modules/users");
const token = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(404).json({
        message: "User Not Found",
      });
    } else {
      const isCorrectPass = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!isCorrectPass) {
        res.status(301).json({
          message: "Password Is Not Correct",
        });
      } else {
        const jwt = token.sign(
          {
            userId: user._id.toString(),
            email: user.email,
          },
          "thisIsMySecret",
          {
            expiresIn: "3h",
          }
        );

        res.status(200).json({
          message: "Login Successfully",
          user,
          token: jwt,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
    //next();
  }
};

const register = async (req, res, next) => {
  try {
    const oldPassword = req.body.password;

    const newPassword = await bcrypt.hash(oldPassword, 12);

    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: newPassword,
    });
    await newUser.save();
    const jwt = token.sign(
      {
        userId: newUser._id.toString(),
        email: newUser.email,
      },
      "thisIsMySecret",
      {
        expiresIn: "3h",
      }
    );
    const users = await User.find();
    res.status(200).json({
      message: "User Created Successfuly",
      user_jwt: jwt,
      newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
    //next();
  }
};

module.exports = {
  login,
  register,
};
