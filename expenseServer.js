const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./expenseConfig/expenseDB.js");
const authRoutes = require("./expenseRoutes/authRoutes.js");
const transactionRoutes = require("./expenseRoutes/transactionRoutes.js");
const adminRoutes = require("./expenseRoutes/adminRoutes.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Backend is running" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
