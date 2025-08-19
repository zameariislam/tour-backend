import { JwtPayload } from "jsonwebtoken";
import { IsActive, IUser } from "../app/modules/user/user.interface";
import { User } from "../app/modules/user/user.model";
import { enVars } from "../config/env";
import { AppError } from "../errorHelpers/AppError";
import { generateToken, verifyToken } from "./jwt";
import httpStatus from 'http-status-codes'


export const createUserTokens=( user:Partial<IUser>)=>{

      const jwtPayload={
                id:user._id,
                email:user.email,
                role:user.role
               }
    
                // const accessToken= jwt.sign(jwtPayload, 'secret',{
                //     expiresIn:'1d'
                // })
    
                const accessToken= generateToken(jwtPayload, enVars.JWT_ACCESS_SECRET,enVars.JWT_ACCESS_EXPIRES);
                const refreshToken= generateToken(jwtPayload, enVars.JWT_REFRESH_SECRET,enVars.JWT_REFRESH_EXPIRES);


                return {
                    accessToken,
                    refreshToken
                    
                }
}



export const createNewAccessTokenWithRefreshToken=async ( refreshToken:string)=>{

     
  const verifiedRefreshToken= verifyToken(refreshToken,enVars.JWT_REFRESH_SECRET) as JwtPayload

    const isUserExist= await User.findById(verifiedRefreshToken.id)

   
        
           if(!isUserExist){ 
             throw new AppError('User does not Exist',httpStatus.BAD_REQUEST)
    
           }
           if(isUserExist.isActive==IsActive.BLOCKED ||isUserExist.isActive==IsActive.INACTIVE ){
             throw new AppError(`User is ${isUserExist.isActive}`,httpStatus.BAD_REQUEST)
           }
           if(isUserExist.isDeleted){
             throw new AppError('User  is Deleted',httpStatus.BAD_REQUEST)
           }


           
      const jwtPayload={
                id:isUserExist._id,
                email:isUserExist.email,
                role:isUserExist.role
               }


           const accessToken=generateToken(jwtPayload, enVars.JWT_ACCESS_SECRET,enVars.JWT_ACCESS_EXPIRES)
       

      

           return accessToken
        
           


}
