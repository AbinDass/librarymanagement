import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({path:'./.env'})
export const lybraryDb = mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})