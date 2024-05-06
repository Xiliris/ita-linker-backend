const router = require("express").Router();
const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");

const requiredFields = [
  "emailPravnogLica",
  "emailFizickoLica",
  "imeFizickogLica",
  "kontaktFizickogLica",
  "poruka",
];

router.post("/", async (req, res) => {
  const data = req.body;

  const missingField = requiredFields.find((field) => !data[field]);

  if (missingField) {
    return res
      .status(400)
      .json({ message: `${missingField} nije ispravno unesen.` });
  }

  const date = new Date();

  const messageFormat = {
    datum: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
    emailFizickoLica: data.emailFizickoLica,
    imeFizickogLica: data.imeFizickogLica,
    kontaktFizickogLica: data.kontaktFizickogLica,
    poruka: data.poruka,
  };

  const pravnoLice = await pravnoLiceSchema.findOne({
    email: data.emailPravnogLica,
  });

  if (!pravnoLice) {
    return res.status(200).json({ message: "Pravno lice nije pronadjeno." });
  }

  try {
    await pravnoLiceSchema.findOneAndUpdate(
      {
        email: data.emailPravnogLica,
      },
      {
        $push: {
          zahtjevi: messageFormat,
        },
      }
    );

    res.status(200).json({ message: "Ponuda uspjesno poslana." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
