const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./expenseConfig/expenseDB.js");
const authRoutes = require("./expenseRoutes/authRoutes.js");
const transactionRoutes = require("./expenseRoutes/transactionRoutes.js");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
