import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { DB } from "./database/database.js";
import  userRouter  from "./routes/authentication.js";
import villa  from "./routes/propertyroute.js";
dotenv.config();



const app = express();
app.use(express.json());
app.use(cors());


DB();
app.use("/auth",userRouter);
app.use("/api",villa);

app.get("/", (req, res) => {
    res.send({message:"Hello world"})
});


app.listen(process.env.PORT, () => console.log("Server Running On PORT"));