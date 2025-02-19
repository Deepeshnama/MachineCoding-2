import mongoose from "mongoose";

const dbConnection = async () => {
    
    try {
        mongoose.connect("mongodb://127.0.0.1:27017/evaluation");
        console.log("Database connected")
    } catch (error) {
        console.log(error.message)
    }


}

export default dbConnection