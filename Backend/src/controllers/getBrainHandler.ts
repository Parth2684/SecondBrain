import { Request, Response } from "express";
import { Brain } from "../models/db";


export const getBrainHandler = async (req: Request, res: Response) => {
    try{
        const userId = req.userId
        const brain = await Brain.find({user: userId})
        res.json({
            msg: "All the required Brains are here",
            brain
        })
    }catch(e) {
        console.error(e);
        res.json({
            msg: "there was an error fetching your brains",
            err: e
        })
    }
}
