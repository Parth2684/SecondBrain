import * as dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
const PORT: number = 3000;
import  { MONGO_URI }  from './config'
import { signupHandler } from './controllers/signupHandler'
import { signinHandler } from './controllers/signinHandler'
import { postBrainHandler } from './controllers/postBrainHandler';
import { authMiddleware } from './middlewares/authMiddleware';
import { getBrainHandler } from './controllers/getBrainHandler';
import { getUserDetailsHandler } from './controllers/getUserDetailsHandler';
import './types/override'
import { putBrainHandler } from './controllers/putBrainHandler';
import { deleteBrainHandler } from './controllers/deleteBrainHandler';


const app = express();
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(MONGO_URI as string)
    .then(() => {
        console.log("Connected To Database")
    })
    .catch((err) => {
        console.log("Error connecting to database", err)
    })


app.post("/signup", signupHandler)
app.post("/signin", signinHandler)
app.post("/createBrain", authMiddleware, postBrainHandler)
app.get("/getBrain", authMiddleware, getBrainHandler)
app.get("/userDetails", authMiddleware, getUserDetailsHandler)
app.put("/editBrain", authMiddleware, putBrainHandler)
app.delete("/deleteBrain", authMiddleware, deleteBrainHandler)


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))