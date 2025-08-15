
  import { Response } from "express";

interface TMeta{
    total:number
}

type TResponse <T>={
    statusCode:number;
    sucess:boolean;
    message:string;
    data:T;
    meta?:TMeta

}


export const sendResponse = <T>(res: Response, data: TResponse<T>) => {

  
    
    res.status(data.statusCode).json({

        success:data.sucess,

         message:data.message,

         data:data.data,
         meta:{
            total:data.meta?.total
         }
        

    
    })

}