// backend/routes/companyRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/Company");

const router = express.Router();

// 📝 Inscription compagnie
router.post("/register", async (req, res) => {
  try {
    const { nom, email, whatsapp, motDePasse } = req.body;
    const existe = await Company.findOne({ email });
    if (existe) return res.status(400).json({ message: "Email déjà utilisé" });

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(motDePasse, salt);

    const nouvelleCompagnie = await Company.create({
      nom,
      email,
      whatsapp,
      motDePasse: hash,
    });

    res.status(201).json({ message: "Compte créé avec succès", compagnie: nouvelleCompagnie });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
});

// 🔑 Connexion compagnie
router.post("/login", async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const compagnie = await Company.findOne({ email });
    if (!compagnie) return res.status(400).json({ message: "Compte introuvable" });

    const match = await bcrypt.compare(motDePasse, compagnie.motDePasse);
    if (!match) return res.status(401).json({ message: "Mot de passe incorrect" });

    const token = jwt.sign({ id: compagnie._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Connexion réussie", token, compagnie });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", erreur: err.message });
  }
});

module.exports = router;
