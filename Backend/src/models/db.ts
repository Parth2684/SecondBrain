import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema<IUser> (
    {
        firstName: {type: String, required: true},
        lastName: {type: String, required: true},
        email: {type: String, required: true, unique:true},
        password: {type: String, required: true},
    }
)
const User = model<IUser>("User", UserSchema)

interface IBrain extends Document {
    title: string;
    description?: string;
    user: IUser["_id"]; 
}

const BrainSchema: Schema = new Schema<IBrain> (
    {
        title: {type: String, required: true},
        description: {type: String},
        user: {type: Schema.Types.ObjectId, ref: "User", required: true},
    }
)

const Brain = model<IBrain>("Brain", BrainSchema)

export  {
    User,
    Brain
}



