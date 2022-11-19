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
const catImageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/category_img', 
      filename: (req, file, cb) => {
          cb(null, 'cat-img-' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const catImageUpload = multer({
    storage: catImageStorage,
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

const brandImageStorage = multer.diskStorage({
    // Destination to store image     
    destination: 'public/brand_img', 
      filename: (req, file, cb) => {
          cb(null, 'brand-logo-' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const brandImageUpload = multer({
    storage: brandImageStorage,
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

const uploadMultiple =imageUpload.array('images',4);
const uploadOne = catImageUpload.single('image');
const uploadBrandImg = brandImageUpload.single('image');


export { uploadMultiple,
        uploadOne,
        uploadBrandImg };