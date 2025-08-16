
import { Request,Response, NextFunction,Router } from "express";
 

import  { JwtPayload } from 'jsonwebtoken'
import { AppError } from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { enVars } from "../config/env";




export const chekAuth=(...authRoles:string[])=> async(req:Request,res:Response,next:NextFunction)=>{


       try{

        const accessToken= req.headers.authorization
        if(!accessToken){
          throw new AppError('No Token received',403)

        }
        // const verifiedToken=jwt.verify(accessToken,enVars.JWT_SECRET)

        const verifiedToken=verifyToken(accessToken,enVars.JWT_ACCESS_SECRET) as JwtPayload
        console.log('token', verifiedToken)

        // const allowedRole=[Role.ADMIN,Role.SUPER_ADMIN]

        // if(( verifiedToken as JwtPayload).role!==Role.ADMIN || Role.SUPER_ADMIN){
         

        // }

        if(!authRoles.includes( verifiedToken.role)){
           throw new AppError('You are not allowed to view this route',403)

        }
        req.user=verifiedToken

        next()

       }catch(err){

        next(err)
        
        console.log('err',err)

  

       }



}