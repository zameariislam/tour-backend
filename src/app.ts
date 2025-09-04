 import express, { Response,Request, NextFunction } from 'express';

import cors from 'cors'
import { router } from './routes';

import { globalErrorHandler } from './middlewares/globalErrorHandler';
import { notFound } from './middlewares/notFound';

 import expressSession from  'express-session'
 import passport from 'passport';

import cookieParser from 'cookie-parser';

import './config/passport'
import { enVars } from './config/env';



export const app= express()


app.use(expressSession({
  secret:'your secret',
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());


app.use(cors({
    origin: enVars.FRONTEND_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use('/api/v1',router)





 app.get('/',(req:Request,res:Response)=>{
      res.status(200).json({
        message:'Welcome tp tour management system'
      })

 })


 app.use(globalErrorHandler)

 app.use(notFound)