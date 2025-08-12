import express from "express";
const app=express();
import cookieParser from "cookie-parser";
import cors from "cors";






//Middelwares 
app.use(cors({ origin : process.env.CORS_ORIGIN,credentials:true,}));//this is used to accpet the req from cross platform
app.use(express.json({limit:"16kb"}))//this is used to accept the json format data
app.use(express.urlencoded({extended:true,limit:"16kb"}));//this is used to accept the url data 
app.use(express.static("public"));//If someone requests a file that matches something inside the public folder, serve it directly — without going through routes.
app.use(cookieParser());



//import routes
import userRouter from "./routes/user.routes.js"


//router decleration
app.use("/api/v1/users",userRouter)



export{app};