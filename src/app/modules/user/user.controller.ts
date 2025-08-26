   import { NextFunction, Request,Response } from "express"
import { User } from "./user.model"

import httpStatus from 'http-status-codes';
import { UserServices } from "./user.service";
import { AppError } from "../../../errorHelpers/AppError";
import { catchAsnc } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { verifyToken } from "../../../utils/jwt";
import { enVars } from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";




   const getAllUsers= catchAsnc(async (req,res,next)=>{

    const  result= await UserServices.getAllUsers()



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


    const updateUser=  catchAsnc( async (req:Request,res:Response,next:NextFunction)=>{

       const userId=req.params.id

        const verifiedToken=req.user
      
         
      //  const token= req.headers.authorization;
      //  if(!token){
      //     throw new AppError('Token not Found', 403)
      //  }

      //  const verifiedToken= verifyToken(token, enVars.JWT_ACCESS_SECRET) as JwtPayload

         const user= await UserServices.updateUserService(userId, req.body, verifiedToken as JwtPayload )

           sendResponse(res, {
            statusCode:httpStatus.CREATED,
            message:'User created Sucessfully',
            sucess:true,
            data:user

           })
        
   }  )


    





 export const UserControllers={
    createUser,
    getAllUsers,
    updateUser
 }