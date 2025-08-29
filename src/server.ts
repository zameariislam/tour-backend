
 import mongoose from 'mongoose';
import{ Server} from 'http';

import { enVars } from './config/env';
import { app } from './app';
import { seedSuperAdmin } from './utils/seedSuperAdmin';
import { connectRedis } from './config/redis.config';





let server:Server

 const startServer= async ()=>{

    try{
          await  mongoose.connect(enVars.DB_URL)

      console.log(' connetced to DB !!!' )

    server= app.listen(enVars.PORT,()=>{

         console.log(`Server is running on http://localhost:${enVars.PORT}`);

      })
      
      
    } catch(error:any){

        console.log('error',error.message)

    }
   

 }



(
  async ()=>{
    await connectRedis()
    await startServer()
    seedSuperAdmin()


 })()





 process.on('SIGTERM', () => {
  console.log('Sigterm signal received, ... server shutting down');

   if(server){
    server.close(()=>{
           process.exit(1)

    });
 
   }
   process.exit(1);

});






process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection  detected, ... server shutting down',err);

   if(server){
    server.close(()=>{
           process.exit(1)

    });
 
   }
   process.exit(1);

});


process.on('uncaughtException', (err) => {
  console.log('Uncaught Rxception  detected, ... server shutting down',err);

   if(server){
    server.close(()=>{
           process.exit(1)

    });
 
   }
   process.exit(1);

});


// uncaught exception  

// throw new Error('I forgot to handle uncaught exception !!')

// unhandledRejection

//  Promise.reject(new Error(' I forgot to catch this Promise !!!'))