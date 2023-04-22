import mongoose from "mongoose";

const CallSchema = mongoose.Schema({
    Phone_no:{type:Number,required:true},
    NumberofReports:{type:Number,required:true},
    NumberofGenuie:{type:Number,required:true}
})

export default mongoose.model("Call",CallSchema);