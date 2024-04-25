const router = require("express").Router();
const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");
const hashPassword = require("../../modules/hashPassword");

const requiredFields = ["email", "oldPassword", "newPassword"];

router.post("/", async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;
  const data = req.body;

  const missingField = requiredFields.find((field) => !data[field]);

  if (missingField) {
    return res
      .status(400)
      .json({ message: `${missingField} nije ispravno unesen.` });
  }

  try {
    const pravnoLiceAccount = await pravnoLiceSchema.findOne({ email });

    if (!pravnoLiceAccount) {
      return res
        .status(500)
        .json({ message: "Profil sa tim emailom nije pronaden." });
    }

    if (pravnoLiceAccount.password !== hashPassword(oldPassword)) {
      return res
        .status(500)
        .json({ message: "Lozinku koju ste unjeli nije ispravna." });
    }

    if (pravnoLiceAccount.password === hashPassword(newPassword)) {
      return res
        .status(500)
        .json({ message: "Lozinku koju ste unjeli je ista kao prosla." });
    }

    await pravnoLiceSchema.findOneAndUpdate(
      {
        email,
      },
      {
        password: hashPassword(newPassword),
      }
    );

    return res.status(200).json({ message: "Lozinka uspjesno promjenjena." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
