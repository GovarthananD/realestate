import mongoose, { mongo } from "mongoose";

const amenitySchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:true,
    },
    logo:{
        type:String,
        required:true,
        trim:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    }
})

const amen = mongoose.model("Amen", amenitySchema);

export {amen};