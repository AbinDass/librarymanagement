import mongoose from "mongoose";
import { bookSchemaValidator } from "../config/joyValidation.js";
import bookDb from "../models/book.js";
import borrowDb from "../models/borrowedBook.js";
import returnDb from "../models/returnedBook.js";
import {Types} from 'mongoose'
export const createBook = async (req, res) => {
    try {
        const { bookname, author, price, year, available } = req.body.bookData;
        const image = req.body.bookImg;
        const bookExist = await bookDb.findOne({ bookname: bookname });
        console.log(`ivde`);
        if (!bookExist) {
            const newBook = new bookDb({
                bookname,
                author,
                image,
                price,
                year,
                available,
            });
            newBook.save().then(() => {
                res.status(200).json({ book: newBook });
            });
        } else {
            res.status(409).json({ error: "book already exist" });
        }
    } catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
};

export const updateBook = async (req, res) => {
    try {
        const bookid = req.query.bookid;
        // const validateBook = bookSchemaValidator.validate(req.body);
        // if (validateBook.error) {
        //     return res.status(400).json({ message: "Validation error", error: validationResult.error.message });
        // }
        const existbook = await bookDb.findOne({ _id: bookid });
        console.log(req.body, 111111, bookid);
        const { bookname, author, price, available, year } = req.body.bookData;
        const image = req.body.bookImg;
        if (existbook) {
            const updatedBook = await bookDb.findByIdAndUpdate(
                bookid,
                {
                    $set: {
                        bookname,
                        author,
                        image,
                        price,
                        year,
                        available,
                    },
                },
                { new: true }
            );
            res.status(200).json({ book: updatedBook });
        } else {
            res.status(404).json({ error: `book not found` });
        }
    } catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const bookid = req.params.id;
        const deletedBook = await bookDb.findByIdAndDelete({ _id: bookid });
        res.status(200).json(deletedBook);
    } catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
};

export const allBooks = async (req, res) => {
    try {
        const books = await bookDb.find({});
        res.status(200).json({ book: books });
    } catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
};

export const singleBook = async (req, res) => {
    try {
        const bookid = req.query.bookid;
        const Book = await bookDb.findById({ _id: bookid });
        console.log(bookid, Book);
        res.status(200).json(Book);
    } catch (error) {
        res.status(500).json({ error: error, message: `internal server error` });
    }
};

export const borrow = async (req, res) => {
    try {
        const bookId = req.body.bookid;
        const userId = req.body.userid;

        if (!bookId || !userId) {
            return res.status(400).json({ message: "Both bookId and userId are required." });
        }
        // taking count of array
       let count =  await borrowDb.countDocuments({userId})
       if(count === 5) {
        res.status(200).json({limit:`limit-reached`})
       }
        // Check if the book is already borrowed by the user
        const existingBorrow = await borrowDb.findOne({ bookId, userId });

        if (existingBorrow) {
            return res.status(200).json({ existingBorrow, message: "exist" });
        }

        const borrowedBook = new borrowDb({
            bookId: bookId,
            userId: userId,
        });

        await borrowedBook.save();

        const book = await bookDb.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        // Decrease available count only if the book is successfully borrowed
        book.available -= 1;
        const result = await book.save();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong" });
    }
};

export const getBorrowedBooksByUserId = async (req, res) => {
    try {
        const userId = req.query.userid;
        // Find borrowed books with the specified userId and populate the 'bookId' field
        const borrowedBooks = await borrowDb.find({ userId }).populate("bookId").exec();

        // Extract the populated books from the result
        const populatedBooks = borrowedBooks.map((borrowedBook) => borrowedBook.bookId);

        res.status(200).json(populatedBooks);
    } catch (error) {
        res.status(500).json({ error: error, message: "Internal server error" });
    }
};

export const returnBook = async (req, res) => {
    try {
        const bookId = req.body.bookid;
        const userId = req.body.userid;

        if (!bookId || !userId) {
            return res.status(400).json({ message: "Both bookId and userId are required." });
        }

        // Check if the book is borrowed by the user
        const existingBorrow = await borrowDb.findOne({ bookId, userId });

        if (!existingBorrow) {
            return res.status(404).json({ message: "Book is not borrowed by the user." });
        }

        // Delete the borrowed record
        const deletedData = await borrowDb.deleteOne({ _id: existingBorrow._id });
        if (deletedData) {
            
                // Save the returned book record
                const returnBook = new returnDb({
                    bookId: bookId,
                    userId: userId,
                });

                await returnBook.save();
            
        }
        const book = await bookDb.findById(bookId);

        if (!book) {
            return res.status(404).json({ message: "Book not found." });
        }

        // Increase available count only if the book is successfully returned
        book.available += 1;
        console.log(book)
        const result = await book.save();

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Something went wrong" });
    }
};

export const getBookUsers = async (req, res) => {
    try {
        let bookId = req.query.bookid;
        if (!bookId) {
            return res.status(400).json({ message: "BookId is required." });
        }
        // bookId = new Types.ObjectId(bookId)

        // Fetch borrowed users
        const borrowedUsers = await borrowDb.find({ bookId }).populate('userId');
        // Fetch returned users
        const returnedUsers = await returnDb.find({ bookId }).populate('userId');
        res.status(200).json({ borrowedUsers, returnedUsers });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message, message: "Something went wrong" });
    }
};


export const getallTransaction = async (req, res) => {
    try {
        

        const result = await borrowDb.aggregate([
           
            {
                $lookup: {
                    from: "returnedbooks",
                    localField: "bookId",
                    foreignField: "bookId",
                    as: "returnInfo"
                }
            },
            {
                $lookup: {
                    from: "books",
                    localField: "bookId",
                    foreignField: "_id",
                    as: "bookInfo"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userInfo"
                }
            },
            {
                $addFields: {
                    returned: {
                        $size: "$returnInfo"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    bookId: 1,
                    borrowed: 1,
                    book: { $arrayElemAt: ["$bookInfo", 0] },
                    user: { $arrayElemAt: ["$userInfo", 0] },
                    isReturned: { $gt: ["$returned", 0] }
                }
            }
        ]);

        res.status(200).json(result);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message, message: "Something went wrong" });
    }
};





