interface Book {
    _id: string;
    bookname: string;
    ISBN:string;
    author: string;
    image:string;
    year: string;
    price: number;
    available: number;
    createdAt: string;
    updatedAt: string;
    __v: number;    
  }
  
  interface User {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    role: string;
    password: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  
  export interface BookTransaction {
    bookId: string;
    book: Book;
    user: User;
    isReturned: boolean;
  }