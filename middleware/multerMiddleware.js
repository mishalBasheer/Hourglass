import multer from "multer";
import path from "path";



const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/product_img', 
      filename: (req, file, cb) => {
          cb(null, 'img-' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
//     limits: {
//       fileSize: 1000000 // 1000000 Bytes = 1 MB
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|jpg)$/)) { 
//          // upload only png and jpg format
//          return cb(new Error('Please upload a Image'))
//        }
//      cb(undefined, true)
//   }
}) ;



export { imageUpload };