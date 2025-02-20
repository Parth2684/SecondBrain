import { Request, Response } from "express";
import { Brain } from "../models/db";

export const deleteBrainHandler = async (req: Request, res: Response) => {
    try{
        const brainId = req.query.brainId;
        await Brain.findByIdAndDelete(brainId) 
        res.json({
            msg:"Brain deleted successfully"
        })
    }catch(e){
        console.error(e)
        res.json({
            msg: "Some error in deleting",
            err: e
        })
    }
}