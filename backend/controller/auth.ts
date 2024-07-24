import { Request, Response, NextFunction } from "express"
import UsersImplementation from "../services/serviceImplementation/usersImplementation"
import { AuthenticatedRequest } from "../types/express"

export const login = async(req:Request,res:Response, next:NextFunction) => {
    try {
        const{email, password} = req.body

        if(!email || !password){
            res.status(400)
            throw new Error('All fields Required!')
        }

        const{token, user} = await UsersImplementation.login(email, password)
       
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000, 
        })

        res.status(200).json({token, message:"Successfully Login!", data:user})

    } catch (error:any) {
        if (error.message === 'Invalid email or password') {
            res.status(409); 
        } 
        next(error)
    }
    
}


export const verifyToken = async(req:AuthenticatedRequest, res:Response, next:NextFunction)=> {
    res.status(200).json(req.user)
}