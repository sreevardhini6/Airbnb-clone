import express from 'express'
import cors from 'cors'
import { mainRouter } from './routes'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())


app.use('/api/v1', mainRouter)

mongoose.connect(process.env.MONGO_URL as string)
.then(() => {
    console.log(`DataBase Connected at ${process.env.MONGO_URL}`)
})
.catch(err => console.error(err))


app.listen(process.env.PORT,() => {
    console.log(`server listening to port ${process.env.PORT}`)
})
