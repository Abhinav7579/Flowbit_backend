import express from "express";
const userRouter = express.Router();
import axios from "axios"
import { userRequiredBody,SigninRequiredbody } from "../zod";
import { userModel } from "../db";
import bcrypt from "bcrypt"
const fs = require('fs');
const path = require('path');
import { middleware } from "../middleware";
const JWT_PASS = process.env.JWT_PASS!;
import jwt from "jsonwebtoken"
userRouter.post("/signup",async(req,res)=>{
    const parsed=userRequiredBody.safeParse(req.body);

    if(!parsed.success){
        res.json({
            success:false,
            message:"incorect credentials"
        })
        return;
    }
    const{name,email,password}=parsed.data;

    const findUser=await userModel.findOne({
        email:email
    })
    if(findUser){
        res.status(403).json({
            success:false,
            message:"user already exist"
        })
    }

    const hashPassord=await bcrypt.hash(password,5);
    try{
    await userModel.create({
        name:name,
        email:email,
        password:hashPassord
    })
  
    res.status(200).json({
        success:true,
        message:"user successfully created"
    })
}
catch(e){
    res.status(403).json({
        success:false,
        message:"error in creating a user "+e
    })
}
})
userRouter.post("/signin",async(req,res)=>{
      const parsed=SigninRequiredbody.safeParse(req.body);

    if(!parsed.success){
        res.status(403).json({
            success:false,
            message:"incorect credentials"
        })
        return;
    }
    const{email,password}=parsed.data;
    const user=await userModel.findOne({
        email:email
    })
    if(!user){
         res.status(403).json({
        success:false,
        message:"email does not exist"
    })
    return;
    }

    const passCompare=await bcrypt.compare(password,user.password);
    if(passCompare){
        const token=jwt.sign({id:user._id},JWT_PASS);
        res.status(200).json({
             success:true,
             token:token 
            });
    }
     else{
            res.status(403).json({ 
                success:false,
                message: "Incorrect credentials" });
        }

})
userRouter.get("/me/screens",middleware,(req, res) => {
    const tenant = req.id;
    const registryPath = path.join(__dirname,'../registry.json');

    fs.readFile(registryPath, 'utf8', (err: NodeJS.ErrnoException |null,data: string) => {
        if (err) {
            return res.status(500).json({ 
                error: "Unable to read registry" 
            });
        }
        try {
            const registry:Array<{ tenant: string; screenUrl: string }>=JSON.parse(data);
            const screens = registry.filter(r => r.tenant === tenant);
            res.json(screens);
        } catch (e){
            res.status(500).json({ 
                error: "Invalid registry data" 
            });
        }
    });
});

userRouter
export default userRouter;