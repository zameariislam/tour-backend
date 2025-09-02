
  import { Response } from "express";

interface TMeta{
    total?:number,
    page?:number;
     totalPage:number;
    limit?:number;
}

type TResponse <T>={
    statusCode:number;
    sucess:boolean;
    message:string;
    data:T;
    meta?:TMeta 

}


export const sendResponse = <T>(res: Response, data: TResponse<T>) => {

     console.log('data from sendResponse',data)

  
    
    res.status(data.statusCode).json({

        success:data.sucess,

         message:data.message,

         data:data.data,
         meta:{
            total:data.meta?.total,
            page:data.meta?.page,
             totalPage:data.meta?.totalPage,
            limit:data.meta?.limit,
         }
        

    
    })

}