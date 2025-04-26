const ExpenseUser = require("../expenseModel/expenseUser.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { decryptData } = require("../utils/encrypt.js");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await ExpenseUser.create({ name, email, password });
    res.status(201).json({
      message: "User registered successfully!!!",
      data: user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await ExpenseUser.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const decryptedPassword = decryptData(password);

    const isMatch = await bcrypt.compare(decryptedPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await ExpenseUser.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(401).json({ message: "Invalid credentials" });
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "24h",
//     });
//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (error) {
//     res.status(500).json({ error: err.message });
//   }
// };

module.exports = { register, login };
