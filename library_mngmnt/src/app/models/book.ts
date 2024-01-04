export interface Book {
  bookname: string;
  author: string;
  image: string;
  price: number;
  available: number;
  year: Date|null;
  borrowedUsers: Array<string>;
  _id: string;
}

export interface allBooks{
    book:Book
}

export interface bookError {
  bookname: string;
  author: string;
  image: string;
  price: string;
  available: string;
  year: string;
}

export interface BorrowResponse {
    existingBorrow: {
        _id: string;
        bookId: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
        __v: number;
    };
    message: string;
}
