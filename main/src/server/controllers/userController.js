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
    //let user_email = req.query.user_email;
    // let user_password = req.query.user_password;
    console.log(user_email, user_password);
    const user = new User(user_email, user_password);
    const validUser = await user.validateUser();
    console.log(validUser);
    if (validUser) res.status(200).json({ user });
    else res.status(401).json({ message: "Wrong email/password" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
