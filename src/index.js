import dotenv from 'dotenv';
import path from 'path';

import connectDB from "./db/index.js"
import app from './app.js';


dotenv.config({ path: path.join((process.cwd(), '.env')) });

// setup database professionally

connectDB()
.then(()=>{
    app.listen(process.env.PORT | 5000, () =>{
        console.log(`server is running on port: ${process.env.PORT}`)
    });
})
.catch((err)=>{
    console.log("mongodb connection failed from src/index.js",err);
})










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