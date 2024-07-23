import express    from 'express'
import cors       from 'cors'
import env        from './utils/validateEnv'
import db         from './config/db'
import rootRouter from './routes'

import { errorValidation, pathNotFound } from './middleware/errorMiddleware'
import "dotenv/config"

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use(rootRouter)
app.use(pathNotFound)
app.use(errorValidation)


app.listen(env.PORT, () => {
    console.log("server is running in localhost:7000")
    db()
})