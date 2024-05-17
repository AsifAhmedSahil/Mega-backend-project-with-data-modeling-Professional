import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
        // here index is used for database searching
    },
    email:{
        type: String,
        required: true,
        lowercase:true,
        unique:true,
        trim:true,

    },
    fullName:{
        type: String,
        required: true,
        trim:true,
        index:true
        // here index is used for database searching
    },
    avatar:{
        type:String,
        required:true
    },
    coverImg:{
        type:String,
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password:{
        type:String,
        required: [true,"Password is required"]
    },
    refreshToken:{
        type:String
    }
},
{
    timestamps:true
})

// for encrypt password
userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next()

    this.password = bcrypt.hash(this.password,10)
    next()
})

// check password is correct or not

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

export const User = mongoose.model("User",userSchema)