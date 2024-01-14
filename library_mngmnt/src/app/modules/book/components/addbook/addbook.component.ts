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
    ISBN:'',
    bookname: '',
    author: '',
    publisher:'',
    image: '',
    summury:'',
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
      ISBN: ['', [Validators.required, Validators.minLength(13)]],
      bookname: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      image: [null, [Validators.required]],
      summury: ['', [Validators.required, Validators.minLength(3)]],

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
    console.log(`object`)
    if (this.bookForm.valid) {
      console.log(`object 123`)
      
      const formData: Book = this.bookForm.value;
      console.log(formData,'data--')
      this.bookService.createBook(formData,this.bookImg)
      .subscribe((data: Book) => {
        if (data) alert(`book added succesfully `);
        this.router.navigate(['admin']);
      });
    }
  }
  bookErrors() {
    const ISBNControl = this.bookForm.controls['ISBN'];
    const booknameControl = this.bookForm.controls['bookname'];
    const authorControl = this.bookForm.controls['author'];
    const publisherControl = this.bookForm.controls['publisher'];
    const bookimageControl = this.bookForm.controls['image'];
    const summuryControl = this.bookForm.controls['summury'];
    const priceControl = this.bookForm.controls['price'];
    const availableControl = this.bookForm.controls['available'];
    const yearControl = this.bookForm.controls['year'];
    // ISBN error
    if (ISBNControl.touched && ISBNControl.invalid) {
      if (ISBNControl.getError('required'))
        this.error.ISBN = '  ISBN is required';
      else if (ISBNControl.getError('maxlength'))
        this.error.ISBN = 'maximum length is 13 characters';
      else if (ISBNControl.getError('minlength'))
        this.error.ISBN = 'min 13 letter required';
    } else this.error.ISBN = '';
    //bookname error
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
    //publishername error
    if (publisherControl.touched && publisherControl.invalid) {
      if (publisherControl.getError('required'))
        this.error.publisher = '  publisher name is required';
      else if (publisherControl.getError('maxlength'))
        this.error.publisher = 'maximum length is 20 characters';
      else if (publisherControl.getError('minlength'))
        this.error.publisher = 'min 3 letter required';
    } else this.error.publisher = '';

    // bookimage error
    if (bookimageControl.touched && bookimageControl.invalid) {
      if (bookimageControl.getError('required'))
        this.error.image = 'book image is required';
      else if (bookimageControl.getError('image'))
        this.error.image = ' please enter a valid image';
    } else this.error.image = '';

    //summury error
    if (summuryControl.touched && summuryControl.invalid) {
      if (summuryControl.getError('required'))
        this.error.summury = '  summury name is required';
      else if (summuryControl.getError('maxlength'))
        this.error.summury = 'maximum length is 20 characters';
      else if (summuryControl.getError('minlength'))
        this.error.summury = 'min 3 letter required';
    } else this.error.summury = '';


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
