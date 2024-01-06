import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { user } from "src/interface";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';


@Injectable()
export class UserService {
    constructor(@InjectModel('users') private readonly userService: Model<user>,
    ){}
    
    public async registerUser(req : Request , res : Response) {
        const givenUserDetails: any = req.body;
        await new this.userService(givenUserDetails).save()
        // return res.status(200).send({"ok":true})
        return res.send({"ok":true})
    }

    public async userLogin( req:Request, res:Response){
        const user : any = await this.userService.findOne({emailId: req.body.emailId})
        if(!user){
          throw new Error('Invalid Credentials!');
        }
        if(!user.emailVerified) {
            throw new Error('Please verify your email');
        }
        const isMatch = await bcrypt.compare(atob(req.body.password),user.password)
        if(!isMatch){
            throw new Error('Invalid Credentials1!');
        }
    
        const {accessToken, refreshToken, expiresAt} = await user.generateAuthToken()
        return res.status(200).send({
          reseller: user.getPublicProfile(),
          accessToken,
          refreshToken,
          expiresAt
        });
      }
}