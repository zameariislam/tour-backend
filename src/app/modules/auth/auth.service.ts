import { AppError } from "../../../errorHelpers/AppError";
import { IsActive, IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt'

import jwt, { JwtPayload } from 'jsonwebtoken'
import { generateToken, verifyToken } from "../../../utils/jwt";
import { enVars } from "../../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../../utils/userTokens";


 const credentialsLogin=async (payload:Partial<IUser>)=>{
    const {email,password,...rest}=payload;

    const isUserExist= await User.findOne({email}).lean()

        
           if(!isUserExist){ 
             throw new AppError('User does not Exist',httpStatus.BAD_REQUEST)
    
           }

           const isPasswordMatched= await bcrypt.compare( password as string,isUserExist.password as string)
           if(!isPasswordMatched){
            throw new AppError('Incorrect password',httpStatus.BAD_REQUEST)

           }

          const tokens=createUserTokens(isUserExist)

     
                 console.log('Exist')
  
            delete isUserExist.password

          
           return{
            ...tokens,
            user:isUserExist

           }


 }


 const getNewAccessToken=async (refreshToken:string)=>{


  const newAccessToken=await createNewAccessTokenWithRefreshToken(refreshToken)

 
 

  return {
    accessToken:newAccessToken
  }



    // const verifiedRefreshToken= verifyToken(refreshToken,enVars.JWT_REFRESH_SECRET) as JwtPayload

    // const isUserExist= await User.findById(verifiedRefreshToken.id)

   
        
    //        if(!isUserExist){ 
    //          throw new AppError('User does not Exist',httpStatus.BAD_REQUEST)
    
    //        }
    //        if(isUserExist.isActive==IsActive.BLOCKED ||isUserExist.isActive==IsActive.INACTIVE ){
    //          throw new AppError(`User is ${isUserExist.isActive}`,httpStatus.BAD_REQUEST)
    //        }
    //        if(isUserExist.isDeleted){
    //          throw new AppError('User  is Deleted',httpStatus.BAD_REQUEST)
    //        }


           
    //   const jwtPayload={
    //             id:isUserExist._id,
    //             email:isUserExist.email,
    //             role:isUserExist.role
    //            }


    //        const accessToken=generateToken(jwtPayload, enVars.JWT_ACCESS_SECRET,enVars.JWT_ACCESS_EXPIRES)
       

      

          //  return{
          //   accessToken

          //  }


 }


 const resetPassword=async (oldPassword:string, newPassword:string,decodeToken:JwtPayload)=>{



  const user= await User.findById(decodeToken.id)


   console.log('user avialable')


const isPasswordMatched= await bcrypt.compare(oldPassword, user!.password as string);
  if(!isPasswordMatched){

            throw new AppError('Old Password does not match',httpStatus.UNAUTHORIZED)

    }

    
    console.log('resetss match')

    const newHashedPassword= await bcrypt.hash(newPassword,Number( enVars.BCRYPT_SALT_ROUND))


    user!.password=newHashedPassword;
    user!.save()

        
           }

    
    

    

 export const AutServices={
    credentialsLogin,
    getNewAccessToken,
    resetPassword
 }