import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { IUser } from "../interfaces/user.interface";
import User from "../models/user.model";


export const registerUser = async (userData: IUser) =>{
    console.log(userData);

    // 1. User Register Request
    const existingUser = await User.findOne({
        email:userData.email
    })
    if(existingUser){
        throw new Error('Email Already Exist')
    } 

    // 2. bcrypt - Salt Generate
    const salt = await bcrypt.genSalt(10)

    // 3. bcrypt - Password Hash
    const hashedPassword = await bcrypt.hash(
        userData.password,
        salt
    )

    // 4. Replace Password
    userData.password = hashedPassword;

    // 5. Save User, Create User
   const saveUser = await User.create(userData);
//    console.log(saveUser);

    // 6. JWT Generate JWT Token Come in Play Here 
    const token = jwt.sign({
        id: saveUser._id
    },process.env.JWT_SECRET as string,
    {
        expiresIn: "7d"
    }
)

    // 7. Return
    return {
        user: {      id: saveUser._id,
        name: saveUser.name,
        email: saveUser.email
    },
        token
    };
}

export const loginUser = async(email:string, password:string) =>{
   // Step 1 find email and matching Password
    const user = await User.findOne({ email })
    if (!user) {
    throw new Error("Invalid Email");
}
    const isPasswordMatched = await bcrypt.compare( password, user.password);
    if(!isPasswordMatched){
        throw new Error('Invalid password')
    }



    // 2nd Step generate Jwt new token for login
    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d"
        }
    )

    // 3rd Step Return Jwt
    return{
        user:{
            id: user._id,
            name: user.name,
            email: user.email
        },
        token
    }
}

export const getProfile = async(userId: string) => {
    const user = await User.findById(userId).select("-password");
        if(!user){
            throw new Error('User not found ')
        }
    return user;
}