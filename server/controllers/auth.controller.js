import { User } from "../models/user.model.js";
import { generateTokenAndCookie } from "../utils/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs"

export const signup = async  (req, res)=>{
    const  {name, email, password} = req.body;
   try {
    if(!name || !email || !password){
        throw new Error("All fields are requireed");
    }
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
       return res.status(400).json({error: "user already exist"})
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const verificationToken  = Math.floor(100000 + Math.random() * 900000).toString()

    const user = new User({
        name,
        email,
        password: hashPassword,
        lastLogin: Date.now(),
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24*60*60*1000 // 24hrs
    })

    await user.save();

    //jwt 
    generateTokenAndCookie(res, user.id )

    res.status(201).json({
        success: true,
        message: "user created successfully",
        user: {
            ...user._doc,
            password: undefined,
        },
    })
    
   } catch (error) {
    res.status(400).json({message: error.message})
   }
}


export const login = async  (req, res)=>{
    res.send("login route");
}


export const logout = async  (req, res)=>{
    res.send("logout route");
}