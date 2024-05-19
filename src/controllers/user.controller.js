
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshToken = async(userId) =>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken;
        const refreshToken = user.generateRefreshToken;

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken,refreshToken}
        
    } catch (error) {
        throw new ApiError(500,"Something went wrong!")
    }

}


const registerUser = asyncHandler(async (req, res) => {

    //     // *************steps for create user*******
//     // get user data from frontend 
//     // validate user data - all field
//     // check user already exist or not - userName , email
//     // check images and avater properly
//     // upload them to cloudinary and accept  url from them
//     // create user object  - create entry in db
//     // remove password and refresh token for frontend bcoz it is encrypted
//     // check for user creation
//     // return response properly


    // Extract user data from request body

    const { fullName, userName, email, password } = req.body;

    // Validate required fields
    if ([fullName, userName, email, password].some((field) => !field?.trim())) {
        throw new ApiError(400, "All fields are required!");
    }

    // Check if user already exists
    const existUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existUser) {
        throw new ApiError(409, "userName and email already exist!");
    }

    // Check if avatar and cover image files are provided
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    // console.log("avatar local path:",avatarLocalPath)

    // let coverImageLocalPath;
    // if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
    //     coverImageLocalPath = req.files.coverImage[0].path
    // }
    

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required!");
    }

    if (!coverImageLocalPath) {
        throw new ApiError(400, "Cover image file is required!");
    }

    // Upload avatar and cover image to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    console.log("avatar",avatar)
    if (!avatar) {
        throw new ApiError(400, "Failed to upload avatar");
    }

    if (!coverImage) {
        throw new ApiError(400, "Failed to upload cover image");
    }

    // Create user object with uploaded image URLs
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage.url || "",
        email,
        password,
        userName: userName.toLowerCase(),
    });

    // Find created user and exclude sensitive fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    // Check if user was created successfully
    if (!createdUser) {
        throw new ApiError(500, "Failed to register user!");
    }

    // Return success response
    return res.status(201).json(new ApiResponse(200, createdUser, "User created successfully."));
});

const loginUser = asyncHandler(async (req,res) =>{
    // ***********steps define*********
    // req.body => data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // send cookie

    const {email,password,userName} = req.body;
    if(!userName || !email){
        throw new ApiError(400,"userName or email required!")
    }
    // find user from mongodb
    const user = await User.findOne({
        $or: [
            {userName},
            {email}
        ]
    })

    if(!user){
        throw new ApiError(404,"user does not found!")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid){
        throw new ApiError(401,"invalid user credentials (password incorrect!)")
    }

    // generate access and refresh token
    const {accessToken,refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).
    cookie("accessToken",accessToken,options).
    cookie("refreshToken",refreshToken,options).
    json(
        new ApiResponse(
            200,
            {
                user: loggedInUser , accessToken,refreshToken
            },
            "user logged in succcessfully"
        )
    )

})

export { 
    registerUser,
    loginUser
 };
