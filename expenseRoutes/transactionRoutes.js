const express = require("express");
const {
  getTransactions,
  addTransaction,
} = require("../expenseController/transactionController.js");
const router = express.Router();

router.get("/:userId", getTransactions);
router.post("/", addTransaction);

module.exports = router;
