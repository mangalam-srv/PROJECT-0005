import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js"
import { uploadoncloudinary } from "../utils/cloudinary.js";
import { log } from "console";

const registeruser = asyncHandler(async (req, res) => {

    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);


    //get user details from forntend 
    const { username, fullname, email, password } = req.body;
    console.log("username",username);
    
    console.log("email",email);
    console.log("fullname ",fullname);


    //no empty
    if ([fullname, username, email, password].some(field => !field?.trim())) {
        throw new ApiError(400, "All fields are required");
    }
    if (!email.includes("@")) {
        throw new ApiError(400, "invalid email format");
    }




    //check if user already exist :username and email
    //findone returns the first matched value
    const existeduser = await User.findOne({
        $or: [{username}, {email}]//this allows us to check as many as values you want 
    })
    console.log("found", existeduser);
    

    if (existeduser) {
        throw new ApiError(409, "user already exist");
    }

    
    



    //check for images avatar 
    const avatarlocalpath = req.files?.avatar[0]?.path;
    
    
    
    const coverImagelocalpath = req.files?.coverImage[0]?.path;
    //this should be 
    if (!avatarlocalpath) {
        throw new ApiError(400, "avatar image is required");
    }

    //upload thhem to cloudinary,avatar
    const avatar = await uploadoncloudinary(avatarlocalpath);
    const coverImage = await uploadoncloudinary(coverImagelocalpath);
    if (!avatar) {
        throw new ApiError(400, "avatar image is required");
    }


    //create user object
    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase(),
    })


    // remove pass and refreshtoken field
    const createduser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //chwck for user creation 
    if (!createduser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }


    //return res
    return res.status(201).json(
        new ApiResponse(200, createduser, "user registered successfully")
    )



})


export { registeruser }; 