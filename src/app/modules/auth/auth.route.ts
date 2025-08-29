import { NextFunction, Response,Request, Router } from "express"
import { AutControllers } from "./auth.controll"
import { chekAuth } from "../../../middlewares/checkAuth"
import { Role } from "../user/user.interface"
import  passport from "passport"
import { enVars } from "../../../config/env"



const  router=Router()
router.post('/login', AutControllers.credentialsLogin)

router.get('/google',  (req:Request,res:Response,next:NextFunction)=>{

 const redirect= req.query.redirect || '/';


    passport.authenticate("google",  { scope: ["profile", "email"], state:redirect as string})(req,res)



})
router.get('/google/callback', passport.authenticate('google',{failureRedirect:`${enVars.FRONTEND_URL}/login?error=Threre is some error with your account.Please contact to support team `}), AutControllers.googleCallbackController)



router.post('/refresh-token', AutControllers.getNewAccessToken)
router.post('/logout', AutControllers.logout)

router.post('/set-password', chekAuth(...Object.values(Role)), AutControllers.setPassword)
router.post('/forgot-password', AutControllers.forgotPassword)
router.post('/reset-password', chekAuth(...Object.values(Role)), AutControllers.resetPassword)




export const AuthRoutes=router