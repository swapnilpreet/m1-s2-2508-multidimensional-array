const mongoose=require('mongoose');

const DishSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number
})

const DishModel=mongoose.model("Dish",DishSchema);
module.exports=DishModel;