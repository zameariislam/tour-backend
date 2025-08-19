import { NextFunction, Router,Request,Response } from "express";

import { UserControllers } from "./user.controller";


import { validateRequest } from "../../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";


import { chekAuth } from "../../../middlewares/checkAuth";
import { Role } from "./user.interface";





const  router=Router()

// const chekAuth=(...authRoles:string[])=> async(req:Request,res:Response,next:NextFunction)=>{


//        try{

//         const accessToken= req.headers.authorization
//         if(!accessToken){
//           throw new AppError('No Token received',403)

//         }
//         // const verifiedToken=jwt.verify(accessToken,enVars.JWT_SECRET)

//         const verifiedToken=verifyToken(accessToken,enVars.JWT_ACCESS_SECRET) as JwtPayload
//         console.log('token', verifiedToken)

//         // const allowedRole=[Role.ADMIN,Role.SUPER_ADMIN]

//         // if(( verifiedToken as JwtPayload).role!==Role.ADMIN || Role.SUPER_ADMIN){
         

//         // }
//         if(!authRoles.includes( verifiedToken.role)){
//            throw new AppError('You are not allowed to view this route',403)

//         }

//         next()

//        }catch(err){

//         next(err)
        
//         console.log('err',err)

  

//        }



// }

router.post('/register',  validateRequest(createUserZodSchema),  UserControllers.createUser)
router.get('/', chekAuth(Role.ADMIN,Role.SUPER_ADMIN)  , UserControllers.getAllUsers)
router.patch('/:id', validateRequest(updateUserZodSchema), chekAuth( ...Object.values(Role)) , UserControllers.updateUser)


export const UserRoutes=router