import { Book } from "../models/book";
import { user } from "../models/user";

export interface appStateInterface{
    userAuthentication:user,
    bookStorage:Book
}