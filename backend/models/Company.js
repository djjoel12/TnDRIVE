// backend/models/Company.js
const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  whatsapp: { type: String, required: true },
  motDePasse: { type: String, required: true },
  logo: { type: String, default: "" },
  dateCreation: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
