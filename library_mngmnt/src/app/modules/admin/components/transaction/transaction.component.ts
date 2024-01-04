import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { transactiondUser, user } from 'src/app/models/user';
import { BookService } from 'src/app/modules/book/service/book.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  bookid!:string
  borrowedUser!:transactiondUser[]
  returnedUser!:transactiondUser[]
  constructor(private routes:ActivatedRoute,private bookService:BookService){}
ngOnInit(): void {
  this.routes.paramMap.subscribe((param) => {
    this.bookid = param.get('bookid')!; 
  }); 
  this.getTransaction()
}

getTransaction(){
this.bookService.singlebookTransaction(this.bookid).subscribe(data => {
  this.borrowedUser = data.borrowedUsers;
  this.returnedUser = data.returnedUsers;
  console.log(this.returnedUser,7777)
});
}
}
