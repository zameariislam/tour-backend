import { Request, Response } from "express";


import { DivisionService } from "./division.service";

import { sendResponse } from "../../../utils/sendResponse";
import { catchAsnc } from "../../../utils/catchAsync";

const createDivision = catchAsnc(async (req: Request, res: Response) => {

    console.log('create division')
    
    const result = await DivisionService.createDivision(req.body);



   
    sendResponse(res, {
        statusCode: 201,
          sucess:true,
        message: "Division created",
        data: result,
    });
});

const getAllDivisions = catchAsnc(async (req: Request, res: Response) => {
    const result = await DivisionService.getAllDivisions();
    sendResponse(res, {
        statusCode: 200,
         sucess:true,
        message: "Divisions retrieved",
        data: result.data,
        meta: result.meta,
    });
});

const getSingleDivision = catchAsnc(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await DivisionService.getSingleDivision(slug);

     console.log('result',result)
    sendResponse(res, {
        statusCode: 200,
        sucess:true,
        message: "Divisions retrieved",
        data: result.data,
    });
});

const updateDivision = catchAsnc(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await DivisionService.updateDivision(id, req.body);
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: "Division updated",
        data: result,
    });
});

const deleteDivision = catchAsnc(async (req: Request, res: Response) => {
    const result = await DivisionService.deleteDivision(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: "Division deleted",
        data: result,
    });
});

export const DivisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};