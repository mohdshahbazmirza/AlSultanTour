import { registerAs } from '@nestjs/config'

export default registerAs('mongodb' , ()=> ({ 
    port : process.env.MONGODB_PORT || 27017 ,
    max_pool_size : process.env.MONGO_MAX_POOL_SIZE || 200 ,
    url : process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/Alsultantours'

}))