import { Request, Response } from "express";
import { Brain } from "../models/db";

interface PostBrainInputs {
    title: string;
    description?: string
}

export const postBrainHandler = async (req: Request, res: Response) => {
    try{
        const userId = req.userId;
        const { title, description }: PostBrainInputs = req.body;
        await Brain.create({
            title,
            description,
            user: userId
        })
        res.json({
            msg: "Data is successfully saved in Second Brain"
        })        
    }
    catch(e) {
        console.error(e);
        res.json({
            msg:"Data was probably not saved",
            error: e
        })
    }
}