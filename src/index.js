

import express from "express"
const app = express()


// setup database professionally


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