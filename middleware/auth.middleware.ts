import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/auth.interface"

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {

    try{
        const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            success: false,
            message: "Access Denied. No Token Provided"
        })
    }

    const parts = authHeader.split(" ")

    if(parts[0] !== 'Bearer' || !parts[1]){
        return res.status(401).json({
            success: false,
            message: "Invalid Token Format"
        })
    }
    const token = parts[1]

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string 
    );
    req.user = decoded;
    next();
    }catch(error){
        console.log(error);
        return res.status(401).json({
            success: false,
            message: 'token expired'
        })
        
    }
}