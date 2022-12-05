import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
    code:{
        type:String,
        require:true,
        unique:true
    },
    isPercent:{
        type:Boolean,
        default:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    createdDate:{
        type:Date,
        default:new Date.now(),
    },
    expireDate:{
        type:Date,
    },
    maxCount:{
        type:Number,
    },
    

});

const Coupon = mongoose.model('Coupon', couponSchema);

export default Coupon;
