import mongoose, { Schema } from "mongoose";
//we do index true for those elements which will be searched the most in the database to make them searchable 
const userSchema= new mongoose.Schema({
    username:{
        type:String, 
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true,//we do index true so that we can get the username which will be searched most will be easily
    },email:{
        type:String, 
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },fullname:{
        type:String, 
        required:true,
        trim:true,
        index:true,//we do index true so that we can get the username which will be searched most will be easily
    },avatar:{
        type:String, //cloudinary url
        required:true,
    },coverimage:{
        type:String, //cloudinary url
        
    },watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],password:{
        type:String,
        required:[true,"password is req"],
    },refreshtoken:{
        type:String,    
    }

},{timestamps:true})




//this is used to hash the password just before saving so .pre method is used 
userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password= bcrypt.hash(this.password,10); 
    next();

})


//this is used to match the password whether the hashed and the original password is correct 
userSchema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password) 
}


userSchema.methods.generateAccessToken=function(){
    //jwt.sign(payload,secretkey,options(expires))

    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
 )
};

//This holds less information 
//jwt.sign(payload,secretkey,options(expires))


userSchema.methods.generateRefreshToken=function(){
     return jwt.sign(
        {
        _id:this._id,
        },
         process.env.REFRESH_TOKEN_SECRET,
        {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
 )
};

export const User= mongoose.model("User",userSchema);