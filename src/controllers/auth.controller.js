const { validationResult } = require("express-validator");
const authService = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((err) => err.msg);
      return res.status(400).json({ errors: errorMessages });
    }

    const { email, password } = req.body;

    const result = await authService.loginService(email, password);

    return res.json(result);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

const getSession = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await authService.getSessionUser(userId);

    return res.json(user);
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  login,
  getSession,
};
