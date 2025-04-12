const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const expenseUser = require("../expenseModel/expenseUser");
const expenseTransaction = require("../expenseModel/expenseTransaction.js");

dotenv.config();

exports.adminLogin = async (req, res) => {
  try {
    const { secretKey } = req.body;

    console.log("Received Secret Key:", secretKey); // Debugging
    console.log("Expected Secret Key from .env:", process.env.ADMIN_SECRET_KEY); // Debugging

    if (!secretKey || secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(401).json({ message: "Invalid Admin Secret Key" });
    }

    const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.json({ message: "Admin Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const { authorization } = req.headers;

    // console.log(req.headers);

    if (!authorization) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const users = await expenseUser.find({}, "-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getUserExpenses = async (req, res) => {
  try {
    const { userId } = req.query;

    const { authorization } = req.headers;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }
    if (!authorization) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    const expenses = await expenseTransaction.find({ userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
