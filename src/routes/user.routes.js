// import { Router } from "express";
// import { registerUser } from "../controllers/user.controller.js";

// import { upload } from "../middlewares/multer.middleware.js";

// const router = Router()

// router.route("/register").post(
//     upload.fields(
//         {
//             name:"avatar",
//             maxCount: 1
//         },
//         {
//             name:"coverImage",
//             maxCount: 1
//         }
//     ),
//     registerUser
// )

// export default router;

import { Router } from "express";
// import {  loginUser, loggedOutUser, registerUser } from "../controllers/user.controller.js";
import {    registerUser,loginUser,loggedOutUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; // Importing 'upload' using named import
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post(
  "/register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser)

// secured route
router.route("/logout").post(verifyJWT , loggedOutUser)
router.route("/logout").post()

export default router;
