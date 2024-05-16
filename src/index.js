import mongoose from "mongoose";
import {DB_NAME} from "./constants"

import express from "express"
const app = express()


// this is an approach 
(async()=>{
    try {
       await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       app.on("error",() =>{
        console.log("Error:",error)
        throw error
       })

       app.listen(process.env.PORT,()=>{
            console.log(`application is running on port: ${process.env.PORT}`)
       })
    } catch (error) {
        console.log(error)
        throw error
        
    }
})()