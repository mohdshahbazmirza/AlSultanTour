import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { MongoDBConfigModule } from "src/config/mongodb/config.module";
import { MongooseModule } from "@nestjs/mongoose";
import { MongoDBConfigService } from "src/config/mongodb/config.service";
import { ActivitySchema } from "src/schema/activity.schema";
import { TourService } from "./tour.service";
import { TourController } from "./tour.controller";
import { ActivityInfo } from "src/schema/activityInfo.schema";
import { ReviewSchema } from "src/schema/review.schema";
@Module({
    imports : [
        HttpModule.register({
            timeout: 6000
        }),
        MongoDBConfigModule,
        MongooseModule.forFeature([
            { name : "activity" , schema : ActivitySchema},
            { name : "activity-info" , schema : ActivityInfo},
            {name : 'review' , schema : ReviewSchema}
        ]),
        MongooseModule.forRootAsync({
            imports: [MongoDBConfigModule],
            useFactory: async (mongoDBConfigService: MongoDBConfigService) => ({
                uri: mongoDBConfigService.url,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                maxPoolSize: mongoDBConfigService.max_pool_size
              }),
            inject : [MongoDBConfigService],
        }),
    ],
    controllers : [TourController],
    providers : [TourService],
})

export class tourModule {}