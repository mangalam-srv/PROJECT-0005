import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError}from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import{uploadoncloudinary} from "../utils/cloudinary.js";

const registeruser = asyncHandler(async(req,res)=>{


    //get user details from forntend 
    const {username,fullname,email,password}=req.body;
  console.log("email",email);


  
    //no empty
    // if(fullname===""){
    //     throw new ApiError(400,"fullname is required");
    // }

    if(
        [fullname,username,email,password].some(()=>{
            field?.trim()===""
        })
    ){
        throw new ApiError(400,"all fields are required")

    }

    if(!email.includes("@")){
        throw new ApiError(400,"invalid email format");
    }




    //check if user already exist :username and email

    const existeduser = User.findOne({
        $or:[{username},{email}]
    })
    if(existeduser){
        throw new ApiError(409,"user already exist");
    }



    //check for images avatar 

    const avatarlocalpath = req.files?.avatar[0]?.path;
    const coverImagelocalpath = req.files?.coverImage[0]?.path;

    if(!avatarlocalpath){
        throw new ApiError(400,"avatar image is required");
    }
    //upload thhem to cloudinary,avatar
    //create user object
    // remove pass and refreshtoken field
    //chwck for user creation 
    //return res



})


export {registeruser}; 