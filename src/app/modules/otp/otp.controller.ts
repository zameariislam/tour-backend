import { Request, Response } from "express";
import { catchAsnc } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { OTPService } from "./otp.service";



const sendOTP = catchAsnc(async (req: Request, res: Response) => {
    const { email } = req.body

    

     console.log('email from backendss controller',email)
    await OTPService.sendOTP(email)
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: "OTP sent successfully",
        data: null,
    });
})

const verifyOTP = catchAsnc(async (req: Request, res: Response) => {
    console.log('hello from verify otp')
    const { email, otp } = req.body;
  await OTPService.verifyOTP(email, otp)

    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: "OTP verified successfully",
        data: null,
    });
})

export const OTPController = {
    sendOTP,
    verifyOTP
};