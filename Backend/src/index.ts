import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import { MONGO_URI }  from './config'
import { signupHandler } from './controllers/signupHandler'
import { signinHandler } from './controllers/signinHandler'

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
