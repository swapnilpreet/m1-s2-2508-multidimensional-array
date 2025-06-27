const mongoose=require('mongoose');


const ProfileSchema=new mongoose.Schema({
    bio:{
        type:String,
        default:"",
    },
    socialMediaLinks:{
         type: [String],
    default: []
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true,
    }
})

const ProfileModel=mongoose.model('profile',ProfileSchema);

module.exports=ProfileModel;

