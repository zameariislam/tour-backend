 import dotenv from 'dotenv'


 dotenv.config()


 interface EnvConfig{
    PORT:string;
    NODE_ENV:'development'|'production';
    DB_URL:string;
  
    JWT_ACCESS_SECRET:string;
    JWT_ACCESS_EXPIRES:string;
    BCRYPT_SALT_ROUND:string;
     SUPER_ADMIN_EMAIL:string;
    SUPER_ADMIN_PASSWORD:string;
 }


 


  const loadEnv=():EnvConfig=>{


//      const {PORT,DB_URL,NODE_ENV}=process.env

//     if (!PORT) throw new Error('Missing PORT');
//   if (!DB_URL) throw new Error('Missing DB_URL');

//   if (!NODE_ENV) throw new Error('Missing NODE_ENV');
//   if (NODE_ENV !== 'development' && NODE_ENV !== 'production') {
//     throw new Error('NODE_ENV must be either "development" or "production"');


//   }


    const requiredEnv:(keyof EnvConfig)[]=['PORT','DB_URL', 'NODE_ENV','JWT_ACCESS_EXPIRES','JWT_ACCESS_SECRET','BCRYPT_SALT_ROUND','SUPER_ADMIN_EMAIL','SUPER_ADMIN_PASSWORD']


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
    BCRYPT_SALT_ROUND:process.env.BCRYPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL:process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD:process.env.SUPER_ADMIN_PASSWORD as string,


 }
    
  }




 

  



  export const enVars=loadEnv()


