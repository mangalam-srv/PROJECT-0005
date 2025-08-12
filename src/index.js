// require ('dotenv').config({path:'./env'})
import dotenv from "dotenv"
import { app } from "./app.js"; 


// import mongoose from "mongoose";
// import{DB_NAME} from "../src/constants";


import connectDB from "./db/index.js";
import express from "express";



dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000 ,()=>{
        console.log(`server is running at port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("Mongo DB connection Failed",err);
    
})




// ;(async()=>{
//     try {
//        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("err",err);
//         throw error;

//        })

//        app.listen(process.env.PORT,()=>{
//         console.log(`app is listening on port${process.env.PORT}`)
//        })
        
//     } catch (error) {
//         console.error("ERROR", error);
//         throw error;
        
//     }
// })()