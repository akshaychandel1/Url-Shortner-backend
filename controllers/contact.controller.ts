import { Request, Response } from "express";
import transporter from "../config/mail";


export const sendContactMail = async(
    req:Request,
    res:Response
)=>{


    try{


        const {
            name,
            email,
            message
        } = req.body;



        if(!name || !email || !message){

            return res.status(400).json({

                message:"All fields required"

            });
        }

       const result = await transporter.sendMail({

            from: process.env.SMTP_EMAIL,

            to: process.env.CONTACT_EMAIL,


            subject:`New Contact Message from ${name}`,
            html:`
            <h2>New Contact Request</h2>
            <p>
            <b>Name:</b> ${name}
            </p>
            <p>
            <b>Email:</b> ${email}
            </p>
            <p>
            <b>Message:</b>
            </p>
            <p>
            ${message}
            </p>
            `

        });

        res.status(200).json({

            success:true,

            message:"Message sent successfully",
            // data: result

        });
    }
    catch(error){
        console.log(error);

        res.status(500).json({
            
            message:"Mail sending failed"

        });
    }
}