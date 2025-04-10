const ExpenseTransaction = require("../expenseModel/expenseTransaction.js");

const getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    const transactions = await ExpenseTransaction.find({ userId }).sort({
      createdAt: -1,
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { userId, description, amount, type } = req.body;
    const transaction = await ExpenseTransaction.create({
      userId,
      description,
      amount,
      type,
    });

    console.log(transaction)
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getTransactions, addTransaction };
