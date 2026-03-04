const jwt = require("jsonwebtoken");

const generateJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2d" });
  return token;
};

module.exports = generateJWT;
