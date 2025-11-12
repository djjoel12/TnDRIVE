// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const companyRoutes = require("./routes/companyRoutes");

dotenv.config();
const app = express();

connectDB();

app.use(cors({
  origin: true,  // ✅ Autorise toutes les origines
  credentials: true
}));
app.use(express.json());

app.use("/api/companies", companyRoutes);
console.log("✅ Routes companies chargées: /api/companies");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur le port ${PORT}`));
