const mongoose = require('mongoose');

const bookingSchema=new mongoose.Schema({
  serviceName:String,
  dateTime:Date,
  status:{type:String,enum:['pending','approved','rejected','cancelled'], default:'pending' },
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
});

module.exports=mongoose.model('Booking', bookingSchema);