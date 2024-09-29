import { sendPasswordResetEmail, sendResetSuccessEmail, sendVerificaionEmail, sendWelcomeEmail } from "../mailtrap/emails.js";
import { User } from "../models/user.model.js";
import { generateTokenAndCookie } from "../utils/generateTokenAndSetCookie.js";
import bcrypt from "bcryptjs"
import crypto from "crypto"

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

   await sendVerificaionEmail(user.email, verificationToken);

    res.status(201).json({
        success: true,
        message: "user created successfully",
        user: {
            ...user._doc,
            password: undefined,
        },
    })
    
   } catch (error) {
    res.status(400).json({error: error.message})
   }
}

export const verifyEmail = async (req, res)=>{
    const {code} = req.body;
    try {
        const user = await User.findOne({
            verificationToken: code,
            verificationTokenExpiresAt: { $gt: Date.now()}
        })

        if(!user){
            return res.status(400).json({error: "invalid or expire verification token"})
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email, user.name);

        res.status(200).json({message: "Email verified successfully", user: {
            ...user._doc,
            password: undefined,
        }})

    } catch (error) {
        console.error("error in verify email", error)

        res.status(400).json({error: error.message})
        
    }
}


export const login = async  (req, res)=>{
    const {email, password} = req.body;
    try {
       const user = await User.findOne({email}) ;
       if(!user){
        return res.status(400).json({error: "Invalid credential"});
       }
       const isPassword = await bcrypt.compare(password, user.password);
       if(!isPassword){
        return res.status(400).json({error: "invalid credentials"})
       }

       generateTokenAndCookie(res, user._id);

       user.lastLogin = new Date();
       await user.save();

       res.status(200).json({
        message: "logged in successfully",
        user: {
            ...user._doc,
            password: undefined
        }
       })
    } catch (error) {
        console.log("error in login function", error);
        res.status(400).json({error: error.message})
        
        
    }
}


export const logout = async  (req, res)=>{
    res.clearCookie("token")
    res.status(200).json({message: "loggout successfully"});
}



export const forgotPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({error: "user not found"});
        }

        // generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpireAt = resetTokenExpiresAt;

        await user.save();

        // send email
        await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/${resetToken}`);

        res.status(200).json({message: "Password reset link sent to your email"});
    } catch (error) {
        console.log("Error in forgotPassword", error);

        res.status(400).json({error: error.message});
        
        
    }
}


export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpireAt: {$gt: Date.now()},
        })

        if(!user){
            return res.status(400).json({error: "Invalid or expired reset token"});
        }

        // update password
        const hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpireAt = undefined;

        await user.save();
        await sendResetSuccessEmail(user.email);

        res.status(200).json({message: "Password reset successful"});
    } catch (error) {
        console.log("Error in resetPassword", error);

        res.status(400).json({error: error.message})
        
        
    }
}


export const checkAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if(!user) {
            return res.status(400).json({error: "user not found"});
        }
        res.status(200).json({user});
    } catch (error) {
       console.log("error in checkAuth", error);

       res.status(400).json({error: error.message})
        
    }
}