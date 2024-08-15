import { NextFunction, Request, Response } from "express"
import UsersImplementation from "../services/serviceImplementation/usersImplementation"


export const register = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const{email, password, firstName, lastName} = req.body

        if(!email || !password || !firstName || !lastName){
            res.status(400)
            throw new Error('All Fields are required!')
        }

        const {token, user} = await UsersImplementation.registerUser(req.body)
        

        res.cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development', 
            sameSite: 'lax',
            maxAge: 30 * 24 * 60 * 60 * 1000, 
            path: '/',
        })

        res.status(200).json({message:"successfully Registered"})

    } catch (error:any) {

        if (error.message === 'Email Already Exist!') {
            res.status(409); 
        } 
        next(error)
    }
}

export const userAuthenticated = async(req:Request,res:Response,next:NextFunction) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        next(error)
    }
}