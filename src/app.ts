 import express, { Response,Request } from 'express';


export const app= express()





 app.get('/',(req:Request,res:Response)=>{
      res.status(200).json({
        message:'Welcome tp tour management system'
      })

 })

