import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    age:{type:Number, required:true,min:1} 
})

export default mongoose.model("User", userSchema)