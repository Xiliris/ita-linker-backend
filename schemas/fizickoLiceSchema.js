const mongoose = require("mongoose");

const reqString = {
  type: String,
  required: true,
};

const fizickoLiceSchema = mongoose.Schema({
  ime: reqString,
  prezime: reqString,
  telefon: reqString,
  email: reqString,
  korisnickoIme: reqString,
  password: reqString,
  ponude: {
    type: Array,
    required: false,
    /*
      Array Objekata u formatu:
       {
        Datum: NN,
        ImePravnogLica: NN,
        Telefon: NN,
        Cijena: NN
       }
    */
  },
  historija: {
    type: Array,
    required: false,
    /*
      Array Objekata u formatu:
       {
        Datum: NN,
        ImePravnogLica: NN,
        Telefon: NN,
        Cijena: NN
       }
    */
  },
});

module.exports = mongoose.model("fizickoLiceSchema", fizickoLiceSchema);
