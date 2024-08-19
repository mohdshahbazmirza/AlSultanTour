import * as joi from 'joi';

// Define the schema for pricing
const pricingSchema = joi.object({
  adultPrice: joi.number().required(),
  childPrice: joi.number().required(),
  infantPrice: joi.number().required()
});

// Define the schema for the Tour
const tourSchema = joi.object({
  tourName: joi.string().required(),
  withoutTransfer: pricingSchema.required(),
  sharedTransfer: pricingSchema.required(),
  privateTransfer: pricingSchema.required()
});

export const activityFormat = joi.object({
    tag : joi.string().required(),
    slideImg : joi.array().required(),
    title : joi.string().required(),
    location : joi.string().required(),
    duration : joi.number().required(),
    numberOfReviews : joi.number().required(),
    rating : joi.number().required(),
    price : joi.array().items(tourSchema).required(),
    delayAnimation : joi.number().required()
}).required()