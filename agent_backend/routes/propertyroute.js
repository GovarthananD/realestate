import express from "express";
import { property } from "../schema/propertyschema.js";
import {isAuthenticated} from "../controllers/authorization.js";
import dotenv from "dotenv";
dotenv.config();

const villa = express.Router();

villa.post("/addhome",isAuthenticated, async (req, res) => {
    try{
        const {id, name, location, price, amenity} = req.body;
        const newProperty = new property({
            id,
            name,
            location,
            price,
            amenity
        });

        const savedProperty = await newProperty.save();
        res.status(201).send({message:"Property added successfully", savedProperty});
    }catch(error){
        res.status(500).send({message:"Internal server error"});
    }
})

villa.get("/allhome",isAuthenticated, async (req, res) => {
    try{
        const result = await property.find();
        res.status(201).send({message:"Hotels", result});
    }catch(error){
        res.status(500).send({message:"Internal server error"});
    }
});

villa.get("/:id",isAuthenticated, async (req, res) => {
    try{
        const {id} = req.params;
        const result = await property.findOne({id:id});
        result ? res.send(result) : res.status(404).send({message:"Hotel Not Found"});
    }catch(error){
        res.status(500).send({message:"Internal server error"});
    }
});

villa.put("/:id",isAuthenticated, async (req, res) => {
    try{
    const {id} = req.params;
    const updateProperty = req.body;

    const result = await property.updateOne({id:id}, {$set:updateProperty});
    res.status(201).send({message:"Property Updated", result});
    }catch(error){
        res.status(500).send({message:"Internal server error"});
    }
});

villa.delete("/:id", async (req, res) => {
    const {id} = req.params;
    const result = await property.deleteOne({id:id});
    result ? res.send(result) : res.status(404).send({message:"Property Not Found"})
})

export default villa;

