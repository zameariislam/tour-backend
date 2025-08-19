import { Router } from "express"
import { AutControllers } from "./auth.controll"
import { chekAuth } from "../../../middlewares/checkAuth"
import { Role } from "../user/user.interface"



const  router=Router()

router.post('/login', AutControllers.credentialsLogin)
router.post('/refresh-token', AutControllers.getNewAccessToken)
router.post('/logout', AutControllers.logout)
router.post('/reset-password', chekAuth(...Object.values(Role)), AutControllers.resetPassword)



export const AuthRoutes=router