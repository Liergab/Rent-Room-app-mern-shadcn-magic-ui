import express from 'express'
import cors from 'cors'
import env from './utils/validateEnv'
import "dotenv/config"
import db from './config/db'

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.get("/api/test", (req,res) => {
    res.json({message:"hello from express endpoint"})
})

app.listen(env.PORT, () => {
    console.log("server is running in localhost:7000")
    db()
})