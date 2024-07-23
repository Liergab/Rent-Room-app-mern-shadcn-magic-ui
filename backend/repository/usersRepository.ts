import User, {UserType} from "../model/USER_MODEL";


class UsersRepository {

    async findAll():Promise<UserType[]>{
        return User.find().exec()
    }

    async findById(id:string):Promise<UserType | null>{
        return User.findById(id).exec()
    }

    async findByEmail (email:string):Promise<UserType | null>{
        return User.findOne({email}).exec()
    }

    async register (user: Partial<UserType>):Promise<UserType>{
        return User.create(user)
    }

    async updateById(id:string, update:Partial<UserType>):Promise<UserType | null>{
        return User.findByIdAndUpdate(id,update,{new:true}).exec()
    }

    async deleteById(id:string):Promise<UserType | null>{
        return User.findByIdAndDelete(id)
    }
}

export default new UsersRepository()