import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })
  
// Create Multer instance with the configured storage
const upload = multer({ storage });

// Export the Multer instance for use in other modules
export { upload };




// import multer from "multer";
// import { fileURLToPath } from "url";
// import { dirname, join } from "path";
// import fs from "fs";

// // Get the filename and dirname using fileURLToPath and dirname functions
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Resolve the destination directory path relative to the current module's location
// const destinationPath = join(__dirname, "../../public/temp");

// // Check if the destination directory exists, create it if it doesn't
// if (!fs.existsSync(destinationPath)) {
//     fs.mkdirSync(destinationPath, { recursive: true });
// }

// // Configure Multer storage to save files to the destination directory
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, destinationPath);
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });

// // Create Multer instance with the configured storage
// const upload = multer({ storage });

// // Export the Multer instance for use in other modules
// export { upload };
