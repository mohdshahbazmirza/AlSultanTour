import mongoose from "mongoose";

export const ActivityInfo = new mongoose.Schema({
    activityId : {
        type : String,
        unique : true,
        required : true
    },
    overview : [{
        type : String,
        required : true,
        trim : true
    }],
    cancellation_policy : [{
        type : String,
        required : true,
        trim : true
    }],
    highlights  : [{
        type : String,
        required : true,
        trim : true
    }],
    whats_included : [{
        type : String,
        required : true,
        trim : true
    }],
    whats_not_included : [{
        type : String,
        required : true,
        trim : true
    }],
    important_information : [{
        type : String,
        required : true,
        trim : true
    }],
    additional_information :[{
        type : String,
        required : true,
        trim : true,
        default : " for any additional info cantact us on our page "
    }]
})