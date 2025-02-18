import { Request, Response } from "express";

export const getUserDetailsHandler = async (req: Request, res: Response) => {
    try{
    const firstName = req.firstName;
    const lastName = req.lastName;
    const email = req.email;
    res.json({
        firstName,
        lastName,
        email
    })
    }catch(e){
        console.error(e)
        res.json({
            msg: "Error fetching user details",
            error: e
        })
    }
}