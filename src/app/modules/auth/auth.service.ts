import { AppError } from "../../../errorHelpers/AppError";
import { IAuthProvider, IsActive, IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt'

import jwt, { JwtPayload } from 'jsonwebtoken'
import { generateToken, verifyToken } from "../../../utils/jwt";
import { enVars } from "../../../config/env";
import { createNewAccessTokenWithRefreshToken, createUserTokens } from "../../../utils/userTokens";
import { sendEmail } from "../../../utils/sendEmail";



 const credentialsLogin=async (payload:Partial<IUser>)=>{

   console.log('hello from login')
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





const resetPassword = async (payload: Record<string, any>, decodedToken: JwtPayload) => {
    if (payload.id !== decodedToken.id) {

       console.log(payload.id, 'de',decodedToken.id)
        throw new AppError("You can not reset your password", 401 )
    }

    const isUserExist = await User.findById(decodedToken.id)
    if (!isUserExist) {
        throw new AppError("User does not exist",401 )
    }

    const hashedPassword = await bcrypt.hash(
        payload.newPassword,
        Number(enVars.BCRYPT_SALT_ROUND)
    )

    isUserExist.password = hashedPassword;

    await isUserExist.save()
    return null
}

const setPassword=async (userId:string, plainPassword:string,)=>{



  const user= await User.findById(userId)


 if(!user){

            throw new AppError('User Not Found',404)

    }

     if(user.password&& user.auths.some((providerObject)=>providerObject.provider==='google')){

      throw new AppError('You have already Set Your password',404)

     

    }

      const hashedPassword= await bcrypt.hash(plainPassword,Number( enVars.BCRYPT_SALT_ROUND))
       

         const auths:IAuthProvider[]=[...user.auths,{ provider:'credentials', providerId:user.email}]
          user!.password=hashedPassword;
          user.auths=auths
        user!.save()

        return null



 

        
           }

const forgotPassword=async (email:string)=>{

 

  const isUserExist= await User.findOne({email})

 


 if(!isUserExist){

            throw new AppError('User Not Found',404)

    }


     if(isUserExist.isActive==IsActive.INACTIVE || isUserExist.isActive==IsActive.BLOCKED){
                 throw new AppError(`User is ${isUserExist.isActive}`,httpStatus.BAD_REQUEST)
               }
                if(isUserExist.isDeleted){
                 throw new AppError(`User is Deleted`,httpStatus.BAD_REQUEST)
               }
                if(!isUserExist.isVerified){
                 throw new AppError(`User is not Verified`,httpStatus.BAD_REQUEST)
               }
        


                const jwtPayload={
                  id:isUserExist._id,
                  email:isUserExist.email,
                  role:isUserExist.role
                }

                 const resetToken= jwt.sign(jwtPayload,enVars.JWT_ACCESS_SECRET,{
                  expiresIn:'10m'
                 })

                  const resetUILink= `${enVars.FRONTEND_URL}/reset-password?id=${isUserExist._id}&token=${resetToken}`

                  sendEmail({
                    to:isUserExist.email,
                    subject:'Password reset',
                    templateName:'forgetPassword',
                    templateData:{
                      name:isUserExist.name,
                      resetUILink
              
                    }

                  })
    

     

        return null



 

        
           }




           
 



    
    

    

 export const AutServices={
    credentialsLogin,
    getNewAccessToken,
    resetPassword,
    setPassword,
    forgotPassword
 }




