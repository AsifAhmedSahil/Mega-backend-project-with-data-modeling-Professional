import express from "express"
import cors from 'cors'
import cookieParser from "cookie-parser";

const app = express()

// middlewares
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true, limit:"16kb"}))
// for external file lige fav icon or image 
app.use(express.static("public"))
app.use(cookieParser())


// import router 
import userRouter from "./routes/user.routes.js"

// router declaration with api link

app.use("/api/v1/users",userRouter)



export default app;