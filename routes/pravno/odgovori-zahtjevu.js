const router = require("express").Router();
const fizickoLiceSchema = require("../../schemas/fizickoLiceSchema");
const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");

const requiredFields = ["korisnik", "imePravnogLica", "telefon", "cijena"];

router.post("/", async (req, res) => {
  const { korisnik, imePravnogLica, telefon, cijena, poruka, odgovor } =
    req.body;

  console.log(req.body);

  const missingField = requiredFields.find((field) => !req.body[field]);

  if (missingField) {
    return res
      .status(400)
      .json({ message: `${missingField} nije ispravno unesen.` });
  }

  try {
    const user = await fizickoLiceSchema.findOne({
      korisnickoIme: korisnik,
    });

    if (!user) {
      return res.status(400).json({ message: "Fizicko lice nije pronadjeno." });
    }

    const date = new Date();

    await fizickoLiceSchema.findOneAndUpdate(
      {
        korisnickoIme: korisnik,
      },
      {
        $push: {
          ponude: {
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
            imePravnogLica,
            telefon,
            cijena,
            poruka,
            odgovor,
          },
        },
      }
    );

    await pravnoLiceSchema.findOneAndUpdate(
      {
        korisnickoIme: imePravnogLica,
      },
      {
        $pull: {
          zahtjevi: {
            imeFizickogLica: korisnik,
            poruka,
          },
        },
      },
      {
        upsert: true,
      }
    );

    return res.status(200).json({});
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
