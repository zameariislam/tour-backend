import { IAuthProvider, Role } from "../app/modules/user/user.interface"
import { User } from "../app/modules/user/user.model"
import { enVars } from "../config/env"

import bcrypt from 'bcrypt'


export const seedSuperAdmin= async()=>{

    try{


         const isSuperAdminExist= await User.findOne({email:enVars.SUPER_ADMIN_EMAIL})

    if(isSuperAdminExist){
        console.log('Super admin is Already Exist !!!')
        return
    }

    console.log('Trying to create super admin')

    const authProvider:IAuthProvider={
        provider:'credentials',
        providerId:enVars.SUPER_ADMIN_EMAIL
    }

    const hashedPassword= await bcrypt.hash(enVars.SUPER_ADMIN_PASSWORD, Number(enVars.BCRYPT_SALT_ROUND))

     const payload={
        name:'Super Admin',
        email:enVars.SUPER_ADMIN_EMAIL,
        
        password:hashedPassword,
        auth:[authProvider],
        role:Role.SUPER_ADMIN,
        isVerified:true
     }

      const superAdmin= await User.create(payload)
      console.log('super admin created successfully')
      console.log('superAdmin',superAdmin)




    }catch(err){
          console.log(err)

    }

   
}