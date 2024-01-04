import mongoose from 'mongoose'

const returnedbookschema = new mongoose.Schema({
    bookId:{
        type:mongoose.Types.ObjectId,
        ref: 'Book',
        required:true
    },
    userId:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
    },
    // returnedUsers: {
    //     type: Array,
    // },
},
{ timestamps: true }
)

const returnedbook = mongoose.model("returnedBook", returnedbookschema);
export default returnedbook;