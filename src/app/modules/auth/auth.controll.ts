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
import passport from "passport";

const credentialsLogin = catchAsnc(async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.credentialsLogin(req.body)

    passport.authenticate("local", async (err: any, user: any, info: any) => {
         console.log('user',user,'error',err)
     if (err) {
            return next(err); // real system error
        }

        if (!user) {
            // login failed → use info.message
            return next(new AppError(info?.message || "Invalid credentials", 401));
        }

        const userTokens =  createUserTokens(user)

        // delete user.toObject().password

        const { password: pass, ...rest } = user.toObject()


        setAuthCookie(res, userTokens)

        sendResponse(res, {
            sucess: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest

            },
        })
    })(req, res, next)

    


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


const resetPassword = catchAsnc(async (req: Request, res: Response, next: NextFunction) => {

    const decodedToken = req.user

    await AutServices.resetPassword(req.body, decodedToken as JwtPayload);

    sendResponse(res, {
        sucess: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})



 const setPassword=catchAsnc(async (req:Request,res:Response,next:NextFunction)=>{


        const decodeToken= req.user as JwtPayload;
        const {password}=req.body ;
       
  
      
await  AutServices.setPassword ( decodeToken.id ,password)

  


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

   const forgotPassword=catchAsnc(async (req:Request,res:Response,next:NextFunction)=>{


       
        const {email}=req.body ;
       
  
      
await  AutServices.forgotPassword(email)

  


 sendResponse(res, {
            statusCode:httpStatus.OK,
            message:'Email Sent sucessfully !!!',
            sucess:true,
            data:null,
           
        
           })

   })


   export const AutControllers={
    credentialsLogin,
    getNewAccessToken,
    logout,
   resetPassword,
   setPassword,
   googleCallbackController,
   forgotPassword
   }
