import { UserType } from "../../model/USER_MODEL";
import { UsersServices } from "../usersServices";
import UsersRepository from "../../repository/usersRepository";
import { hashPassword } from "../../config/bcrypt";

class UsersImplementation {
    // async getAllUsers(): Promise<UserType[]> {
    //     return
    // }
    // async getUserById(id: string): Promise<UserType | null> {
    //     return
    // }
    async registerUser(user: Partial<UserType>):Promise<UserType> {
        const userExist = await UsersRepository.findByEmail(user.email!)

        if(userExist){
            throw new Error('Email Already Exist!')
        }

        user.password = await hashPassword(user.password!)

        return UsersRepository.register(user)

        
    }
    // async updateUserById(id: string, update: Partial<UserType>): Promise<UserType | null> {
    //     return
    // }

    // async deleteUserById(id: string): Promise<UserType | null> {
    //     return
    // }

    // async login(email: string, password: string): Promise<{ token: string; user: UserType; }> {
    //     return
    // }

}

export default new UsersImplementation();