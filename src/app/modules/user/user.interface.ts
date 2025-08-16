import { Types } from "mongoose";

  
export interface IAuthProvider{

    provider:'google'|'credentials';
    providerId:string
}

export enum Role{
    SUPER_ADMIN='SUPER_ADMIN',
    ADMIN='ADMIN',
    USER='USER',
    GUIDE='GUIDE'
}
export enum IsActive{
    ACTIVE='ACTIVE',
    INACTIVE='INACTIVE',
    BLOCKED='BLOCKED'
}


   export interface IUser{

name: string;


email: string;


password?:string;


role: Role;


phone?: string;


picture?: string;


address?: string;


isDeleted?:boolean;


isActive?:IsActive;

isVerified?: boolean;
bookings?:Types.ObjectId[];

auths:IAuthProvider[];

guides:Types.ObjectId[]

  }