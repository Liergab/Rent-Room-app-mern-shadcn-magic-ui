import { Request } from 'express';
import {UserType} from '../model/USER_MODEL'
export interface AuthenticatedRequest extends Request {
    user?: Omit<UserType, 'password'> | null;
}