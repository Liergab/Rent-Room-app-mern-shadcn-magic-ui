import { UserType } from "../model/USER_MODEL";

export interface UsersServices{
    getAllUsers():Promise<UserType[]>,
    getUserById(id:string):Promise<UserType | null>,
    registerUser(user:Partial<UserType>):Promise<UserType>,
    updateUserById(id:string, update:Partial<UserType>):Promise<UserType | null>
    deleteUserById(id:string):Promise<UserType | null>
    login(email:string, password:string):Promise<UserType>
}