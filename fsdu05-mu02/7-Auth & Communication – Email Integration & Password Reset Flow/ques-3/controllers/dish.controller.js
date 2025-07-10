const DishModel = require("../models/dish.model");

exports.createDish = async (req, res) => {
  const dish = new DishModel(req.body);
  await dish.save();
  res.send(dish);
};

exports.getDishes = async (req, res) => {
  const dishes = await DishModel.find();
  res.send(dishes);
};

exports.updateDish = async (req, res) => {
  const dish = await DishModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!dish) return res.status(404).send("Dish not found");
  res.send(dish);
};

exports.deleteDish = async (req, res) => {
  const dish = await DishModel.findByIdAndDelete(req.params.id);
  if (!dish) return res.status(404).send("Dish not found");
  res.send({ message: "Dish deleted" });
};
