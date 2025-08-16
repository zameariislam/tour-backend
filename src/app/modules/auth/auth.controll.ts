import { sendResponse } from "../../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { AutServices } from "./auth.service";
import { catchAsnc } from "../../../utils/catchAsync";

import { Request,Response,NextFunction } from "express";

const credentialsLogin=catchAsnc(async (req:Request,res:Response,next:NextFunction)=>{


    const  loginInfo= await AutServices.credentialsLogin(req.body)



 sendResponse(res, {
            statusCode:httpStatus.OK,
            message:'User loggedin sucessfully !!!',
            sucess:true,
            data:loginInfo,
           
            
            
          
            

           })


     


   })



   export const AutControllers={
    credentialsLogin
   }
