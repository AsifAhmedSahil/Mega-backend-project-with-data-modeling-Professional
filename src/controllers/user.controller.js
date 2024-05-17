import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req,res) =>{
    // *************steps for create user*******
    // get user data from frontend 
    // validate user data - all field
    // check user already exist or not - userName , email
    // check images and avater properly
    // upload them to cloudinary and accept  url from them
    // create user object  - create entry in db
    // remove password and refresh token for frontend bcoz it is encrypted
    // check for user creation
    // return response properly

    const {fullName,username,email,pasword} = req.body
    if(
        [fullName,username,email,pasword].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400,"all field are required!")
    }

    // check user exist or not***********

    const existUser = User.findOne({
        $or: [{ username },{ email }]
    })

    if(existUser){
        throw new ApiError(409,"username and email already exist!")
    }

})

export {
    registerUser
} 