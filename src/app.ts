 import express, { Response,Request, NextFunction } from 'express';

import cors from 'cors'
import { router } from './routes';

import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';



export const app= express()




app.use(cors())
app.use(express.json())

app.use('/api/v1',router)





 app.get('/',(req:Request,res:Response)=>{
      res.status(200).json({
        message:'Welcome tp tour management system'
      })

 })


 app.use(globalErrorHandler)

 app.use(notFound)