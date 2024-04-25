require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const database = require("./database");
const authorization = require("./middleware/authorization");
const User = require('./schemas/pravnoLiceSchema');

const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "storage")));

app.get("/", (req, res) => {
  res.send("WORKING");
});


app.post("mongodb+srv://Application:oN2ctZ0iGBxAOVSW@cluster0.7bzas.mongodb.net/ITA-Backed?retryWrites=true&w=majority&appName=Cluster0/api/auth/register-pravnog-lica", async (req, res) => {
  try {
    const { ime, sjediste, telefon, IDBroj, djelatnost, email, korisnickoIme, password, logotip } = req.body;
    const user = new User({ ime, sjediste, telefon, IDBroj, djelatnost, email, korisnickoIme, password, logotip });
    await user.save();
    setResponseMessage(response.data.message);
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
});

app.post("mongodb+srv://Application:oN2ctZ0iGBxAOVSW@cluster0.7bzas.mongodb.net/ITA-Backed?retryWrites=true&w=majority&appName=Cluster0/api/auth/register-fizickog-lica", async (req, res) => {
  try {
    const { ime, prezime, telefon, email, korisnickoIme, password } = req.body;
    const user = new User({ ime, prezime, telefon, email, korisnickoIme, password });
    await user.save();
    setResponseMessage(response.data.message);
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
});

app.post("mongodb+srv://Application:oN2ctZ0iGBxAOVSW@cluster0.7bzas.mongodb.net/ITA-Backed?retryWrites=true&w=majority&appName=Cluster0/api/auth/login-fizickog-lica", async (req, res) => {
  try {
    const { korisnickoIme, password } = req.body;
    const user = new User({ korisnickoIme, password });
    await user.save();
    setResponseMessage(response.data.message);
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
});

app.post("mongodb+srv://Application:oN2ctZ0iGBxAOVSW@cluster0.7bzas.mongodb.net/ITA-Backed?retryWrites=true&w=majority&appName=Cluster0/api/auth/login-pravnog-lica", async (req, res) => {
  try {
    const { korisnickoIme, password } = req.body;
    const user = new User({ korisnickoIme, password });
    await user.save();
    setResponseMessage(response.data.message);
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
});

app.post("mongodb+srv://Application:oN2ctZ0iGBxAOVSW@cluster0.7bzas.mongodb.net/ITA-Backed?retryWrites=true&w=majority&appName=Cluster0/api/auth/pravno-lice-promjena-passworda", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = new User({ oldPassword, newPassword });
    await user.save();
    setResponseMessage(response.data.message);
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
});

app.post("mongodb+srv://Application:oN2ctZ0iGBxAOVSW@cluster0.7bzas.mongodb.net/ITA-Backed?retryWrites=true&w=majority&appName=Cluster0/api/auth/pravno-lice-novi-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = new User({ email });
    await user.save();
    setResponseMessage(response.data.message);
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
});

app.post("mongodb+srv://Application:oN2ctZ0iGBxAOVSW@cluster0.7bzas.mongodb.net/ITA-Backed?retryWrites=true&w=majority&appName=Cluster0/api/auth/fizicko-lice-promjena-passworda", async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = new User({ oldPassword, newPassword });
    await user.save();
    setResponseMessage(response.data.message);
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
});

app.post("mongodb+srv://Application:oN2ctZ0iGBxAOVSW@cluster0.7bzas.mongodb.net/ITA-Backed?retryWrites=true&w=majority&appName=Cluster0/api/auth/fizicko-lice-novi-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = new User({ email });
    await user.save();
    setResponseMessage(response.data.message);
  } catch (error) {
    setResponseMessage(error.response.data.message);
  }
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

app.use(bodyParser.json());





readRoutes("routes");
database();

app.use("*", (req, res) => {
  res.status(404).send({ Message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`> Server Started: ${PORT}`);
});
