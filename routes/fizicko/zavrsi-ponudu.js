const router = require("express").Router();
const fizickoLiceSchema = require("../../schemas/fizickoLiceSchema");
const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");

const requiredFields = ["korisnickoIme", "accepted", "offer"];

router.post("/", async (req, res) => {
  const { korisnickoIme, pravnoLice, accepted, offer } = req.body;

  const missingField = requiredFields.find((field) => !req.body[field]);

  if (missingField) {
    return res
      .status(400)
      .json({ message: `${missingField} nije ispravno unesen.` });
  }

  try {
    const user = await fizickoLiceSchema.findOne({
      korisnickoIme,
    });

    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronaden" });
    }

    const foundOffer = user.ponude[offer];

    if (accepted === true) {
      await fizickoLiceSchema.findOneAndUpdate(
        {
          korisnickoIme,
        },
        {
          $pull: {
            ponude: foundOffer,
          },
          $push: {
            historija: foundOffer,
          },
        },
        {
          upsert: true,
        }
      );

      await pravnoLiceSchema.findOneAndUpdate(
        {
          korisnickoIme: pravnoLice,
        },
        {
          $push: {
            historija: { ...foundOffer, korisnickoIme },
          },
        },
        {
          upsert: true,
        }
      );

      return res.status(200).json({ message: "Uspjesno prihvaceno." });
    } else {
      await fizickoLiceSchema.findOneAndUpdate(
        {
          korisnickoIme,
        },
        {
          $pull: {
            ponude: foundOffer,
          },
        },
        {
          upsert: true,
        }
      );

      return res.status(200).json({ message: "Uspjesno odbijeno." });
    }
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
