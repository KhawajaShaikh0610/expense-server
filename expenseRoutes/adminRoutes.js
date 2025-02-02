const express = require("express");
const {
  adminLogin,
  getAllUsers,
  getUserExpenses,
} = require("../expenseController/adminController.js");
const { adminAuth } = require("../middleware/adminAuth.js");

const router = express.Router();

router.post("/login", adminLogin);

router.get("/dashboard", adminAuth, (req, res) => {
  res.json({ message: "Welcome, Admin!" });
});

router.get("/users", adminAuth, getAllUsers);

router.get("/expenses", adminAuth, getUserExpenses);
module.exports = router;
