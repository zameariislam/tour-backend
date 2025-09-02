
 import crypto from 'crypto'
import { User } from '../user/user.model';
import { AppError } from '../../../errorHelpers/AppError';
import { redisClient } from '../../../config/redis.config';
import { sendEmail } from '../../../utils/sendEmail';

const OTP_EXPIRATION = 120 * 60 // 2minute
const generateOtp = (length = 6) => {
    //6 digit otp
    const otp = crypto.randomInt(10 ** (length - 1), 10 ** length).toString()

    // 10 ** 5 => 10 * 10 *10 *10 *10 * 10 => 1000000

    return otp
}

const sendOTP = async (email: string) => {

     console.log('hello i am fromsss',email)

    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError( "User not found", 404)
    }

    if (user.isVerified) {
        throw new AppError("You are already verified", 401 )
    }
    const otp = generateOtp();

    const redisKey = `otp:${email}`

     console.log('redis',redisKey)

    await redisClient.set(redisKey, otp, {
        expiration: {
            type: "EX",
            value: OTP_EXPIRATION
        }
    })

    await sendEmail({
        to: email,
        subject: "Your OTP Code",
        templateName: "otp",
        templateData: {
            
            otp: otp
        }
    })
};

const verifyOTP = async (email: string, otp: string) => {
    // const user = await User.findOne({ email, isVerified: false })


     console.log('hello form backendsss verify otp',email)
    const user = await User.findOne({ email })

    if (!user) {
        throw new AppError("User not found", 404 )
    }

    if (user.isVerified) {
        throw new AppError( "You are already verified", 401 )
    }

   const redisKey = `otp:${email}`

    const savedOtp = await redisClient.get(redisKey)

    if (!savedOtp) {
        throw new AppError("Invalid OTP",401 );
    }

    if (savedOtp !== otp) {
        throw new AppError("Invalid OTP",401);
    }

       await Promise.all([
        User.updateOne({ email }, { isVerified: true }, { runValidators: true }),
        redisClient.del([redisKey])
    ])

    

};

export const OTPService = {
    sendOTP,
    verifyOTP
}