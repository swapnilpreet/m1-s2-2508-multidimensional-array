const mongoose = require('mongoose');

const AddressSchema=new mongoose.Schema({
    street:String,
    city:String,
    country:{type:String,default:"India"},
    pincode:Number,
    whosAddress:[{type:mongoose.Schema.Types.ObjectId,ref:"userr"}]
})

const AddressModel=mongoose.model("Addres",AddressSchema);

module.exports=AddressModel;