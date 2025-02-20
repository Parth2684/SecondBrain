import { Request, Response } from "express";
import { Brain } from "../models/db";

interface PutBrainHandlerInputs {
    title: string;
    description?: string;
}
export const putBrainHandler = async (req: Request, res: Response) => {
    try{
        const brainId = req.query.brainId;
        const {title, description}: PutBrainHandlerInputs = req.body
        await Brain.findByIdAndUpdate(brainId, {
            title,
            description
        })
        res.json({
            msg: "Brain edited successfully",
        })
    }catch(e){
        console.error(e)
        res.json({
            msg: "we got an error",
            err: e
        })
    }
}