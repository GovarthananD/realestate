import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const DB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected RightNow");
    }catch(error){
        console.log("Something error while connecting database");
    }
}

export {DB};
