const router = require("express").Router();
const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");

router.get("/:korisnik", async (req, res) => {
  const { korisnik } = req.params;

  try {
    const user = await pravnoLiceSchema.findOne({
      korisnickoIme: korisnik,
    });

    if (!user) {
      return res.status(404).json({ message: "Korisnik nije pronaden" });
    }

    return res.status(200).json(user.zahtjevi);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
