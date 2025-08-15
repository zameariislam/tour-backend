
 import mongoose from 'mongoose';
import{ Server} from 'http';
import { app } from './app';
import { enVars } from './config/env';



const port=3000

let server:Server

 const startServer= async ()=>{

    try{
          await  mongoose.connect(enVars.DB_URL)

      console.log(' connetced to DB !!!' )

    server= app.listen(port,()=>{

         console.log(`Server is running on http://localhost:${port}`);

      })
      
      
    } catch(error:any){

        console.log('error',error.message)

    }
   

 }

 startServer()



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