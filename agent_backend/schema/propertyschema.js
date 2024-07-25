import mongoose from "mongoose";
import { amen } from "./amenities.js";

const propertySchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:true,
    },
    name:{
        type:String,
        required:true,
        trim:true,
    },
    location:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:String,
        required:true,
        trim:true,
    },
    amenity:[
        {type:String,
        required:true,
        trim:true,}
]
});

const property = mongoose.model("Property",propertySchema);

export {property};