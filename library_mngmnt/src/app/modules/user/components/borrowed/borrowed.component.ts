import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/modules/book/service/book.service';

@Component({
  selector: 'app-borrowed',
  templateUrl: './borrowed.component.html',
  styleUrls: ['./borrowed.component.css']
})
export class BorrowedComponent implements OnInit {
  userid!:string|null;
  borrowedBooks!:Book[]
  constructor(private bookService:BookService,private router:Router){}
  ngOnInit(): void {
    this.userid = localStorage.getItem('userid')
    this.getBorrowedBooks()
  }

  getBorrowedBooks(){
    this.bookService.allborrowedItems(this.userid).subscribe(data => {
      
      this.borrowedBooks = data
      console.log(this.borrowedBooks,789)
    })
  }

  returnBook(bookid:string){
    this.bookService.returnBook(bookid,this.userid).subscribe(data => {
      if(data) this.router.navigate(['userhome'])
    })
  }
}
