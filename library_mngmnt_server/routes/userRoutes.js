import Express  from "express";
import { borrow, getBorrowedBooksByUserId, returnBook } from "../controllers/bookControl.js";
import { verifyToken } from "../middleware/varifyToken.js";

const router = Express.Router()
router.post('/borrowbook',verifyToken, borrow)
router.get('/allborrowbooks',verifyToken, getBorrowedBooksByUserId)
router.post('/returnbooks',verifyToken, returnBook)
export default  router;