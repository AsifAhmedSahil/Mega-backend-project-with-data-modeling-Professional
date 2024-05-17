import mongoose,{Schema} from "mongoose";

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

export const User = mongoose.model("User",userSchema)