const router = require("express").Router();
const fizickoLiceSchema = require("../../schemas/fizickoLiceSchema");

router.get("/:korisnik", async (req, res) => {
  const { korisnik } = req.params;

  try {
    const user = await fizickoLiceSchema.findOne({
      korisnickoIme: korisnik,
    });

    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronaden" });
    }

    return res.status(200).json(user.historija);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
