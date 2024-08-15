import { cleanEnv} from 'envalid';
import 'dotenv/config'
import {str,port} from 'envalid/dist/validators'
export default cleanEnv(process.env,{
    PORT:port(),
    MONGODB_CONNECTION_STRING :str(),
    SECRET_KEY:str(),
    STRIPE_API_KEY:str()
})