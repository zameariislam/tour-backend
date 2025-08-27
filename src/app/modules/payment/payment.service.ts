import { AppError } from "../../../errorHelpers/AppError";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";

import { SSLService } from "../sslCommerz/sslCommerz.servicets";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";
import httpStatus from 'http-status-codes'



const initPayment = async (bookingId: string) => {
     const payment = await Payment.findOne({ booking: bookingId })
      if (!payment) {
        throw new AppError( "Payment Not Found. You have not booked this tour",httpStatus.NOT_FOUND, )
    }
 

  const booking = await Booking.findById(payment.booking)



    const sslPayload={
                  amount:payment.amount,
                  transactionId:payment.transactionId,
                  name:(booking?.user as any).name as string,
                  email:(booking?.user as any).email as string,
                  phone:(booking?.user as any).phone as string,
                  address:(booking?.user as any).address as string,
  
              }
  
            const sslPayment= await SSLService.sslPaymentInit(sslPayload)


            return {
        paymentUrl: sslPayment.GatewayPageURL
    }

  

   
  

};
const successPayment = async (query: Record<string, string>) => {
    
     const session = await Booking.startSession();
        session.startTransaction()
    
        try {

            const updatedPayment = await Payment.findOneAndUpdate({transactionId:query.transactionId}, {
                       
                        status: PAYMENT_STATUS.PAID,
                       
                    }, { new:true,  runValidators:true, session })

            const updatedBooking = await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                {  status: BOOKING_STATUS.COMPLETD },
                { new: true, runValidators: true, session }
            )
                await session.commitTransaction();

             return { success: true, message: "Payment Completed Successfully" }
           
         
       
         
        
           
    
        
           
            
        } catch (error) {
            await session.abortTransaction(); // rollback
            session.endSession()
            // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
            throw error
        }


   

  
};
const failPayment = async (query: Record<string, string>) => {

    const session = await Booking.startSession();
        session.startTransaction()
    
        try {

            const updatedPayment = await Payment.findOneAndUpdate({transactionId:query.transactionId}, {
                       
                        status: PAYMENT_STATUS.FAILED,
                       
                    }, { new:true,  runValidators:true, session })

            const updatedBooking = await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                {  status: BOOKING_STATUS.FAILED },
                { new: true, runValidators: true, session }
            )
                await session.commitTransaction();

             return { success: false, message: "Payment Is Failed" }
           
         
       
         
        
           
    
        
           
            
        } catch (error) {
            await session.abortTransaction(); // rollback
            session.endSession()
            // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
            throw error
        }


 
};
const cancelPayment = async (query: Record<string, string>) => {


    const session = await Booking.startSession();
        session.startTransaction()
    
        try {

            const updatedPayment = await Payment.findOneAndUpdate({transactionId:query.transactionId}, {
                       
                        status: PAYMENT_STATUS.CANCELLED,
                       
                    }, { new:true,  runValidators:true, session })

            const updatedBooking = await Booking
            .findByIdAndUpdate(
                updatedPayment?.booking,
                {  status: BOOKING_STATUS.CANCELED },
                { new: true, runValidators: true, session }
            )
                await session.commitTransaction();

             return { success: false, message: "Payment is cancelled !!" }
           
         
       
         
        
           
    
        
           
            
        } catch (error) {
            await session.abortTransaction(); // rollback
            session.endSession()
            // throw new AppError(httpStatus.BAD_REQUEST, error) ❌❌
            throw error
        }



};


export const PaymentService = {
    initPayment,
    successPayment,
    failPayment,
    cancelPayment,
};
