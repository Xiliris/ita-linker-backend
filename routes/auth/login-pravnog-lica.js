const router = require("express").Router();
const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");
const requiredFields = ["korisnickoIme", "password"];
const hashPassword = require("../../modules/hashPassword");

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
    const userDataDB = await pravnoLiceSchema.findOne({
      korisnickoIme: data.korisnickoIme,
    });

    if (!userDataDB) {
      return res
        .status(500)
        .json({ message: "Korisnicki racun nije pronaden." });
    }

    if (userDataDB.password !== data.password) {
      return res.status(500).json({ message: "Password neispravan." });
    }

    let userData = { ...userDataDB._doc };
    delete userData.password;

    res.status(200).json(userData);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
