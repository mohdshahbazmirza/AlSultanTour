import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the nested schema for pricing
const pricingSchema = new Schema({
  adult: {
    type: Number,
    required: true
  },
  child: {
    type: Number,
    required: true
  },
  infant: {
    type: Number,
    required: true
  }
});

// Define the schema for the Tour
const tourSchema = new Schema({
  tourName: {
    type: String,
    required: true,
    trim: true
  },
  withoutTransfer: {
    type: pricingSchema,
    required: true
  },
  sharedTransfer: {
    type: pricingSchema,
    required: true
  },
  privateTransfer: {
    type: pricingSchema,
    required: true
  }
})

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
    price : [tourSchema],
    delayAnimation : {
        type : Number ,
        default : 0
    }
})

