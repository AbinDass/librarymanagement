import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book, BorrowResponse } from 'src/app/models/book';
import { BookTransaction } from 'src/app/models/transaction';
import { transactiondUser, user } from 'src/app/models/user';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl:string = 'http://localhost:8000/admin'
  baseUrlUser:string = 'http://localhost:8000/api'
  constructor(private http:HttpClient) { }

  createBook(bookData: Book, bookImg:string|null): Observable<Book> {
    console.log(bookData, bookImg)
    return this.http.post<Book>(`${this.baseUrl}/addbook`, {bookData,bookImg});
  }

  updateBook(bookData:Book, bookid:string, bookImg:string|null): Observable<Book>{
   return this.http.post<Book>(this.baseUrl+ `/updatebook?bookid=${bookid}`,{ bookData, bookImg})
  }

  deleteBook(bookData:Book, bookid:string){
    this.http.post<Book>(this.baseUrl+ `/updatebook?bookid=${bookid}`, bookData)
  }


  allBooks(): Observable<{ book: Book[] }> {
    return this.http.get<{ book: Book[] }>(this.baseUrl+ `/allbooks`);
  }

  singleBook(bookid:string):Observable<Book>{
    return this.http.get<Book>(this.baseUrl+ `/singlebook?bookid=${bookid}`)
  }

  borrowBook(bookid: string, userid: string | null) {
    return this.http.post<BorrowResponse|{}|{message:string}>(this.baseUrlUser + `/borrowbook`, { bookid, userid });
  }

  allborrowedItems(userid:string|null){
    return this.http.get<Book[]>(this.baseUrlUser + `/allborrowbooks?userid=${userid}`)
  }

  returnBook(bookid: string, userid: string | null) {
    return this.http.post<BorrowResponse|{}>(this.baseUrlUser + `/returnbooks`, { bookid, userid });
  }

  singlebookTransaction(bookid:string){
      return this.http.get<{borrowedUsers:transactiondUser[], returnedUsers:transactiondUser[]}>(this.baseUrl+`/transaction?bookid=${bookid}`)
  }
  
  allTransactions(){
    return this.http.get<BookTransaction[]>(this.baseUrl+ `/all-transaction`)
  }
}
