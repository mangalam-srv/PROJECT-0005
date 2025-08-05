import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";



const app=express();


//Middelwares 
app.use(cors({ origin : process.env.CORS_ORIGIN,credentials:true,}));//this is used to accpet the req from cross platform
app.use(express.json({limit:"16kb"}))//this is used to accept the json format data
app.use(express.urlencoded({extended:true,limit:"16kb"}));//this is used to accept the url data 
app.use(express.static("public"));
app.use(cookieParser());



export{app};