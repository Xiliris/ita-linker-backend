const router = require("express").Router();
const hashPassword = require("../../modules/hashPassword");
const fizickoLiceSchema = require("../../schemas/fizickoLiceSchema");
const requiredFields = [
  "ime",
  "prezime",
  "telefon",
  "email",
  "korisnickoIme",
  "password",
];

router.post("/", async (req, res) => {
  const data = req.body;

  const missingField = requiredFields.find((field) => !data[field]);

  if (missingField) {
    return res
      .status(400)
      .json({ message: `${missingField} nije ispravno unesen.` });
  }

  data.password = hashPassword(data.password);

  try {
    const userDataDB = await fizickoLiceSchema.findOne({
      $or: [{ email: data.email }, { korisnickoIme: data.korisnickoIme }],
    });

    if (userDataDB) {
      return res.status(409).json({ message: "Korisnicki racun vec postoji." });
    }

    new fizickoLiceSchema(data).save();

    return res.status(200).json({ message: "Korisnik uspjesno kreiran." });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
