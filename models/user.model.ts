import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required:true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
)

const User = mongoose.model<IUser>("User", userSchema);
export default User;