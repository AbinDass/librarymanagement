import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models/book';

export const bookRequested = createAction(
  '[book] bookRequested',
);

export const bookSuccess = createAction(
  '[book] bookSuccess',
  props<{ book: Book[] }>()
);
