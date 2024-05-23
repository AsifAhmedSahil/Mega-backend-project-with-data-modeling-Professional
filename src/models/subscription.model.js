import mongoose, { Schema } from "mongoose";


const subscriptionModel = new Schema({
    subscriber:{
        type: Schema.Types.ObjectId,
        ref: User
    },
    channel:{
        type: Schema.Types.ObjectId,
        ref: User
    },l
},{timestamps:true})

export const Subscription = mongoose.model("Subscription",subscriptionModel)