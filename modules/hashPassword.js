const crypto = require("crypto");

module.exports = (password) => {
  const hashedPassword = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  return hashedPassword;
};
