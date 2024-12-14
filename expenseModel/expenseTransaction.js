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
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);
