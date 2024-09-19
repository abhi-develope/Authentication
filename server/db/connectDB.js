import mongoose from "mongoose";

export const connectDB = async ()=> {
    try {
       const conn = await mongoose.connect(process.env.DB_URI) 
       console.log("mongodb connected");
    
    
       
    } catch (error) {
        console.log("error in mongodb connection:", error.message);
        process.exit(1)  // 1 is failure, 0 status code i success
        
    }
}