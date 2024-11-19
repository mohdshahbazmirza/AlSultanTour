import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { number } from 'joi';

export const BookingSchema = new mongoose.Schema({
    booking_id : {
      type : String,
      required : true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate(val: string) {
            if(!validator.isEmail(val)) {
                throw new Error('Please Enter a Valid E-mail Address!')
            }
        },
        lowercase: true
    },
    totalAmount : {
      type : number,
      required : true
    },
    bookingItems: [{
        accessToken:{
            type:String,
            required: true
        },
        refreshToken: {
            type:String,
            required: true
        },
        expiresAt:{
            type: String,
            required: true
        }
    }]
})

  