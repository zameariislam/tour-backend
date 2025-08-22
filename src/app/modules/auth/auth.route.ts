import { NextFunction, Response,Request, Router } from "express"
import { AutControllers } from "./auth.controll"
import { chekAuth } from "../../../middlewares/checkAuth"
import { Role } from "../user/user.interface"
import  passport from "passport"
import { enVars } from "../../../config/env"



const  router=Router()

router.post('/login', AutControllers.credentialsLogin)

router.post('/refresh-token', AutControllers.getNewAccessToken)
router.post('/logout', AutControllers.logout)
router.post('/reset-password', chekAuth(...Object.values(Role)), AutControllers.resetPassword)
router.get('/google',  (req:Request,res:Response,next:NextFunction)=>{

 const redirect= req.query.redirect || '/';


    passport.authenticate("google",  { scope: ["profile", "email"], state:redirect as string})(req,res)



})
router.get('/google/callback', passport.authenticate('google',{failureRedirect:'/login'}), AutControllers.googleCallbackController)




export const AuthRoutes=router