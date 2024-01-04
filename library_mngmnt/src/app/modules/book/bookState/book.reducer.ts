import { createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/models/book';
import { bookRequested, bookSuccess } from './book.action';

const initialState: Book = {
  bookname: '',
  author: '',
  image: '',
  price: 0,
  available: 0,
  year: null,
  borrowedUsers: [],
  _id: '',
};

export const bookReducer = createReducer(
  initialState,
  on(bookRequested, (state, action) => ({ ...state })),
  on(bookSuccess, (state, { book }) => ({ ...state, ...book }))
);
