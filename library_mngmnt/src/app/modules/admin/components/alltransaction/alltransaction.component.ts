import { Component, OnInit } from '@angular/core';
import { BookTransaction } from 'src/app/models/transaction';
import { BookService } from 'src/app/modules/book/service/book.service';

@Component({
  selector: 'app-alltransaction',
  templateUrl: './alltransaction.component.html',
  styleUrls: ['./alltransaction.component.css']
})
export class AlltransactionComponent implements OnInit {
constructor(private bookService:BookService){}
transactions:BookTransaction[] = []
ngOnInit(): void {
  this.bookService.allTransactions().subscribe(data => this.transactions = data)
}
}
