import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as bookActions from './book.action';
import { BookService } from '../service/book.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { Book } from 'src/app/models/book';

export class bookEffects{

    constructor(
        private action$: Actions,
        private bookService: BookService,
        private router: Router,
        private store: Store
    
      ) {}


      bookRequest = createEffect(() =>
        this.action$.pipe(
          ofType(bookActions.bookRequested),
          switchMap((action) =>
            this.bookService.allBooks().pipe(
              map((data) => bookActions.bookSuccess({ book: data.book }))
            )
          )
        )
      );

}