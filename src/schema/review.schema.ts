import mongoose from "mongoose";

export const ReviewSchema = new mongoose.Schema({
    activityId : {
        type : String,
        unique : true,
        required : true
    },
    username : {
        type : String,
        required : true,
    },
    rating: {
        type: Number,
        required: true,
    },
    review: {
        type: String,
        required: true,
    },
    reviewImage : [{
        type :  Buffer
    }], 
    createdAt: {
        type: Date,
        default: Date.now,
    }
})