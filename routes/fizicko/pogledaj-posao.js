const router = require("express").Router();
const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pravnaLica = await pravnoLiceSchema.findOne(
      { korisnickoIme: id },
      { password: 0 }
    );
    if (!pravnaLica) {
      return res.status(500).json({ message: "Ne mozemo pronaci taj posao." });
    }

    res.status(200).json(pravnaLica);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
