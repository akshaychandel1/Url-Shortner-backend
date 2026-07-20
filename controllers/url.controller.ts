import { Request, Response } from "express";
import { AuthRequest } from "../interfaces/auth.interface"
import { createShortUrl, redirectUrl, getMyUrls } from "../services/url.service"
import Url from "../models/url.model"


export const createUrl = async (
    req: AuthRequest,
    res: Response,
) =>{
    try {
         const { originalUrl } = req.body;
         const decoded = req.user as { id : string }
        const userId = decoded.id;
        const existingUrl = await Url.findOne({
            originalUrl,
            createdBy: userId
        })

        if(existingUrl){
            res.status(200).json({
                success: true,
                message: "URL already exists",
                data: existingUrl
            })
            return;
        }


        const url = await createShortUrl(
            originalUrl,
            userId
        )
        res.status(201).json({
    success: true,
    message: "Short URL Created Successfully",
    data: url
});

    } catch (error) {
        console.log(error)
        res.status(501).json({
        success : false,
        message : 'Internal Server Error'
    })
    }
}

export const redirect = async(
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { shortCode } = req.params as{shortCode: string};
        const url = await redirectUrl(shortCode);
        res.redirect(url.originalUrl);

    } catch (error) {
        console.log(error);
        if (error instanceof Error ){
            res.status(404).json({
                success: false,
                message: error.message
            })
            return
        }
        res.status(500).json({
            success:false,
            message:"Internal Server error"
        });
    }
}

export const myUrls = async(
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const decoded = req.user as {id:string};
        const urls = await getMyUrls(
            decoded.id
        );
        res.status(200).json({
            success: true,
            data:urls
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            success: false,
            message:"Internal Server Error"
        })
    }
}