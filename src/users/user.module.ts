import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongoDBConfigModule } from "src/config/mongodb/config.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/schema";
import { MongoDBConfigService } from "src/config/mongodb/config.service";
@Module({
    imports : [
        HttpModule.register({
            timeout: 6000
        }),
        MongoDBConfigModule,
        MongooseModule.forFeature([
            { name : "users" , schema : UserSchema}
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
    controllers : [UserController],
    providers : [UserService],
})

export class userModule {}