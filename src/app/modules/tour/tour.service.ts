

import { Query } from "mongoose";
import { excludedFields } from "../../constrant";
import {  tourSearchableFields } from "./tour.constrant";
import { ITour, ITourType } from "./tour.interface";
import { Tour, TourType } from "./tour.model";
import { ModelQuery } from "../../../utils/querybuilder";

const createTour = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });

     
    if (existingTour) {
        throw new Error("A tour with this title already exists.");
    }


    //  if (payload.title) {
    //         const baseSlug = payload.title.toLowerCase().split(" ").join("-")
    //         let slug = baseSlug
    
    //         let counter = 0;
    //         while (await Tour.exists({ slug })) {
    //             slug = `${slug}-${counter++}` // dhaka-division-2
    //         }
    
    //         payload.slug = slug
    //     }
    

  
    const tour = await Tour.create(payload)

    return tour;
};

// const getAllTours = async (query:Record<string,string>) => {


//      const filter=query;


//      const searchTerm=filter.searchTerm || '';
//       const sort=filter.sort || '-createdAt';
//       const fields=filter.fields?.split(',').join(' ') || ' ';
       
//       const limit=Number(filter.limit) ||0;
//        const page=Number(filter.page) ||1;
//        const skip =(Number(filter.page)-1)*limit ||0;

//         console.log( 'limit',limit, 'page',page ,'skip', skip)

      
       
    

//          for( const field of excludedFields){
//             delete  filter[field]
//          }


//      console.log('filterss', filter)
      
      
 
//        const searchQuery= {
//          $or:tourSearchableFields.map(tourSearchableField=>{

//         return { [tourSearchableField]:{ $regex: searchTerm, $options: "i" } }

//        } )
         
//     }  

// // console.log('searchTerms',searchQuery,'filter',filter)


// //   const tours = await Tour.find(searchQuery).find(filter).sort(sort).select(fields).skip(skip).limit(limit)


//  const filterQuery= Tour.find(filter);
//  const tours=filterQuery.find(searchQuery)
// const allTours= await tours.sort(sort).select(fields).skip(skip).limit(limit)
   

    

    
//     const totalTours = await Tour.countDocuments();


//       const totalPage= Math.ceil(totalTours/limit)




//      const meta={
//         page,
//         limit,
//         totalPage,
//         total:totalTours,
     
//      }


//       console.log('metra',meta)
   

  
//     return {
//         data: allTours,
//         meta
//     }
// };



//   class ModelQuery<T>{
//         public modelQuery:Query<T[], T>;


//     public readonly query:Record<string,string>;


//      constructor(modelQuery:Query<T[], T>, query:Record<string,string>){
//         this.modelQuery=modelQuery;

//         this.query=query;

//      }

//       filter(){

//          const  filter={...this.query}
         
//          for( const field of excludedFields){
//             delete  filter[field]
//          }
//          this.modelQuery= this.modelQuery.find(filter);
         
//          return this



//       }

//        search(searchableFields:string[]):this{

//            const searchTerm=this.query.searchTerm || '';

         
//        const searchQuery= {
//          $or:searchableFields.map(searchableField=>{

//         return { [searchableField]:{ $regex: searchTerm, $options: "i" } }

//        } )
         
//     }  


//       this.modelQuery= this.modelQuery.find(searchQuery);
         
//          return this
         

//       }




//   }


const getAllTours = async (query:Record<string,string>) => {

    const queryBuilder= new ModelQuery(Tour.find(),query)

     const tours=  queryBuilder
     .search(tourSearchableFields)
     .filter()
     .filter()
     .sort()
     .fields()
     .paginate()
   

  const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])


    return {
        data,
        meta
    }

  
    return {
        data: tours,
        
    }
};








const updateTour = async (id: string, payload: Partial<ITour>) => {

    const existingTour = await Tour.findById(id);

    if (!existingTour) {
        throw new Error("Tour not found.");
    }





    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

    return updatedTour;
};

const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
};


const createTourType = async (payload: ITourType) => {

    console.log('pay',payload)
    const existingTourType = await TourType.findOne(payload);

    if (existingTourType) {
         console.log('tourtype already available')
        throw new Error("Tour type already exists.");
    }

    const tourType=  await TourType.create(payload);
    return tourType
};
const getAllTourTypes = async () => {
    return await TourType.find();
};
const updateTourType = async (id: string, payload: ITourType) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    const updatedTourType = await TourType.findByIdAndUpdate(id, payload, { new: true });
    return updatedTourType;
};
const deleteTourType = async (id: string) => {
    const existingTourType = await TourType.findById(id);
    if (!existingTourType) {
        throw new Error("Tour type not found.");
    }

    return await TourType.findByIdAndDelete(id);
};

export const TourService = {
    createTour,
    getAllTours,
    createTourType,
    deleteTourType,
    updateTourType,
    getAllTourTypes,
 
    updateTour,
    deleteTour,
    
};