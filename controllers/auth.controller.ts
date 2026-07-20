import { Request, Response } from "express";
import { registerUser, loginUser, getProfile } from "../services/auth.service";
import { AuthRequest } from "../interfaces/auth.interface";

// SignUp
export const register = async (
    req: Request,
    res: Response
): Promise<void> => {
    try{
        const userData = req.body;

        console.log("Controller:", userData);

        const result = await registerUser(userData)
        console.log(result);
        res.status(200).json({
            success: true,
            message: "Register API Working",
            data: result
        })



    } catch (error) {

    console.error(error);

    if (error instanceof Error) {

        res.status(400).json({
            success: false,
            message: error.message
        });

        return;
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });

}
}

// Login
export const login = async ( req: Request, res:Response): Promise<void> =>{
    try{
        const {email, password} = req.body;
        const result = await loginUser(email, password);

        res.status(200).json({
            success: true,
            message: "Login Succesfull",
            data: result
        })

    }catch(error){
        console.log(error)
        if(error instanceof Error){
            res.status(400).json({
                success: false,
                message: error.message
            })
            return;
        }
         res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
    
}

// Get Profile 
export const profile = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {

        const decoded = req.user as {id : string };
        const user = await getProfile(decoded.id);

        console.log(req.user);

        res.status(200).json({
            success: true,
            message: "Profile Api Working",
              data: user
        })
        
    } catch (error) {

    console.log(error);

    if(error instanceof Error){

        res.status(400).json({
            success:false,
            message:error.message
        })

        return;
    }


    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    });
}
}