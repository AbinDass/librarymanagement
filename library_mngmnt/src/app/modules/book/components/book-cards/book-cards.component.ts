import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userDataSelector } from 'src/app/modules/auth/authState/auth.selector';
import { BookService } from '../../service/book.service';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-cards',
  templateUrl: './book-cards.component.html',
  styleUrls: ['./book-cards.component.css'],
})
export class BookCardsComponent implements OnInit {
  admin: boolean = false;
  user: boolean = false;
  isAdmin$ = this.store.select(userDataSelector);
  allBooks: Book[] = [];
  role!: string;
  userid!: string | null;
  isborrowed:boolean = false
  constructor(
    private store: Store,
    private bookService: BookService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.role = localStorage.getItem('userrole')!;
    this.isAdmin$.subscribe((data) => {
      if (data.role === 'admin' || this.role === 'admin') {
        this.admin = true;
      } else if (data.role === 'user' || this.role === 'user') {
        this.user = true;
      }
    });

    this.getAllbooks();
  }
  getAllbooks(): void {
    this.bookService.allBooks().subscribe((data) => {
      this.allBooks = data.book;
    });
  } 
  returnBook(bookid:string){

  }

  borrowBook(bookid: string) {
   this.userid = localStorage.getItem('userid');

  this.bookService.borrowBook(bookid, this.userid).subscribe(
    (response: any) => {
      // Log the entire response to inspect its content
      console.log('Response:', response);

      // Assuming there's a property 'message' in the response body
      if (response?.message === 'exist') {
        alert('Sorry, already exists in your list.');
      }else if (response?.limit){
        alert(`  reached your borrow limit `)
      }
       else {
        this.isborrowed = true;
        this.router.navigate(['/userhome/borrow']);
      }
    },
    (error) => {
      // Handle other errors
      console.error('Error:', error);
    }
  );
  }
}
