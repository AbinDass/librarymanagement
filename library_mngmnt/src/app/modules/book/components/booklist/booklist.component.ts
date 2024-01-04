import { Component, OnInit } from '@angular/core';
import { BookService } from '../../service/book.service';
import { Store } from '@ngrx/store';
import { appStateInterface } from 'src/app/appStore/appState';
import { bookRequested } from '../../bookState/book.action';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit{
  constructor(private bookService:BookService , private store:Store<appStateInterface>){}
  role!:string|null
ngOnInit(): void {
  this.store.dispatch(bookRequested());
 this.role = localStorage.getItem('userrole')
}
}
