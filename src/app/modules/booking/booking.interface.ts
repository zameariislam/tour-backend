import { Types } from "mongoose";


export enum BOOKING_STATUS{
   PENDING='PENDING',
   CANCELED='CANCELED',

    FAILED=' FAILED',
     COMPLETD='COMPLETED',

  
}


export interface IBooking{



user: Types.ObjectId;


tour: Types.ObjectId;


guestCount: number;


status: BOOKING_STATUS;


payment?: Types.ObjectId;
   


  }