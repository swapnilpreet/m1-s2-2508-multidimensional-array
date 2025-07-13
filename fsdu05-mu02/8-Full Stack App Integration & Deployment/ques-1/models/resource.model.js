

const mongoose=require('mongoose');


const ResourceSchema=new mongoose.Schema({
    title: { type: String, required: true },
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
},
{timestamps:true}
);

const ResourceModel=mongoose.model("Resource",ResourceSchema);

module.exports=ResourceModel;
