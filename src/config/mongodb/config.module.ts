import { ConfigModule, ConfigService } from '@nestjs/config';
import * as joi from 'joi'
import { MongoDBConfigService } from './config.service';
import configuration from './configuration';
import { Module} from '@nestjs/common'

@Module({
    imports : [
        ConfigModule.forRoot({
            load : [configuration],
            validationSchema : joi.object({
                url : joi.string().default('mongodb://127.0.0.1:27017/alsultantours'),
                max_pool_size : joi.number().default(200),
                port : joi.number().default(27017)
            }).unknown().required(),
        }),
    ],
    providers : [ConfigService , MongoDBConfigService] ,
    exports : [ConfigService , MongoDBConfigService]

})

export class MongoDBConfigModule {}