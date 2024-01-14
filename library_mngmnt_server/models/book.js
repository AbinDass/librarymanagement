import mongoose from "mongoose";

const bookschema = new mongoose.Schema(
    {
        ISBN: {
            type: String,
        },
        bookname: {
            type: String,
        },
        author: {
            type: String,
        },
        publisher: {
            type: String,
        },
        image: {
            type: String,
        },
        summury: {
            type: String,
        },
        year: {
            type: String,
        },
        price: {
            type: Number,
        },
        bookPublished: {
            type: Date,
        },
        available: {
            type: Number,
        },
    },
    { timestamps: true }
);

const book = mongoose.model("Book", bookschema);
export default book;
