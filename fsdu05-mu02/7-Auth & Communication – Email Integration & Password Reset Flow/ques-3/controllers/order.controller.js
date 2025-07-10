const OrderModel = require("../models/order.model");
const UserModel = require("../models/user.model");

exports.createOrder = async (req, res) => {
  const chefs = await UserModel.find({ role: "chef" });
  const randomChef = chefs[Math.floor(Math.random() * chefs.length)];

  const order = new Order({
    user: req.user.id,
    dish: req.body.dishId,
    assignedChef: randomChef._id,
  });
  await order.save();
  res.send(order);
};

exports.getOrders = async (req, res) => {
  const filter = req.user.role === "user" ? { user: req.user.id } : {};
  const orders = await OrderModel.find(filter).populate("dish assignedChef");
  res.send(orders);
};

exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const order = await OrderModel.findById(req.params.id);
  if (!order) return res.status(404).send("Not found");
  order.status = status;
  await order.save();
  res.send(order);
};

exports.deleteUserOrder = async (req, res) => {
  const order = await OrderModel.findOne({ _id: req.params.id, user: req.user.id });

  if (!order) return res.status(404).send("Order not found");
  if (order.status !== "Order Received")
    return res.status(400).send("Can't delete, already being prepared");

  await order.remove();
  res.send({ message: "Order deleted" });
};