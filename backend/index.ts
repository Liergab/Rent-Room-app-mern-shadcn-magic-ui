import express    from 'express'
import cors       from 'cors'
import env        from './utils/validateEnv'
import db         from './config/db'
import rootRouter from './routes'
import cookieParser from 'cookie-parser'
import { errorValidation, pathNotFound } from './middleware/errorMiddleware'
import "dotenv/config"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))


app.use(rootRouter)
app.use((req, res, next) => {
    console.log('Cookie:', req.cookies['auth-token']); // Log the cookie value
    next();
  });
app.use(pathNotFound)
app.use(errorValidation)


app.listen(env.PORT, () => {
    console.log("server is running in localhost:7000")
    db()
})