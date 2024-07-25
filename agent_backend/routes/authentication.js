import express from "express";
import {User, generateToken} from "../schema/authSchema.js";
import {getUserByEmail} from "../controllers/userRoute.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const userRouter = express.Router();


userRouter.post("/signup", async (req, res) => {
    try{
        let user = await getUserByEmail(req);
        if(user){
            res.status(400).send({message:"User already exist"});
        }
        const salt = await bcrypt.genSalt(13);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email:req.body.email,
            mobile:req.body.mobile,
            password:hashedPassword,
        }).save();

        const token = generateToken(user._id);
        res.status(201).send({message:"Agent Registered Successfully", token});
    }catch(error){
        console.log(error);
        res.status(500).send({message:"Internal server error"});
    }
});

userRouter.post("/login", async (req, res) => {
    try{
        const user = await getUserByEmail(req);
        if (!user) {
            return res.status(404).send({ message: "User doesn't exist" });
          }

        let validatePassword = false;

        let isMatch = await bcrypt.compare(req.body.password,user.password);
          
    if (isMatch) {
      validatePassword = true;
    }

    if (!validatePassword) {
      return res.status(400).send({ message: "invalid password" });
    }

    const token = generateToken(user._id);
    res.status(200).send({ message: "Logged in successfully", token });
    }catch(error){
        res.status(500).send({message:"Internal server error "+error.message});
    }
});


export default userRouter;
