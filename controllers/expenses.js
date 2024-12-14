const ExpenseSchema = require("../models/expenseModel.js");

exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const expense = ExpenseSchema({ title, amount, category, description, date });

  try {
    if (!title || !category || !description || !date) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }
    await expense.save();
    res.status(200).json({ message: "expense Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  console.log(expense);
};

exports.getExpense = async (req, res) => {
  try {
    const expenses = await ExpenseSchema.find().sort({ createdAt: -1 });

    if (expenses.length === 0) {
      return res.status(404).json({ message: "No expense data found" });
    }
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
      res.status(204).json({ message: "expense Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};
