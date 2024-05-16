import dotenv from 'dotenv';
import path from 'path';

import connectDB from "./db/index.js"

// dotenv.config({
//     path: "./env"
// })
dotenv.config({ path: path.join((process.cwd(), '.env')) });
// dotenv.config()
// setup database professionally

connectDB()










// this is an approach  - 1st
/*
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

*/