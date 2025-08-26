
import { Request, Response } from 'express';

import { TourService } from './tour.service';
import { sendResponse } from '../../../utils/sendResponse';
import { catchAsnc } from "../../../utils/catchAsync";

const createTour = catchAsnc(async (req: Request, res: Response) => {

  
    const result = await TourService.createTour(req.body);
    sendResponse(res, {
        statusCode: 201,
        sucess: true,
        message: 'Tour created successfully',
        data: result,
    });
});

const getAllTours = catchAsnc(async (req: Request, res: Response) => {

    const query= req.query

     console.log(req.query)

    


   


    const{data,meta} = await TourService.getAllTours(  query as Record<string,string> );

   

    
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: 'Tours retrieved successfully',
        data,
        meta
       
        
    });
});

const updateTour = catchAsnc(async (req: Request, res: Response) => {

    const result = await TourService.updateTour(req.params.id, req.body);
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: 'Tour updated successfully',
        data: result,
    });
});

const deleteTour = catchAsnc(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTour(id);
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: 'Tour deleted successfully',
        data: result,
    });
});
const getAllTourTypes = catchAsnc(async (req: Request, res: Response) => {
    const result = await TourService.getAllTourTypes();
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: 'Tour types retrieved successfully',
        data: result,
    });
});


const createTourType = catchAsnc(async (req: Request, res: Response) => {
      
    const { name } = req.body;
    const result = await TourService.createTourType(req.body);
    sendResponse(res, {
        statusCode: 201,
        sucess: true,
        message: 'Tour type created successfully',
        data: result,
    });
});

const updateTourType = catchAsnc(async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    const result = await TourService.updateTourType(id, name);
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: 'Tour type updated successfully',
        data: result,
    });
});
const deleteTourType = catchAsnc(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourService.deleteTourType(id);
    sendResponse(res, {
        statusCode: 200,
        sucess: true,
        message: 'Tour type deleted successfully',
        data: result,
    });
});

export const TourController = {
    createTour,
    getAllTours,
    createTourType,
    getAllTourTypes,
    deleteTourType,
    updateTourType,
 
    updateTour,
    deleteTour,
};