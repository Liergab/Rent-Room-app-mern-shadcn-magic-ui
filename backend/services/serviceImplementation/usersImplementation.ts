import { UserType } from "../../model/USER_MODEL";
import { UsersServices } from "../usersServices";
import UsersRepository from "../../repository/usersRepository";
import { comparedPassword, hashPassword } from "../../config/bcrypt";
import generateToken from "../../utils/generateToken";

class UsersImplementation {
    // async getAllUsers(): Promise<UserType[]> {
    //     return
    // }
    // async getUserById(id: string): Promise<UserType | null> {
    //     return
    // }
    async registerUser(user: Partial<UserType>):Promise<{token:string, user:UserType}> {
        const userExist = await UsersRepository.findByEmail(user.email!)

        if(userExist){
            throw new Error('Email Already Exist!')
        }
        user.password = await hashPassword(user.password!)
        const newUser = await UsersRepository.register(user);
        const token = await generateToken(newUser.id); 

        return {token , user:newUser}
        
    }
    // async updateUserById(id: string, update: Partial<UserType>): Promise<UserType | null> {
    //     return
    // }

    // async deleteUserById(id: string): Promise<UserType | null> {
    //     return
    // }

    async login(email: string, password: string): Promise< {token:string, user:UserType}> {
        const user = await UsersRepository.findByEmail(email)

        if(!user){
            throw new Error('Invalid email or password')
        }

        const isPasswordValid = await comparedPassword(password, user.password)

        if(!isPasswordValid){
            throw new Error('Invalid email or password')
        }
        const token = await generateToken(user.id)
        const { password: _, ...userWithoutPassword } = user.toObject();

        return {token , user: userWithoutPassword}
    }

}

export default new UsersImplementation();