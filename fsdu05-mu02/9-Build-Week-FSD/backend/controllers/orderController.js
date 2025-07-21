import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import MedicineModel from "../models/Medicine.js";

const addOrderItems = asyncHandler(async (req, res) => {
  const uniqueOrderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    shippingStatus,
    orderId,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    for (const item of orderItems) {
      const medicine = await MedicineModel.findById(item.Medicine);
      if (!medicine) {
        res.status(404);
        throw new Error(`Product not found: ${item.name}`);
      }
      if (medicine.countInStock < item.qty) {
        res.status(400);
        throw new Error(`Not enough ${medicine.name} in stock.`);
      }
    }

    const order = new Order({
      orderItems: orderItems.map((item) => ({
        ...item,
        Medicine: item.Medicine,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaid,
      paidAt: Date.now(),
      shippingStatus: shippingStatus || "Packed",
      orderId: orderId || uniqueOrderId,
    });

    const createdOrder = await order.save();
    for (const item of orderItems) {
      await MedicineModel.findByIdAndUpdate(item.Medicine, {
        $inc: { countInStock: -item.qty },
      });
    }
    res.status(201).json(createdOrder);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
