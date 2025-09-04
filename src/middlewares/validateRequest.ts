
 import { Request,Response,NextFunction } from "express"
 import { ZodObject } from "zod"

export const validateRequest=  (zodSchema:ZodObject<any>) =>async (req:Request,res:Response,next:NextFunction)=>{

   

      try{

        if(req.body?.data){
           req.body= JSON.parse(req.body?.data)

        }
      
          req.body= await zodSchema.parseAsync(req.body)
          
          next()
      }
      catch(err){

        next(err)

      }
    
      


}