
import { Request,Response,NextFunction } from "express"

import httpStatus from 'http-status-codes'

export const notFound=(req:Request, res:Response, next:NextFunction) => {

  console.log('not found')

  res.status(httpStatus.NOT_FOUND).json({
    success:false,
    message:'Route Not Found'
  })
}