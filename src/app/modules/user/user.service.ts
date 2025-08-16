import { AppError } from "../../../errorHelpers/AppError";
import { IAuthProvider, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';

 import bcrypt  from 'bcrypt';
import { enVars } from "../../../config/env";
import { JwtPayload } from "jsonwebtoken";


 const createUserService=async (payload:Partial<IUser>)=>{
       const {email,password,...rest}=payload

       const isUserExist= await User.findOne({email})

     
       
       if(isUserExist){ 
         throw new AppError('User is Already Exist',httpStatus.BAD_REQUEST)

       }

       const hashedPassword= await bcrypt.hash(password as string, Number(enVars.BCRYPT_SALT_ROUND ))

       const authProvider:IAuthProvider={
         provider:"credentials",
         providerId:email as string
       }


     const result=await  User.create(
      {
         email,
         password:hashedPassword,
         auths:[authProvider],
         ...rest

      }
      )
     return result



 } 

  const getAllUsers=async ()=>{
     

     const users=await  User.find({})
   

     const total= await User.countDocuments()
     return{
        data:users,
        meta:{
            total
        }
     }


 } 


  const updateUserService=async (userId:string, payload:Partial<IUser>, decodeToken:JwtPayload)=>{
       const {email,password,...rest}=payload

       const isUserExist= await User.findById(userId)

        if (!isUserExist) {
                throw new AppError("User Not Found",httpStatus.NOT_FOUND );
    }


       if(payload.role ||payload.isActive || payload.isVerified||payload.isDeleted){

        if( decodeToken.role== Role.USER || decodeToken.role== Role.GUIDE){
          
               throw new AppError("You are not authorized",httpStatus.FORBIDDEN );
     

        }
      
       }



       if(payload.role==Role.SUPER_ADMIN ){
         
        if(decodeToken.role==Role.ADMIN){
         
               throw new AppError("You are not authorized",httpStatus.FORBIDDEN );

        }


       }

         if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, Number(enVars.BCRYPT_SALT_ROUND))
    }

     


      //  }

     
       
       if(!isUserExist){ 
         throw new AppError('User  does not  Exist',httpStatus.BAD_REQUEST)

       }

      //  const hashedPassword= await bcrypt.hash(password as string, Number(enVars.BCRYPT_SALT_ROUND ))

       const updateUser= await User.findByIdAndUpdate(userId,payload,{
         new:true,
         runValidators:true
       } )

      

    
     return updateUser



 } 




 export const UserServices={
    createUserService,
    getAllUsers,
    updateUserService
 }