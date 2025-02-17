import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "../config";
import { User } from "../models/db";


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const auth = req.headers.authorization as string;
    const token = auth.replace('Bearer ', '')
    if(!token){
        res.json({
            msg: "Auth Error Token Missing"
        })
        return;
    }
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload ;
    if(!decoded) {
        res.json({
            msg: "Authentication error, incorrect token"
        })
        return;
    }
    const user = await User.findById(decoded.id).select("-password")
    if(!user) {
        res.json({
            msg: "Authentication Error, User not found from token"
        })
        return;
    }
    req.email = decoded.email ;
    req.userId = decoded.id;
    next()
    }catch (e){
        console.error(e)
        res.json({
            msg: "We got an error",
            error: e
        })
    }
}