const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const companyRoutes = require("./routes/companyRoutes");

dotenv.config();
const app = express();

// 🔗 Connexion MongoDB
connectDB();

// ✅ Configuration CORS pour Codespaces / Expo Web
const FRONTEND_ORIGIN = "https://effective-rotary-phone-g4p6w7g9jwwxhwj4j-8081.app.github.dev";

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','PATCH'],
  allowedHeaders: ['Content-Type','Authorization']
}));

// 📦 Body parser
app.use(express.json());

// 📁 Routes
app.use("/api/companies", companyRoutes);
console.log("✅ Routes companies chargées: /api/companies");

// 🚀 Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
