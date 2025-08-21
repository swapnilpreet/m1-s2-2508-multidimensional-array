import mongoose ,{ Schema } from "mongoose";


export interface IStudent extends Document{
    name:string,
    email:string,
    age:number,
    course:"Web Developer" | "Data Science" | "UI-UX"
}

const studentSchema : Schema<IStudent>=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        minlength:[3,"name must be at least 3 character long"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/^\S+@\S+\.\S+$/, "Please enter a valid email"]
    },
    age:{
        type:Number,
        required:[true,"Age is required"],
        min:[5,"age must be at least "]
    },
    course:{
        type:String,
        required:[true,"Course is required"],
        enum:["Web Developer","Data Science","UI-UX"]
    }
})

const StudentModel=mongoose.model<IStudent>("Student",studentSchema);
export default StudentModel;