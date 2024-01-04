import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Book, bookError } from 'src/app/models/book';
import { BookService } from '../../service/book.service';
import { Subject, takeUntil } from 'rxjs';
import { toBase64 } from 'src/app/helper/toBase64';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css'],
})
export class AddbookComponent {
  error: bookError = {
    bookname: '',
    author: '',
    image: '',
    price: '',
    available: '',
    year: '',
  };
  bookImg!:string|null;

  bookForm!: FormGroup;
  private ngUnsubscribe = new Subject<void>();
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private bookService:BookService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.bookForm = this.fb.group({
      bookname: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      image: [null, [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      available: ['', [Validators.required, Validators.min(0)]],
      year: ['', [Validators.required]],
    });
  }

  async handleImage(event: Event) {
    let inputImg = event.target as HTMLInputElement;
    if(inputImg.files && inputImg.files.length > 0){
      this.bookImg = await toBase64(inputImg.files[0]) as string
    }
   }
 

  onSubmit(): void {
    if (this.bookForm.valid) {
      
      const formData: Book = this.bookForm.value;
      this.bookService.createBook(formData,this.bookImg)
      .subscribe((data: Book) => {
        if (data) alert(`book added succesfully `);
        this.router.navigate(['admin']);
      });
    }
  }
  bookErrors() {
    //bookname error
    const booknameControl = this.bookForm.controls['bookname'];
    const authorControl = this.bookForm.controls['author'];
    const bookimageControl = this.bookForm.controls['image'];
    const priceControl = this.bookForm.controls['price'];
    const availableControl = this.bookForm.controls['available'];
    const yearControl = this.bookForm.controls['year'];

    if (booknameControl.touched && booknameControl.invalid) {
      if (booknameControl.getError('required'))
        this.error.bookname = '  bookname is required';
      else if (booknameControl.getError('maxlength'))
        this.error.bookname = 'maximum length is 20 characters';
      else if (booknameControl.getError('minlength'))
        this.error.bookname = 'min 3 letter required';
    } else this.error.bookname = '';
    //authorname error
    if (authorControl.touched && authorControl.invalid) {
      if (authorControl.getError('required'))
        this.error.author = '  author name is required';
      else if (authorControl.getError('maxlength'))
        this.error.author = 'maximum length is 20 characters';
      else if (authorControl.getError('minlength'))
        this.error.author = 'min 3 letter required';
    } else this.error.author = '';

    // bookimage error
    if (bookimageControl.touched && bookimageControl.invalid) {
      if (bookimageControl.getError('required'))
        this.error.image = 'book image is required';
      else if (bookimageControl.getError('image'))
        this.error.image = ' please enter a valid image';
    } else this.error.image = '';

    // price error
    if (priceControl.touched && priceControl.invalid) {
      if (priceControl.getError('required'))
        this.error.price = 'book price number is required';
      else if (priceControl.getError('minlength'))
        this.error.price = 'minimum 1 mumbers required';
    } else this.error.price = ' ';
    //svsilsble  error
    if (availableControl.touched && availableControl.invalid) {
      if (availableControl.getError('required'))
        this.error.available = 'add availability';
      else if (availableControl.getError('minlength'))
        this.error.price = 'minimum 1 mumbers required';
    }
    //year error
    if (
      yearControl.touched &&
      yearControl.invalid
    ) {
      if (yearControl.getError('required'))
        this.error.year = 'published year required';
    } else this.error.year = ' ';
  }
}
