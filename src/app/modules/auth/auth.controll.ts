import { sendResponse } from "../../../utils/sendResponse"
import httpStatus from 'http-status-codes';
import { AutServices } from "./auth.service";
import { catchAsnc } from "../../../utils/catchAsync";

import { Request,Response,NextFunction } from "express";
import { AppError } from "../../../errorHelpers/AppError";
import { setAuthCookie } from "../../../utils/setCookie";
import { JwtPayload } from "jsonwebtoken";
import { createUserTokens } from "../../../utils/userTokens";
import { enVars } from "../../../config/env";

const credentialsLogin=catchAsnc(async (req:Request,res:Response,next:NextFunction)=>{


    const  loginInfo= await AutServices.credentialsLogin(req.body)


    setAuthCookie(res,loginInfo)


        // setCookie(res, 'accessToken', loginInfo.accessToken)
        // setCookie(res, 'refreshToken', loginInfo.refreshToken)


//      res.cookie('accessToken',loginInfo.accessToken,{
//         httpOnly:true,
//         secure:false
//     })


 
//     res.cookie('refreshToken',loginInfo.refreshToken,{
//         httpOnly:true,
//         secure:false
//     })



 sendResponse(res, {
            statusCode:httpStatus.OK,
            message:'User loggedin sucessfully !!!',
            sucess:true,
            data:loginInfo,
           
        
           })

   })





const getNewAccessToken=catchAsnc(async (req:Request,res:Response,next:NextFunction)=>{

        const refreshToken= req.cookies.refreshToken


    
 if(!refreshToken){
  throw new AppError('refreshToken No found',refreshToken)
 }
     

    const  accessToken= await AutServices.getNewAccessToken(refreshToken as string)
     console.log('newAcesssss',accessToken.accessToken)

   setAuthCookie(res, accessToken)

//      res.cookie('accessToken',accessToken.accessToken,{
//         httpOnly:true,
//         secure:false
//     })



         


 sendResponse(res, {
            statusCode:httpStatus.OK,
            message:'New access Token  Retrieved sucessfully !!!',
            sucess:true,
            data:accessToken,
           
            

           })


     


   })



  
     const logout=catchAsnc(async (req:Request,res:Response,next:NextFunction)=>{


        res.clearCookie('accessToken',{
                httpOnly:true,
                secure:false,
                sameSite:'lax'
        })
        
        res.clearCookie('refreshToken',{
                httpOnly:true,
                secure:false,
                sameSite:'lax'
        })



  


 



 sendResponse(res, {
            statusCode:httpStatus.OK,
            message:'User logout sucessfully !!!',
            sucess:true,
            data:null,
           
        
           })

   })


    const resetPassword=catchAsnc(async (req:Request,res:Response,next:NextFunction)=>{


        const decodeToken= req.user;
        const {oldPassword,newPassword}=req.body
  
      
await  AutServices.resetPassword (oldPassword,newPassword, decodeToken as JwtPayload)

  


 sendResponse(res, {
            statusCode:httpStatus.OK,
            message:'Reset Password sucessfully !!!',
            sucess:true,
            data:null,
           
        
           })

   })

    const  googleCallbackController=catchAsnc(async (req:Request,res:Response,next:NextFunction)=>{

      const user= req.user;

      let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }


   
      if(!user){

        throw new AppError('User Not Found', httpStatus.NOT_FOUND)
      }

      const tokenInfo=createUserTokens(user)

      setAuthCookie(res,tokenInfo);


      res.redirect(`${enVars.FRONTEND_URL}/${redirectTo}`)


   })



   export const AutControllers={
    credentialsLogin,
    getNewAccessToken,
    logout,
   resetPassword,
   googleCallbackController
   }
