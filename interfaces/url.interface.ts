import { Document } from "mongoose";

export interface IUrl extends Document {
    originalUrl : string;
    shortCode : string;
    clicks : number;
    createdBy: string;
}