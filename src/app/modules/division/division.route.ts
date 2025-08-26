import { Router } from "express";
import { chekAuth } from "../../../middlewares/checkAuth";

import { Role } from "../user/user.interface";
import { DivisionController } from "./division.controller";
import {
    createDivisionSchema,
    updateDivisionSchema,
} from "./division.validation";
import { validateRequest } from "../../../middlewares/validateRequest";

const router = Router()

router.post(
    "/create",
    chekAuth (Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createDivisionSchema),
    DivisionController.createDivision
);
router.get("/", DivisionController.getAllDivisions);

router.get("/:slug", DivisionController.getSingleDivision)

router.patch(
    "/:id",
    chekAuth (Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(updateDivisionSchema),
    DivisionController.updateDivision
);
router.delete("/:id", chekAuth (Role.ADMIN, Role.SUPER_ADMIN), DivisionController.deleteDivision);

export const DivisionRoutes = router