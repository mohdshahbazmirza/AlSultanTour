import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    emailVerified : {
        type : Boolean,
        default : false,
        required : true
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
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 200
    },
    tokens: [{
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

UserSchema.methods.generateAuthToken = async function(){
    const user = this
    const accessToken = jwt.sign({_id: user._id.toString()},'fdsjkhkshgkshgdkjh',{
        expiresIn: '1d'
    })
    const refreshToken = jwt.sign({_id: user._id.toString()},'fdsjkhkshgkshgdkjh',{
        expiresIn: '2d'
    })
    const expiresAt = new Date(new Date().getTime()+24*60*60*1000);
    user.tokens =  user.tokens.concat({accessToken, refreshToken, expiresAt})
    await user.save()
    return {accessToken, refreshToken, expiresAt}
}

UserSchema.methods.getPublicProfile = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    
    return userObject
}

UserSchema.pre('save', async function(next) {
    const user = this;
    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next()
})

