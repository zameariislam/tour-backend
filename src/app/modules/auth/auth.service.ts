import { AppError } from "../../../errorHelpers/AppError";
import { IUser } from "../user/user.interface"
import { User } from "../user/user.model";
import httpStatus from 'http-status-codes';
import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'
import { generateToken } from "../../../utils/jwt";
import { enVars } from "../../../config/env";

 const credentialsLogin=async (payload:Partial<IUser>)=>{

    
    const {email,password,...rest}=payload;

    const isUserExist= await User.findOne({email})

    
        
           if(!isUserExist){ 
             throw new AppError('User does not Exist',httpStatus.BAD_REQUEST)
    
           }

           const isPasswordMatched= await bcrypt.compare( password as string,isUserExist.password as string)
           if(!isPasswordMatched){
            throw new AppError('Incorrect password',httpStatus.BAD_REQUEST)

           }

           const jwtPayload={
            id:isUserExist._id,
            email:isUserExist.email,
            role:isUserExist.role
           }

            // const accessToken= jwt.sign(jwtPayload, 'secret',{
            //     expiresIn:'1d'
            // })

            const accessToken= generateToken(jwtPayload, enVars.JWT_ACCESS_SECRET,enVars.JWT_ACCESS_EXPIRES)



           return{
            accessToken

           }


 }


 export const AutServices={
    credentialsLogin
 }