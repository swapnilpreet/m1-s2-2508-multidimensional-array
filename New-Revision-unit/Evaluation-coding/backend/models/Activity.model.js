const { default: mongoose } = require("mongoose");

const ActivityScehema = new mongoose.Schema(
  {
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: { type: String, required: true },
    meta: { type: Object },
  },
  { timestamps: true }
);

const ActivityModel = mongoose.model("Activity", ActivityScehema);
module.exports = ActivityModel;
