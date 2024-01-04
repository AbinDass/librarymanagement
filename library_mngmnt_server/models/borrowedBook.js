import mongoose from 'mongoose'

const borrowedbookschema = new mongoose.Schema({
    bookId:{
        type:mongoose.Types.ObjectId,
        ref: 'Book',
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
    },
        
},
{ timestamps: true }
)

const borrowedbook = mongoose.model("borrowedBook", borrowedbookschema);
export default borrowedbook;