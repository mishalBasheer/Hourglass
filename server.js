import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
const DBL = process.env.DATABASE_LOCAL;

mongoose
  .connect(DBL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    // console.log(con.connections);
    console.log('DB connection success');
  });

// const connectDB =async()=>{

// try{
//  await mongoose.connect(DB,{
//     useUnifiedTopology: true,
//     useNewUrlParser:true
//   });
// }catch(Errors){ console.log(Errors)}
// }

// try {
//   await mongoose.connect(DB,{
//         useUnifiedTopology: true,
//         useNewUrlParser:true
//       }).then(()=>{
//         console.log("connected to MongoDB");
//       }).catch((e)=>{
//         console.log(e);
//       })
// } catch (error) {
//   handleError(error);
//   }
// }

// connectDB()

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product must have a title'],
    unique: [true, 'A product must have a unique title'],
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true,'A product must have a price'],
  },
  // category: {
  //   type: String,
  //   required: [true, 'A product must have a category'],
  // },
  // brand: {
  //   type: String
  // }
});
const Product = mongoose.model('Product',productSchema);

const testProduct = new Product({
  title:'Zebra Blinds'
});

testProduct.save().then((doc) => {
  console.log(doc);
}).catch((err) => {
  console.log('Error 💥:',err);
});

const PORT = process.env.PORT || 3000;

// mongoose.connection.once('open', ()=>{
//   console.log("connected to MongoDB");
app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is successfully Running, and App is listening to port ${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
// })
