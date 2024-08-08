const loginUser = asyncHandler(async (req,res) =>{
    // ***********steps define*********
    // req.body => data
    // username or email
    // find the user
    // password check
    // access and refresh token
    // send cookie

    const {email,password,userName} = req.body;
    // if (!userName && !email) {
    if (!(userName || email)) {
        throw new ApiError(400, "username or email is required")
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
    console.log("check accesstoken and refreshtoken submit",accessToken,refreshToken)

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

// const loggedOutUser = asyncHandler(async(req,res) => {
//     console.log(req.user)
//     await User.findByIdAndUpdate(
        
//         req.user._id,
//         {
//             $set:{ refreshToken : undefined }
//         },
//         {
//             new: true
//         }
//     )
//     const options = {
//         httpOnly: true,
//         secure: true
//     }

//     return res.status(200)
//     .clearCookie("accessToken",options)
//     .clearCookie("refreshToken",options)
//     .json(new ApiResponse(200,{},"User logged out successfully"))
// })


