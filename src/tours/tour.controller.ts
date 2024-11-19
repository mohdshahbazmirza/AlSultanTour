import { Controller, Get, Post, Req, Res, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { Request, Response } from 'express';
import { TourService } from "./tour.service";
import { activityFormat } from "src/request/activity.schema";
import { FilesInterceptor } from "@nestjs/platform-express";
import * as multer from 'multer';


@Controller('tours')
export class TourController {
    constructor(private readonly tourService : TourService){}

    // @Post('activity')
    // public async tourAcitivity(@Req() req : Request , @Res() res : Response){
    //     try{            
    //         await activityFormat.validateAsync(req.body);
    //         return this.tourService.tourAcitivity(req ,res);
    //     } catch(e){
    //         return res.status(400).send({error: e.message});
    //     }
    // }

    @Post('activity')
    @UseInterceptors(FilesInterceptor('images', 10, multer().any() as any)) // Handle multiple files
    public async tourAcitivity(
        @UploadedFiles() files: Express.Multer.File[], // Extract files
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
        req.files = files; // Attach files to the request object
        console.log(files,"files");
        
        return await this.tourService.tourAcitivity(req, res);
        } catch (e) {
            console.log(e,"eeeeeeeeeeeeeeeeeeeeeeeee");
            
        return res.status(400).send({ error: e.message });
        }
    }
    
    @Get('get-all-activity')
    public async getAllTourAcitivity(@Req() req : Request , @Res() res : Response){
        try{
            return this.tourService.getAllTourAcitivity(req ,res);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }

    @Get('get-activity/:id')
    public async getTourAcitivity(@Req() req : Request , @Res() res : Response){
        try{
            return this.tourService.getTourAcitivity(req ,res);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }

    @Post('activity-info')
    public async tourAcitivityInfo(@Req() req : Request , @Res() res : Response){
        try{
            // await activityFormat.validateAsync(req.body);
            return this.tourService.tourAcitivityInfo(req ,res);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }

    @Get('get-activity-info/:id')
    public async getTourAcitivityInfo(@Req() req : Request , @Res() res : Response){
        try{
            // await activityFormat.validateAsync(req.body);
            return this.tourService.getTourAcitivityInfo(req ,res);
        } catch(e){
            return res.status(400).send({error: e.message});
        }
    }

    @Get('get-review')
    public async getReview(@Req() req : Request , @Res() res : Response){
        try{
            return this.tourService.getReview(req,res);
        }catch(e){
            return res.status(400).send({error: e.message});
        }
    }
    
    @Post('get-review')
    public async activityReview(@Req() req : Request , @Res() res : Response){
        try{
            return this.tourService.activityReview(req,res);
        }catch(e){
            return res.status(400).send({error: e.message});
        }
    }
}