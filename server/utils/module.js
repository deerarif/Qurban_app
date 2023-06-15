const mongoose = require("mongoose");
const UserdataSchema = mongoose.Schema({
  Nama: {
    type: String,
    required: true,
  },
  Alamat: {
    type: String,
    required: true,
  },
  Phone: {
    type: String,
    required: true,
  },
  Amount: {
    type: Number,
    required: true,
  },
  Token: {
    type: String,
    unique: true,
    required: true,
  },
  Status: {
    type: Boolean,
    required: true,
  },
  TanggalTerima: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("Userdata", UserdataSchema);
