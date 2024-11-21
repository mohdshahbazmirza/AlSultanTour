import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Request, Response } from 'express';
import { activity } from "src/interface/activity.model";
import { activityInfo } from "src/interface";
import { uuid } from "uuidv4";
import { review } from "src/interface/review.model";
import { S3Service } from "src/service modules/s3/s3.service";


@Injectable()
export class TourService {
    constructor(
        @InjectModel('activity') private readonly tourService: Model<activity>,
        @InjectModel('activity-info') private readonly activityInfoService: Model<activityInfo>,
        @InjectModel('review') private readonly reviewService: Model<review>,
        private readonly s3Service: S3Service // Inject S3 Service

    ){}
    
    public async tourAcitivity(req : Request , res : Response) {
        const givenAcitivityDetails: any = req.body;
        const activityId : string = uuid().split('-').join("");
        const activity = await this.tourService.findOne({activityId})
        if(activity){
            throw new Error("Activity already exists");
        } 
        if (req.files && Array.isArray(req.files)) {
            const images = await this.s3Service.uploadFiles(req.files as Express.Multer.File[]);
            givenAcitivityDetails.images = images; // Save image URLs to activity details
        }
        givenAcitivityDetails.basePrice=JSON.parse(givenAcitivityDetails.basePrice); 
        givenAcitivityDetails.packagetype=JSON.parse(givenAcitivityDetails.packagetype); 
        givenAcitivityDetails.activityId = activityId;
        await new this.tourService(givenAcitivityDetails).save();
        return res.status(200).send({"ok":true})
    }
 
    public async getAllTourAcitivity(req: Request , res : Response){
        const allActivity = await this.tourService.find({});
        // console.log(allActivity,'bbb');
        return res.status(200).send(allActivity);
    }

    public async getTourAcitivity(req : Request , res : Response){
        const activity = await this.tourService.findOne({ activityId : req.params.id});
        console.log(activity,'bbb');
        return res.status(200).send(activity);
    }

    public async tourAcitivityInfo(req : Request , res : Response){
        const givenAcitivityInfo: any = req.body;
        console.log(req.body,"oooooooooooooooooo");
        
        const activity = await this.activityInfoService.findOne({ activityId : givenAcitivityInfo.activityId})
        if(activity){
            throw new Error("Activity Info already exists");
        }
        await new this.activityInfoService(givenAcitivityInfo).save();
        return res.status(200).send({"ok":true})
    }

    public async getTourAcitivityInfo(req: Request , res : Response){
        const getActivityInfo = await this.activityInfoService.findOne({ activityId : req.params.id});
        console.log(getActivityInfo,'aaaaa');
        return res.status(200).send(getActivityInfo);
    }

    public async getReview(req : Request , res : Response){
          const getReview = await this.reviewService.find({});
          return res.status(200).send(getReview)
    }

    public async activityReview(req : Request , res : Response){
        const review: any = req.body;
        const activity = await this.activityInfoService.findOne({ activityId : review.activityId})
        if(activity){
            throw new Error("Activity Info already exists");
        }
        await new this.reviewService(review).save();
        return res.status(200).send({"ok":true})
  }
}

// 2.50.32.237