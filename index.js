require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const database = require("./database");
const authorization = require("./middleware/authorization");

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "storage")));

app.get("/", (req, res) => {
  res.send("WORKING");
});

const readRoutes = (dir) => {
  const files = fs.readdirSync(path.join(__dirname, dir));
  for (const file of files) {
    const stat = fs.lstatSync(path.join(__dirname, dir, file));
    if (stat.isDirectory()) {
      readRoutes(path.join(dir, file));
    } else {
      if (file.endsWith(".js")) {
        const routePath = `${dir}/${file}`
          .replace("routes", "")
          .replace(".js", "")
          .replace("\\", "/api/");
        const routeLogic = require(path.join(__dirname, dir, file));
        app.use(routePath, authorization, routeLogic);
      }
    }
  }
};

readRoutes("routes");
database();

app.use("*", (req, res) => {
  res.status(404).send({ Message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`> Server Started: ${PORT}`);
});