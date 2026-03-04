const generateJWT = require("../config/jwt");
const userModel = require("../models/user.model");
const AppError = require("../utils/AppError");

const loginService = async (email, password) => {
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  // 🔥 Comparación directa (sin encriptación)
  if (user.password !== password) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = generateJWT({
    id: user.id,
    email: user.email,
  });

  return {
    token,
  };
};

const getSessionUser = async (userId) => {
  const user = await userModel.getUserById(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};

module.exports = {
  loginService,
  getSessionUser,
};
