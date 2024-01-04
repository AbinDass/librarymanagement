import Express  from "express";
import { allBooks, createBook, deleteBook, getBookUsers, getallTransaction, singleBook, updateBook } from "../controllers/bookControl.js";
import { getAllUsers, updateUser } from "../controllers/userControl.js";
import { verifyToken } from "../middleware/varifyToken.js";

const router = Express.Router()
router.get('/allbooks',verifyToken, allBooks)
router.post('/addbook', createBook)
router.post('/updatebook',verifyToken, updateBook)
router.post('/deletebook',verifyToken, deleteBook)
router.get('/singlebook',verifyToken, singleBook)
router.get('/transaction',verifyToken, getBookUsers)
router.get('/all-transaction',verifyToken, getallTransaction)

router.get('/allusers',verifyToken, getAllUsers)
router.get('/singleuser',verifyToken, getAllUsers)
router.post('/updateuser',verifyToken, updateUser)
export default  router;