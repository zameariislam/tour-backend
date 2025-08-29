import { Request, Response } from "express";
import { catchAsnc } from "../../../utils/catchAsync";
import { sendResponse } from "../../../utils/sendResponse";
import { OTPService } from "./otp.service";



const sendOTP = catchAsnc(async (req: Request, res: Response) => {
    const { email, name } = req.body
    await OTPService.sendOTP(email, name)
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: "OTP sent successfully",
        data: null,
    });
})

const verifyOTP = catchAsnc(async (req: Request, res: Response) => {
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