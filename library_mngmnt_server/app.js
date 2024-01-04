import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import adminRoutes from './routes/adminRoutes.js'
import morgan from 'morgan'
import {lybraryDb} from './config/dbConnection.js'
const app = express()
dotenv.config({ path: "./.env" });


app.use(cors());
app.use(morgan('dev'))

app.use(express.json({ limit: "2MB" }));
app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRoutes)
app.use('/api', userRoutes)
app.use('/admin', adminRoutes)

lybraryDb.then(()=> console.log(`library database connected successfully`)).catch((err)=> console.log(`something went wrong , error is ${err}`))
const PORT = process.env.PORT ? process.env.PORT : 8000
app.listen(PORT, (error)=>{
    if(!error)console.log(`server running on port ${PORT}`)
    else console.log(error)
})
