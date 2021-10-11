const User = require("../models/User");

exports.signup = async (req, res, next) => {
  try {
    let { user_email, user_password } = req.body;
    let user = new User(user_email, user_password);
    user = await user.register();
    res.status(201).json({ message: "User Registered" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { user_email, user_password } = req.body;
    // let user = new User(user_email, user_password);
    const [user, _] = await User.validateUser(user_email, user_password);
    console.log(user_email);
    console.log(user_password);
    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
