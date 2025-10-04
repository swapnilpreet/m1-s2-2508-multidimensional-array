const mongoose = require("mongoose");

const ColumnSchema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    title: { type: String, required: true },
    order: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);
const ColumnModel = mongoose.model("Column", ColumnSchema);
module.exports = ColumnModel;
