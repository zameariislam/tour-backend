

//  {
//     "origin": "string",
//     "code": "invalid_format",
//     "format": "email",
//     "pattern": "/^(?!\\.)(?!.*\\.\\.)([A-Za-z0-9_'+\\-\\.]*)[A-Za-z0-9_+-]@([A-Za-z0-9][A-Za-z0-9\\-]*\\.)+[A-Za-z]{2,}$/",
//     "path": [
//       "email"
//     ],
//     "message": "Invalid email address format."
//   },


 import { Request,Response,NextFunction } from "express"
import { enVars } from "../config/env"
import { AppError } from "../errorHelpers/AppError";

import{ z }from "zod";
import { handlerDuplicateError } from "../app/helpers/handleDuplicateError";
import { handleCastError } from "../app/helpers/handleCastErrror";
import { handlerValidationError } from "../app/helpers/handlerValidationError";
import { TErrorSources } from "../app/interfaces/error.types";

export const globalErrorHandler= (err:any, req:Request, res:Response, next:NextFunction) => { 



   if(enVars.NODE_ENV==='development'){
      // console.log(err)
   }


   

 let errorSources: TErrorSources[] = []
    let statusCode = 500
    let message = "Something Went Wrong!!"

   //  duplicate Error 

       if(err.code===11000){


          console.log('i am from duplicatebbb',err)

      const simplifiedError = handlerDuplicateError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
      
       
       
     } 

       // Object ID error / Cast Error

        else if (err.name === "CastError") {
        const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }

     //Mongoose Validation Error

      else if(err.name==='ValidationError'){

          const simplifiedError = handlerValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources as TErrorSources[]
        message = simplifiedError.message

      const errors= Object.values(err.errors)

     }
 
   //   Zod Error 

       else if(err.name==='ZodError'){
         const errString = err.toString().replace("ZodError: ", ""); 
   const zodError = JSON.parse(errString);
     

   zodError.forEach((errorObject:any)=>{
      errorSources.push({ path:errorObject.path[errorObject.path.length-1], message:errorObject.message})
   })

         
         
       
        statusCode=400
        message='Validation Error'
     }



    


    else if(err instanceof AppError){
        
       
        statusCode=err.statusCode
        message=err.message
     } else if(err instanceof Error){
        
       
        statusCode=500
        message=err.message
     }
    


  res.status(statusCode).json({
    success:false,
   message,
   errorSources,
    err:enVars.NODE_ENV==='development'?err :null,
    stack: enVars.NODE_ENV==='development'? err.stack:''
  })


  }



//  