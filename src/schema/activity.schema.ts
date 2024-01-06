import mongoose from "mongoose";

export const ActivitySchema = new mongoose.Schema({
    activityId : {
        type : String,
        unique : true,
        required : true
    },
    tag : {
        type : String
    },
    slideImg : [{
        type : String,
        required : true
    }],
    title : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true 

    },
    duration : {
        type : Number
    },
    numberOfReviews : {
        default : 0 ,
        type : Number
    },
    rating : {
        type :  Number,
        default : 0
    },
    price : {
        type : Number,
        required : true
    },
    delayAnimation : {
        type : Number ,
        default : 0
    }
})