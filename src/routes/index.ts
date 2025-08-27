import { Router } from "express";
import { UserRoutes } from "../app/modules/user/user.route";
import { AuthRoutes } from "../app/modules/auth/auth.route";
import { DivisionRoutes } from "../app/modules/division/division.route";
import { TourRoutes } from "../app/modules/tour/tour.routes";
import { BookingRoutes } from "../app/modules/booking/booking.route";
import { PaymentRoutes } from "../app/modules/payment/payment.route";


 
export const router=Router()

 const moduleRoutes=[
    {
        path:'/user',
        route:UserRoutes
    },
     {
        path:'/auth',
        route:AuthRoutes
    },
     {
        path: "/division",
        route: DivisionRoutes
    },
    {
        path: "/tour",
        route: TourRoutes
    },
     {
        path: "/booking",
        route: BookingRoutes
    },
     {
        path: "/payment",
        route: PaymentRoutes
    }
 ]



 moduleRoutes.forEach(route=>{
     router.use(route.path,route.route)
 })