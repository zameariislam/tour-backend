import { createClient } from 'redis';
import { enVars } from './env';

  export const redisClient = createClient({
    username: enVars.REDIS_USERNAME,
    password: enVars.REDIS_PASSWORD,
    socket: {
        host: enVars.REDIS_HOST,
        port: Number(enVars.REDIS_PORT)
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));



// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar


 export  const connectRedis= async()=>{
    if(!redisClient.isOpen){
        await redisClient.connect();
         console.log('Redis connected')

    }
 }