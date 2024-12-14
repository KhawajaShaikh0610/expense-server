const {
  addExpense,
  getExpense,
  deleteExpense,
} = require("../controllers/expenses");
const {
  addIncome,
  getAllIncome,
  deleteIncome,
} = require("../controllers/transactions");

const router = require("express").Router();

router.post("/add-income", addIncome);
router.get("/all-incomes", getAllIncome);
router.delete("/delete-income/:id", deleteIncome);
router.post("/add-expense", addExpense);
router.get("/all-expense", getExpense);
router.delete("/delete-expense/:id", deleteExpense);

module.exports = router;
