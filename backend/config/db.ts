import mongoose, { connection } from 'mongoose'
import env from '../utils/validateEnv'

const db = async() => {
    
    try {
        const dbConnect = await mongoose.connect(env.MONGODB_CONNECTION_STRING)
        console.log(`connected:${dbConnect.connection.host}/${dbConnect.connection.name}`)
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default db