import {NextFunction,Response, Request} from 'express'
import User, { UserType } from '../model/USER_MODEL';
import jwt, { JwtPayload } from 'jsonwebtoken'
import env from '../utils/validateEnv'


declare global{
    namespace Express{
        interface Request{
            user?: Omit<UserType, 'password'> | null;
        }
    }
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.cookies.jwt;

        if (token) {
            try {
                const decode = jwt.verify(token, env.SECRET_KEY) as JwtPayload & { id: string };
    
                const user = await User.findById(decode.id).select('-password');
                
                if (!user) {
                    res.status(401);
                    throw new Error('User not found');
                }
                req.user = user;
                next();
            } catch (error) {
                console.error('JWT Verification Error:', error);
                res.status(401).json({ message: 'Not Authorized, Invalid Token' });
            }
        } else {
            res.status(401).json({ message: 'Not Authorized, No token' });
        }
        
    } catch (error) {
        next(error)
    }
   
};

export default  authMiddleware