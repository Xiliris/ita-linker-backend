const app = require("express")();
require("dotenv").config();

const authorization = app.use((req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.status(401).json({ message: "Missing token." });
  }
  if (token !== process.env.authorizationToken) {
    return res.status(401).json({ message: "Unauthorized token." });
  }

  next();
});

module.exports = authorization;
