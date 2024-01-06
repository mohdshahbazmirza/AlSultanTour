import { Controller, Post, Req, Res } from "@nestjs/common";
import { UserService } from "./user.service";
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
    constructor(private readonly userService : UserService){}

    @Post('register')
    public async registerUser(@Req() req : Request , @Res() res : Response){
        try{
            return this.userService.registerUser(req ,res);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }
    
    @Post('login')
    public async userLogin(@Req() req: Request, @Res() res: Response){
        try{
        await this.userService.userLogin(req, res);
        } catch(e) {
        return res.status(e.status ? e.status : 400).send({ error: e.message });
        }
    }
}