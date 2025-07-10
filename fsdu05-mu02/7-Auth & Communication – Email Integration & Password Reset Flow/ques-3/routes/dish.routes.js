const express = require("express");
const router = express.Router();
const dishController = require("../controllers/dish.controller");
const auth = require("../middlewares/Auth.middleware");
const role = require("../middlewares/Role.middleware");

router.post("/", auth, role("admin"), dishController.createDish);
router.get("/", auth, dishController.getDishes);
router.put("/:id", auth, role("admin"), dishController.updateDish);
router.delete("/:id", auth, role("admin"), dishController.deleteDish);

module.exports = router;
