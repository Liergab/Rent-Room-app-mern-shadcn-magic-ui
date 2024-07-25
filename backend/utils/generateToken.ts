import jwt from 'jsonwebtoken'
import env from './validateEnv'


const generateToken = async(id:string):Promise<string> => {
 return   jwt.sign({id}, env.SECRET_KEY,{expiresIn:'30d'})
}

export default generateToken