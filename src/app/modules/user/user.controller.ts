   import { NextFunction, Request,Response } from "express"
import { User } from "./user.model"

import httpStatus from 'http-status-codes';
import { UserServices } from "./user.service";
import { AppError } from "../../../errorHelpers/AppError";
import { catchAsnc } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";



   const getAllUsers= catchAsnc(async (req,res,next)=>{

    const  result= await UserServices.getAllUsers()
    console.log(result.meta)

    
   



 sendResponse(res, {
            statusCode:httpStatus.OK,
            message:'User are retrived sucessfully !!!',
            sucess:true,
            data:result.data,
            meta:result.meta
            
            
          
            

           })


     


   })




   const createUser=  catchAsnc( async (req:Request,res:Response,next:NextFunction)=>{

         const user= await UserServices.createUserService(req.body)

           sendResponse(res, {
            statusCode:httpStatus.CREATED,
            message:'User created Sucessfully',
            sucess:true,
            data:user

           })
        
   }  )


    





 export const UserControllers={
    createUser,
    getAllUsers
 }