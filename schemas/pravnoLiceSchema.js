const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const pravnoLiceSchema = mongoose.Schema({
  ime: reqString,
  sjediste: reqString,
  telefon: reqString,
  IDBroj: reqString,
  djelatnost: reqString,
  email: reqString,
  logotip: {
    type: String,
    required: false,
    default: "None",
  },
  korisnickoIme: reqString,
  password: reqString,
  historija: {
    type: Array,
    requried: false,
    /*
    Array Objekata u formatu:
      {
        Datum: NN,
        ImeFizickogLica: NN;
        Telefon: NN;
        OstvarenProfit: NN
      }
    */
  },
  klijenti: {
    type: Array,
    required: false,
    /*
    Array Objekata u formatu:
      {
        ImeFizickogLica: NN;
        Telefon: NN;
        OstvarenProfit: NN
      }
    */
  },
  zahtjevi: {
    type: [Object],
    required: false,
  },
});

module.exports = mongoose.model("pravnoLiceSchema", pravnoLiceSchema);
