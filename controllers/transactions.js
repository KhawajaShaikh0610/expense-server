const incomeModel = require("../models/incomeModel.js");

exports.addIncome = async (req, res) => {
  const { title, amount, category, description, date } = req.body;

  const income = incomeModel({ title, amount, category, description, date });

  try {
    if (!title || !category || !description || !date) {
      res.status(400).json({ message: "All fields are required" });
    }
    if (amount <= 0 || !amount === "number") {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }
    await income.save();
    res.status(200).json({ message: "Income Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }

  console.log(income);
};

exports.getAllIncome = async (req, res) => {
  try {
    const incomes = await incomeModel.find().sort({ createdAt: -1 });

    if (incomes.length === 0) {
      return res.status(404).json({ message: "No income data found" });
    }
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteIncome = async (req, res) => {
  const { id } = req.params;
  incomeModel
    .findByIdAndDelete(id)
    .then((income) => {
      res.status(204).json({ message: "Income Deleted" });
    })
    .catch((err) => {
      res.status(500).json({ message: "Internal Server Error" });
    });
};
