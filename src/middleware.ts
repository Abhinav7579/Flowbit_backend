import jwt from "jsonwebtoken";
const JWT_PASS = process.env.JWT_PASS!;
import express, { NextFunction } from "express"
import { Request,Response} from "express";

declare global {
  namespace Express {
    interface Request {
      id?: string; 
    }
  }
}
export const middleware=(req:Request,res:Response,next:NextFunction):void=>{
    const authheader=req.headers.authorization;
    
    if(!authheader){
    res.status(403).json({
        message:"header not provided"
    });
    return;
    }
    const token=authheader.split(' ')[1]
     if (!token) {
        res.status(401).json({
            message: "Authorization token format is incorrect"
        });
        return;
    }
    try{
        const decoded:any= jwt.verify(token,JWT_PASS);
        req.id=decoded.id;
        next();
    }
    catch(e){
         res.status(403).json({
             message: "Invalid or expired token"
        });
        return;
    }

}
