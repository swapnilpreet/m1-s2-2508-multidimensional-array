const { default: mongoose } = require("mongoose");

const BoardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  members: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      role: { type: String, enum: ["admin", "member"], default: "member" },
    },
  ],
  columns: [{
    title: { type: String, required: true },
    order:{ type: Number, required: true, default: 0}
  }]
},{ timestamps: true });

const BoardModel = mongoose.model("Board", BoardSchema);
module.exports = BoardModel;
