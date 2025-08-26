import { model, Schema } from "mongoose";
import { IDivision } from "./division.interface";

const divisionSchema = new Schema<IDivision>({


  name: { type: String, required: true ,unique:true },
  slug: { type: String },
  description: { type: String},
  thumbnail: {type: String },
} ,{
    timestamps:true,
    versionKey:false
});

divisionSchema.pre("save", async function (next) {
    if (!this.slug && this.name) {
        let baseSlug = this.name.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}-division`;

        let counter = 1;
        while (await Division.exists({ slug })) {
            slug = `${baseSlug}-division-${counter++}`;
        }

        this.slug = slug;


    }
    next();
});

divisionSchema.pre("findOneAndUpdate", async function (next) {

     const update= this.getUpdate() as Partial<IDivision>

      if (update.name) {
        let baseSlug = update.name.toLowerCase().split(" ").join("-");
        let slug = `${baseSlug}-division`;

        let counter = 1;
        while (await Division.exists({ slug })) {
            slug = `${baseSlug}-division-${counter++}`;
        }

        this.setUpdate({ ...update, slug });
    }
 


    
    
    next();
});
   
 export const Division = model<IDivision>('Division',  divisionSchema);