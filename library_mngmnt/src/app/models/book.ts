export interface Book {
  ISBN:string;
  bookname: string;
  author: string;
  publisher:string
  image: string;
  summury:string;
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
  ISBN:string,
  bookname: string;
  author: string;
  publisher:string;
  image: string;
  summury:string;
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
