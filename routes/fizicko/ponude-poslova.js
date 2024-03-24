const router = require("express").Router();
const pravnoLiceSchema = require("../../schemas/pravnoLiceSchema");

router.get("/", async (req, res) => {
  try {
    const pravnaLica = await pravnoLiceSchema.find({}, { password: 0 });
    if (!pravnaLica) {
      return res.status(500).json({ message: "Ostali smo bez poslova." });
    }

    res.status(200).json(pravnaLica);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});

module.exports = router;
