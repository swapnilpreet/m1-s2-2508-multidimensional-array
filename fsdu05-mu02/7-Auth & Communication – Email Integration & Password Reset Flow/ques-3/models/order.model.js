const mongoose=require('mongoose');

const OrederSchema=new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User-Dish" },
  dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
  status: {
    type: String,
    enum: ["Order Received", "Preparing", "Out for Delivery", "Delivered"],
    default: "Order Received",
  },
  assignedChef: { type: mongoose.Schema.Types.ObjectId, ref: "User-Dish" },
})
const OrderModel=mongoose.model("Order",OrederSchema);
module.exports=OrderModel;
