import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../models/db";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const signinSchema = z.object({
    email: z.string().email('email should be in valid format'),
    password: z.string()
})

export const signinHandler = async (req: Request, res: Response): Promise<void> => {
    try{
        const { email, password } = req.body;
        
        const validInputs = signinSchema.safeParse(req.body)
        if(!validInputs.success){
            res.json({
                msg: "Please enter correct inputs"
            })
            return;
        }
        const user = await User.findOne({
            email
        })
        
        if(!user) {
            res.json({
                msg: "User does not exist"
            })
            return
        }
        
        const correctPassword = await bcrypt.compare(password, user.password)
        if(!correctPassword) {
             res.json({
                msg: "Enter correct Password!"
            })
            return
        }

        const token = jwt.sign({
            id: user._id,
            email
        }, JWT_SECRET)

        res.json({
            msg: "Successfully signed in",
            token
        })
        }catch(e){
            console.error(e)
            res.json({
                msg: "We got an error",
                error: e
            })
        }
}