 import dotenv from 'dotenv'


 dotenv.config()


 interface EnvConfig{
    PORT:string;
    NODE_ENV:'development'|'production';
    DB_URL:string;
  
    JWT_ACCESS_SECRET:string;
    JWT_ACCESS_EXPIRES:string;
     JWT_REFRESH_SECRET:string;
    JWT_REFRESH_EXPIRES:string;
    BCRYPT_SALT_ROUND:string;
     SUPER_ADMIN_EMAIL:string;
    SUPER_ADMIN_PASSWORD:string;
    GOOGLE_CLIENT_ID:string;
      GOOGLE_CLIENT_SECRET:string;
      EXPRESS_SESSION_SECRET:string;
      GOOGLE_CALLBACK_URL:string;
      FRONTEND_URL:string

   
 }


 


  const loadEnv=():EnvConfig=>{


//      const {PORT,DB_URL,NODE_ENV}=process.env

//     if (!PORT) throw new Error('Missing PORT');
//   if (!DB_URL) throw new Error('Missing DB_URL');

//   if (!NODE_ENV) throw new Error('Missing NODE_ENV');
//   if (NODE_ENV !== 'development' && NODE_ENV !== 'production') {
//     throw new Error('NODE_ENV must be either "development" or "production"');


//   }


    const requiredEnv:(keyof EnvConfig)[]=['PORT','DB_URL', 'NODE_ENV','JWT_ACCESS_EXPIRES','JWT_ACCESS_SECRET','BCRYPT_SALT_ROUND',
      'SUPER_ADMIN_EMAIL','SUPER_ADMIN_PASSWORD','JWT_REFRESH_SECRET','JWT_REFRESH_SECRET','GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET','EXPRESS_SESSION_SECRET','GOOGLE_CALLBACK_URL','FRONTEND_URL']


          requiredEnv.forEach((key)=>{
            if(!process.env[key]){
                throw new Error( `Missing required environment variable ${key} `)
            }
          })


          return {
    PORT:process.env.PORT as string,
    NODE_ENV:process.env.NODE_ENV as 'development'|'production',
    DB_URL:process.env.DB_URL as string,
    JWT_ACCESS_EXPIRES:process.env.JWT_ACCESS_EXPIRES as string,
    JWT_ACCESS_SECRET:process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_EXPIRES:process.env.JWT_REFRESH_EXPIRES as string,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET as string,
    BCRYPT_SALT_ROUND:process.env.BCRYPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL:process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD:process.env.SUPER_ADMIN_PASSWORD as string,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET:process.env. GOOGLE_CLIENT_SECRET as string,
    EXPRESS_SESSION_SECRET:process.env.EXPRESS_SESSION  as string,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL as string ,
    FRONTEND_URL:process.env.FRONTEND_URL as string 
   


 }
    
  }




 

  



  export const enVars=loadEnv()


