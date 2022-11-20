import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    //   required: [true, 'A address must have a reciever name'],
  },
  mob: {
    type: Number,
    //   required: [true, 'A address must have a reciever name'],
  },
  house: {
    type: String,
    //   required: [true, 'A address must have a reciever name'],
  },
  landmark: {
    type: String,
    //   required: [true, 'A address must have a reciever name'],
  },
  city:{
    type:String,
  },
  district: {
    type: String,
    //   required: [true, 'A address must have a reciever name'],
  },
  state: {
    type: String,
    //   required: [true, 'A address must have a reciever name'],
  },
  pincode: {
    type: Number,
    //   required: [true, 'A address must have a reciever name'],
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
});
const Address = mongoose.model('Address', addressSchema);

export default Address;
