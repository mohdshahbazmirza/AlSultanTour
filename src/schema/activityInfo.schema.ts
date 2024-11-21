import mongoose from "mongoose";

export const ActivityInfo = new mongoose.Schema({
    activityId : {
        type : String,
        unique : true,
        required : true
    },
    overview : [{
        type : String,
        trim : true
    }],
    cancellation_policy : [{
        type : String,
        trim : true
    }],
    highlights  : [{
        type : String,
        trim : true
    }],
    whats_included : [{
        type : String,
        trim : true
    }],
    whats_not_included : [{
        type : String,
        trim : true
    }],
    important_information : [{
        type : String,
        trim : true
    }],
    additional_information :[{
        type : String,
        trim : true,
        default : " for any additional info cantact us on our page "
    }]
})