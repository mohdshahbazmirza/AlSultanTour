import * as joi from 'joi';

export const activityFormat = joi.object({
    tag : joi.string().required(),
    slideImg : joi.array().required(),
    title : joi.string().required(),
    location : joi.string().required(),
    duration : joi.number().required(),
    numberOfReviews : joi.number().required(),
    rating : joi.number().required(),
    price : joi.number().required(),
    delayAnimation : joi.number().required()
}).required()