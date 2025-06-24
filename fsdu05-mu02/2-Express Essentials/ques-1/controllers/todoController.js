const model = require("../models/todoModel");

exports.getAll=async(req,res,next) => {
  try {
    const todos=await model.getAllTodos();
    res.json(todos);
  } catch(err){
    next(err);
  }
};
