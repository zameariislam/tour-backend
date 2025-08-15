import { IUser } from "./user.interface";
import { User } from "./user.model";


 const createUserService=async (payload:Partial<IUser>)=>{
       const {name,email}=payload

     const result=await  User.create({name,email})
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