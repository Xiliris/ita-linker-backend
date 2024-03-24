const router = require("express").Router();
const hashPassword = require("../../modules/hashPassword");
const multer = require("multer");

const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");
const requiredFields = [
  "ime",
  "sjediste",
  "telefon",
  "IDBroj",
  "djelatnost",
  "email",
  "korisnickoIme",
  "password",
];

let fileName = "None";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "storage");
  },
  filename: (req, file, callback) => {
    fileName = Date.now() + file.originalname;
    callback(null, fileName);
  },
});

const upload = multer({ storage });
router.post("/", upload.single("logotip"), async (req, res) => {
  const contentTypeHeader = req.headers["content-type"];
  if (
    !contentTypeHeader ||
    !contentTypeHeader.includes("multipart/form-data")
  ) {
    return res
      .status(400)
      .json({ error: "Content-Type mora biti multipart/form-data" });
  }

  const missingField = requiredFields.find((field) => !req.body[field]);

  if (missingField) {
    return res
      .status(500)
      .json({ message: `${missingField} nije ispravno unesen.` });
  }

  const dataPreset = { ...req.body, logotip: fileName };

  dataPreset.password = hashPassword(dataPreset.password);

  try {
    const userDataDB = await pravnoLiceSchema.findOne({
      $or: [
        { email: dataPreset.email },
        { korisnickoIme: dataPreset.korisnickoIme },
      ],
    });

    if (userDataDB) {
      return res.status(500).json({ message: "Korisnicki racun vec postoji." });
    }

    await pravnoLiceSchema(dataPreset).save();

    return res.status(200).json({ message: "Korisnik uspjesno kreiran." });
  } catch (err) {
    res.send(500).json({ message: err });
  }
});

module.exports = router;
