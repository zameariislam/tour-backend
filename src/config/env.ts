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
      FRONTEND_URL:string;
   
         SSL:
          {
        STORE_ID: string,
        STORE_PASS: string,
        SSL_PAYMENT_API: string,
        SSL_VALIDATION_API: string,
         SSL_SUCCESS_BACKEND_URL: string,
        SSL_FAIL_BACKEND_URL: string,
        SSL_CANCEL_BACKEND_URL: string,
        SSL_SUCCESS_FRONTEND_URL: string,
        SSL_FAIL_FRONTEND_URL: string,
        SSL_CANCEL_FRONTEND_URL: string,
       
    };
     EMAIL_SENDER: {
        SMTP_USER: string;
        SMTP_PASS: string;
        SMTP_PORT: string;
        SMTP_HOST: string;
        SMTP_FROM: string;
    };

   
 }


 


  const loadEnv=():EnvConfig=>{


//      const {PORT,DB_URL,NODE_ENV}=process.env

//     if (!PORT) throw new Error('Missing PORT');
//   if (!DB_URL) throw new Error('Missing DB_URL');

//   if (!NODE_ENV) throw new Error('Missing NODE_ENV');
//   if (NODE_ENV !== 'development' && NODE_ENV !== 'production') {
//     throw new Error('NODE_ENV must be either "development" or "production"');


//   }


    const requiredEnv:string[]=['PORT','DB_URL', 'NODE_ENV','JWT_ACCESS_EXPIRES','JWT_ACCESS_SECRET','BCRYPT_SALT_ROUND',
      'SUPER_ADMIN_EMAIL','SUPER_ADMIN_PASSWORD','JWT_REFRESH_SECRET','JWT_REFRESH_SECRET','GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET',
      'EXPRESS_SESSION_SECRET','GOOGLE_CALLBACK_URL','FRONTEND_URL',
      "SSL_STORE_ID",
        "SSL_STORE_PASS",
        "SSL_PAYMENT_API", "SSL_VALIDATION_API", 
          "SSL_SUCCESS_BACKEND_URL",
        "SSL_FAIL_BACKEND_URL",
        "SSL_CANCEL_BACKEND_URL",
        "SSL_SUCCESS_FRONTEND_URL",
        "SSL_FAIL_FRONTEND_URL",
        "SSL_CANCEL_FRONTEND_URL",
         'SMTP_PASS',
          "SMTP_HOST",
        "SMTP_PORT",
          "SMTP_USER",
        "SMTP_FROM",
       
        
         ]


          requiredEnv.forEach((key)=>{
            if(!process.env[key]){
                throw new Error( `Missing required environment variable ${key} `)
            }
          })


          return {
    PORT: process.env.PORT as string,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    DB_URL: process.env.DB_URL as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL as string,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD as string,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
   
    SSL: {
        STORE_ID: process.env.SSL_STORE_ID as string,
        STORE_PASS: process.env.SSL_STORE_PASS as string,
        SSL_PAYMENT_API: process.env.SSL_PAYMENT_API as string,
        SSL_VALIDATION_API: process.env.SSL_VALIDATION_API as string,
          SSL_SUCCESS_BACKEND_URL: process.env.SSL_SUCCESS_BACKEND_URL as string,
        SSL_FAIL_BACKEND_URL: process.env.SSL_FAIL_BACKEND_URL as string,
        SSL_CANCEL_BACKEND_URL: process.env.SSL_CANCEL_BACKEND_URL as string,
        SSL_SUCCESS_FRONTEND_URL: process.env.SSL_SUCCESS_FRONTEND_URL as string,
        SSL_FAIL_FRONTEND_URL: process.env.SSL_FAIL_FRONTEND_URL as string,
        SSL_CANCEL_FRONTEND_URL: process.env.SSL_CANCEL_FRONTEND_URL as string,
      
    },
     EMAIL_SENDER: {
            SMTP_USER: process.env.SMTP_USER as string,
            SMTP_PASS: process.env.SMTP_PASS as string,
            SMTP_PORT: process.env.SMTP_PORT as string,
            SMTP_HOST: process.env.SMTP_HOST as string,
            SMTP_FROM: process.env.SMTP_FROM as string,
        },
}
    
  }




 

  



  export const enVars=loadEnv()


