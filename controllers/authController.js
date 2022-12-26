const User = require("../models/user");
const bcrypt = require("bcryptjs");


async function register(body, res, next) {
  if (body.password.length < 6) {
    return { success: false, message: "password should be greater than 6" };
  }

  return await bcrypt.hash(body.password, 10).then(async (hash) => {
    const user = new User({
      username: body.username,
      password: hash,
    });
    console.log("user: ", user);
    try {
      const newUser = await user.save();
      return {
        success: true,
        data: newUser,
      };
    } catch (err) {
      return {
        success: false,
        message: "Failed to add User",
        error: err.message,
      };
    }
  });
}

async function login(body, res, next) {
  try {
    const user = await User.findOne({ username: body.username });
    if (!user) {
      return { success: false, message: "Invalid username or password" };
    } else {
      return await bcrypt
        .compare(body.password, user.password)
        .then(function (result) {
          if (result) {
            return {
              success: true,
              message: "Login successful",
              data: { username: user.username, role: user.role, id: user.id },
            };
          }
          return { success: false, message: "Invalid username or password" };
        });
    }
  } catch (error) {
    return {
      success: false,
      message: "Login not successful",
      error: error.message,
    };
  }
}

module.exports = {
  register,
  login,
};
