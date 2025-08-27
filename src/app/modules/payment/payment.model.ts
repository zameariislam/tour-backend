import { model, Schema } from "mongoose";
import { IPayment, PAYMENT_STATUS } from "./payment.interface";



export const paymentSchema = new Schema<IPayment>(
    {

        
    booking:{ type:Schema.Types.ObjectId, ref:'Booking', unique:true, required:true},
    
    transactionId:{ type:String, unique:true, required:true},
    
    amount: { type:Number, required:true},
      paymentGatewayData: { type:Schema.Types.Mixed},
       invoiceUrl:  { type:String},
    
    
    status: {
         type:String, enum:Object.values(PAYMENT_STATUS),
         default:PAYMENT_STATUS.UNPAID
    },

    


 
},{
    timestamps:true,
    versionKey:false
});

export const Payment = model<IPayment>('Payment', paymentSchema);