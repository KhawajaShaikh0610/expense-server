const mongoose = require("mongoose");

const expenseTransactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ExpenseUser",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExpenseTransaction", expenseTransactionSchema);
