const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    let { user_email, user_password } = req.body;
    let user = new User(user_email, user_password);
    const validUser = await user.validateUser();
    console.log(`User Exists: ${validUser}`);
    if (validUser) res.status(401).json({ message: "User already exists" });
    else {
      user = await user.register();
      res.status(201).json({ message: "User Registered" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { user_email, user_password } = req.body;
    const user = new User(user_email, user_password);
    const validUser = await user.validateUser();
    console.log(`Valid User: ${validUser}`);
    if (validUser) res.status(200).json({ user });
    else res.status(401).json({ message: "Wrong email/password" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.reset = async (req, res, next) => {
  try {
    let { user_email, user_password } = req.body;
    let user = new User(user_email, user_password);
    const validUser = await user.validateUser();
    console.log(`User Exists: ${validUser}`);
    if (validUser) {
      user = await user.resetPassword();
      res.status(201).json({ message: "Password has been reset" });
    } else {
      res.status(401).json({ message: "Incorrect User Email" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
