
import { Request,Response, NextFunction,Router } from "express";
 

import  { JwtPayload } from 'jsonwebtoken'
import { AppError } from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { enVars } from "../config/env";
import { User } from "../app/modules/user/user.model";

import httpStatus from 'http-status-codes'
import { IsActive } from "../app/modules/user/user.interface";




export const chekAuth=(...authRoles:string[])=> async(req:Request,res:Response,next:NextFunction)=>{


       try{

        const accessToken= req.headers.authorization

        console.log(accessToken)
        
        if(!accessToken){
          throw new AppError('No Token received',403)

        }
      

        const verifiedToken=verifyToken(accessToken,enVars.JWT_ACCESS_SECRET) as JwtPayload



         const isUserExist= await User.findById(verifiedToken.id)

        
           if(!isUserExist){ 
             throw new AppError('User does not Exist',httpStatus.BAD_REQUEST)
    
           }

           if(isUserExist.isActive==IsActive.INACTIVE || isUserExist.isActive==IsActive.BLOCKED){
             throw new AppError(`User is ${isUserExist.isActive}`,httpStatus.BAD_REQUEST)
           }
            if(isUserExist.isDeleted){
             throw new AppError(`User is Deleted`,httpStatus.BAD_REQUEST)
           }
    

   
         

        

        if(!authRoles.includes( verifiedToken.role)){
           throw new AppError('You are not allowed to view this route',403)

        }


        console.log('auth done')
        req.user=verifiedToken

        next()

       }catch(err){

        next(err)
        
        console.log('err',err)

  

       }



}