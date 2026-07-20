import mongoose, { Schema } from "mongoose";
import { IUrl } from "../interfaces/url.interface";

const urlSchema = new Schema<IUrl>({
    originalUrl:{
        type : String,
        required : true
    },
    shortCode:{
        type: String,
        required: true,
        unique: true
    },
     clicks : { 
       type: Number,
       default:0
     },
     createdBy : {
        type : String,
        required : true
     }
}, { timestamps : true}
)

const Url = mongoose.model<IUrl>("Url", urlSchema)
export default Url;
