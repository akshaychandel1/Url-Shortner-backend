import { nanoid } from "nanoid"
import Url from "../models/url.model"
import { IUrl } from "../interfaces/url.interface"

export const createShortUrl = async(
    originalUrl: string,
    userId: string
) => {
    const shortCode = nanoid(6)

    const url = await Url.create({
        originalUrl,
        shortCode,
        createdBy: userId
    })
    return url
}

export const redirectUrl = async (
    shortCode: string
) => {
   const url = await Url.findOne({
        shortCode
    })
    if(!url){
        throw new Error("URL not Found")
    }
    url.clicks +=1;
    await url.save();
   return url;
}

export const getMyUrls = async(
    userId: string
) => {
    const urls = await Url.find({
        createdBy: userId
    });
    return urls;
}