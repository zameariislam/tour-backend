import { AppError } from "../../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from 'http-status-codes';


 import bcrypt  from 'bcrypt';
import { enVars } from "../../../config/env";


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




 export const UserServices={
    createUserService,
    getAllUsers
 }