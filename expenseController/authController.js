const ExpenseUser = require("../expenseModel/expenseUser.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  } catch (error) {}
};

const login = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = { register, login };
