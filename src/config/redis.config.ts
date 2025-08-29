import { createClient } from 'redis';
import { enVars } from './env';

const client = createClient({
    username: enVars.REDIS_USERNAME,
    password: enVars.REDIS_PASSWORD,
    socket: {
        host: enVars.REDIS_HOST,
        port: Number(enVars.REDIS_PORT)
    }
});

client.on('error', err => console.log('Redis Client Error', err));



// await client.set('foo', 'bar');
// const result = await client.get('foo');
// console.log(result)  // >>> bar


 export  const connectRedis= async()=>{
    if(!client.isOpen){
        await client.connect();
         console.log('Redis connected')

    }
 }