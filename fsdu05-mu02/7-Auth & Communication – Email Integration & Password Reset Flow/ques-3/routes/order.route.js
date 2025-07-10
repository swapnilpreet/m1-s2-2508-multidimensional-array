const express = require("express");
const router = express.Router();
const order = require("../controllers/order.controller");
const auth = require("../middlewares/Auth.middleware");
const role = require("../middlewares/Role.middleware");

router.post("/", auth, role("user"), order.createOrder);
router.get("/", auth, order.getOrders);
router.patch("/:id", auth, role("chef"), order.updateStatus);
router.delete("/:id", auth, role("user"), order.deleteUserOrder);

module.exports = router;
