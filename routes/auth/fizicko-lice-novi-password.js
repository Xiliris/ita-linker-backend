const router = require("express").Router();
const fizickoLiceSchema = require("../../schemas/fizickoLiceSchema");
const generatePassword = require("../../modules/generatePassword");
const sendMail = require("../../modules/sendMail");
const hashPassword = require("../../modules/hashPassword");

const requiredFields = ["email"];

router.post("/", async (req, res) => {
  const { email } = req.body;
  const missingField = requiredFields.find((field) => !data[field]);

  if (missingField) {
    return res
      .status(400)
      .json({ message: `${missingField} nije ispravno unesen.` });
  }

  try {
    const pravnoLiceAccount = await fizickoLiceSchema.findOne({ email });

    if (!pravnoLiceAccount) {
      return res
        .status(500)
        .json({ message: "Profil sa tim emailom nije pronaden." });
    }

    const newPassword = generatePassword(16);

    await fizickoLiceSchema.findOneAndUpdate(
      { email },
      { password: hashPassword(newPassword) }
    );

    await sendMail(email, newPassword, "Fizickog Lica");

    res.status(200).json({ message: "Nova loznika je poslana na vas email." });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
