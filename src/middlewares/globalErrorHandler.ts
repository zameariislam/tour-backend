
 import { Request,Response,NextFunction } from "express"
import { enVars } from "../config/env"
import { AppError } from "../errorHelpers/AppError";

export const globalErrorHandler= (err:any, req:Request, res:Response, next:NextFunction) => { 

    let statusCode=500;
     let  message=`something went wrong !!! ${err.message}`



     if(err instanceof AppError){
        
       
        statusCode=err.statusCode
        message=err.message
     } else if(err instanceof Error){
        
       
        statusCode=500
        message=err.message
     }


  res.status(500).json({
    success:false,
   message,
    err,
    stack: enVars.NODE_ENV=='development'? err.stack:''
  })


  console.log('')
  }