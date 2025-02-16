import { Request, Response } from "express";
import { z } from 'zod'
import { User } from "../models/db";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import { JWT_SECRET } from "../config";

const signupSchema = z.object({
    firstName: z.string().min(2,"name should be atleast 2 letters long"),
    lastName: z.string().min(2,"last name should be atleast 2 letters long"),
    email: z.string().email("Email should be in valid format"),
    password: z.string().min(8,"password should atleast be 8 characters"),
})

export const signupHandler = async (req: Request, res: Response): Promise<void> => {
    try{
        const {firstName, lastName, email, password} = req.body;
        
        const validInputs = signupSchema.safeParse(req.body)
        if(!validInputs.success){
            res.json({
                msg: "Enter Valid inputs"
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })
        
        const token = jwt.sign({
            id: user._id,
            email
        }, JWT_SECRET) 

        res.json({
            msg: "You are successfully signed in",
            token
        })
    }catch(e){
        console.error(e)
        res.json({
            msg: "There was some error signing you in!",
            error: e
        })
    }
    
}