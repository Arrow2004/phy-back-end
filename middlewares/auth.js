const jwt = require("jsonwebtoken");
const User = require("../models/user")
const config = process.env;

const isLoggedUser = (req, res, next) => {
  const token = req.headers["x-auth-token"];
  if (!token) {
    return res.status(403).json({"message":"Davom etish uchun token kerak"});
  }
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({"message": "Invalid Token"});
  }
  return next();
};
module.exports = {isLoggedUser};