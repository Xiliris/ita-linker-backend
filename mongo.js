const mongoose = require("mongoose");
require('dotenv').config()
const mongoPath = process.env.mongoPath;

module.exports = async () => {
  await mongoose.connect(mongoPath)
  return mongoose;
};