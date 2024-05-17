import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

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

    const {fullName,username,email,password} = req.body
    if(
        [fullName,username,email,password].some((field) => field?.trim() === "")
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

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar file is required!")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar is required")
    }

    // create user object 
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage:coverImage?.url | "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"something went wrong while rgistering the user!")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User created successfully.")
    )


})

export {
    registerUser
} 