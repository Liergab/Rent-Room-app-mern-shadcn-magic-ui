import { NextFunction, Request, Response } from "express"
import generateToken from "../utils/generateToken"
import UsersImplementation from "../services/serviceImplementation/usersImplementation"


export const register = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const{email, password, firstName, lastName} = req.body

        if(!email || !password || !firstName || !lastName){
            res.status(400)
            throw new Error('All Fields are required!')
        }

        const {token, user} = await UsersImplementation.registerUser(req.body)
        

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000, 
        })

        res.status(200).json({message:"successfully Registered"})

    } catch (error:any) {

        if (error.message === 'Email Already Exist!') {
            res.status(409); 
        } 
        next(error)
    }
}