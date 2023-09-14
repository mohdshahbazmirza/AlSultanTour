import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class MongoDBConfigService {
    constructor(private readonly configService : ConfigService){}

    get port() : number {
        return Number(this.configService.get<number>('mongodb.port'));
    }

    get max_pool_size() : number {
        return Number(this.configService.get<number>('mongodb.max_pool_size'));
    }

    get url() : string {
        return this.configService.get('mongodb.url');
    }

    set port(port : number) {
        const mongodbConfig = this.configService.get('mongodb');
        mongodbConfig.port = port;
    }

    set max_pool_size(max_pool_size : number) {
        const mongodbConfig = this.configService.get('mongodb');
        mongodbConfig.max_pool_size = max_pool_size;
    }

    set url(url : number) {
        const mongodbConfig = this.configService.get('mongodb');
        mongodbConfig.url = url;
    }
}