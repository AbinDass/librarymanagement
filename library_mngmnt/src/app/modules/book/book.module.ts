import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BooklistComponent } from './components/booklist/booklist.component';
import { AddbookComponent } from './components/addbook/addbook.component';
import { EditbookComponent } from './components/editbook/editbook.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BookCardsComponent } from './components/book-cards/book-cards.component';

@NgModule({
  declarations: [
    BookComponent,
    BooklistComponent,
    AddbookComponent,
    EditbookComponent,
    BookCardsComponent,
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
})
export class BookModule {}
