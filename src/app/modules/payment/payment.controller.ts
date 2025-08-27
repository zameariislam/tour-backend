import { catchAsnc } from "../../../utils/catchAsync"

import { Request,Response } from "express";
import { Booking } from "../booking/booking.model";
import { Payment } from "./payment.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { PaymentService } from "./payment.service";
import { enVars } from "../../../config/env";
import { sendResponse } from "../../../utils/sendResponse";



const initPayment = catchAsnc(async (req: Request, res: Response) => {


 
    const bookingId = req.params.bookingId;
    const result = await PaymentService.initPayment(bookingId as string)
    sendResponse(res, {
        statusCode: 201,
        sucess: true,
        message: "Payment done successfully",
        data: result,
    });

  
});

const successPayment = catchAsnc(async (req: Request, res: Response) => {

     const query= req.query;

     const{success,message}= await PaymentService.successPayment(query as Record<string,string>)

     console.log('message',message)

  
         if (success) {
        res.redirect(`${enVars.SSL.SSL_SUCCESS_FRONTEND_URL}?transactionId=${query.transactionId}&message=${message}&amount=${query.amount}&status=${query.status}`)
    }
     



       





    
    
});
const failPayment = catchAsnc(async (req: Request, res: Response) => {

    const query= req.query;

     const{success,message}= await PaymentService.failPayment(query as Record<string,string>)

     console.log('message',message)

  
         if (!success) {
        res.redirect(`${enVars.SSL.SSL_FAIL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${message}&amount=${query.amount}&status=${query.status}`)
    }
     
   

   
});
const cancelPayment = catchAsnc(async (req: Request, res: Response) => {

    const query= req.query;

     const{success,message}= await PaymentService.cancelPayment(query as Record<string,string>)

     console.log('message',message)

  
         if (!success) {
        res.redirect(`${enVars.SSL.SSL_CANCEL_FRONTEND_URL}?transactionId=${query.transactionId}&message=${message}&amount=${query.amount}&status=${query.status}`)
    }
     
   
 
});

export const PaymentController = {
   
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
};