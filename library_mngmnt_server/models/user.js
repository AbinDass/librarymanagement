import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
    },
    role:{
        type:String,
        required:true
    },
    password: {
        type: String,
        min: 8,
    },
    confirmpassword: {
        type: String,
    },
    
},
{ timestamps: true }
)

const user = mongoose.model("User", userschema);
export default user;