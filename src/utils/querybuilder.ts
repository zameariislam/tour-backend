import { Query } from "mongoose";
import { excludedFields } from "../app/constrant";

 export  class ModelQuery<T>{
        public modelQuery:Query<T[], T>;


    public readonly query:Record<string,string>;


     constructor(modelQuery:Query<T[], T>, query:Record<string,string>){
        this.modelQuery=modelQuery;

        this.query=query;

     }

      filter(){

         const  filter={...this.query}
         
         for( const field of excludedFields){
            delete  filter[field]
         }
         this.modelQuery= this.modelQuery.find(filter);
         
         return this



      }

       search(searchableFields:string[]):this{

           const searchTerm=this.query.searchTerm || '';

         
       const searchQuery= {
         $or:searchableFields.map(searchableField=>{

        return { [searchableField]:{ $regex: searchTerm, $options: "i" } }

       } )
         
    }  



      this.modelQuery= this.modelQuery.find(searchQuery);
         
         return this
         

      }


      
       sort():this{

           const sort=this.query.sort || '-createdAt';


     


      this.modelQuery= this.modelQuery.sort(sort);
         
         return this
         

      }

       fields():this{

             const fields=this.query.fields?.split(',').join(' ') || ' ';


     


      this.modelQuery= this.modelQuery.select(fields);
         
         return this
         

      }

        paginate():this{


    const limit=Number(this.query.limit) ||0;
       const page=Number(this.query.page) ||1;
       const skip =(Number(page)-1)*limit ||0;


     


      this.modelQuery= this.modelQuery.skip(skip).limit(limit);
         
         return this
         

      }

      build(){

        return this.modelQuery

      }

     async getMeta(){

         const totalDocuments = await this.modelQuery.model.countDocuments();
           const page= Number(this.query.page)||1;
             const limit= Number(this.query.limit)||5;

           const totalPage= Math.ceil(totalDocuments/Number(this.query.limit))
          




     return{
         page,
        limit,
        totalPage,
        total:totalDocuments
     }

   


      }



  }
