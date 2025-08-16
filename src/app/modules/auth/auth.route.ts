import { Router } from "express"
import { AutControllers } from "./auth.controll"








const  router=Router()

router.post('/login', AutControllers.credentialsLogin)



export const AuthRoutes=router