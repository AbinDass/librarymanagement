import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { toBase64 } from 'src/app/helper/toBase64';
import { Book } from 'src/app/models/book';
import { BookService } from '../../service/book.service';

@Component({
  selector: 'app-editbook',
  templateUrl: './editbook.component.html',
  styleUrls: ['./editbook.component.css']
})
export class EditbookComponent {
  bookid!:string;
  bookImg!:string
  currentBook!:Book
  getbook:boolean = false
  editbookForm!: FormGroup;
  constructor(private fb: FormBuilder,private routes: ActivatedRoute,private router:Router ,private store: Store, private bookService:BookService) {}
  ngOnInit(): void {
    this.routes.paramMap.subscribe((param) => {
      this.bookid = param.get('bookid')!; 
    });
    this.getsingleBook()
    this.initForm();
  }

 getsingleBook(){
  this.bookService.singleBook(this.bookid).subscribe((data)=>{
    console.log(data, 'data')
    this.currentBook = data 
    this.editbookForm.patchValue({
      bookname: this.currentBook?.bookname!,
      author: this.currentBook?.author!,
      image: this.currentBook?.image!,
      price: this.currentBook?.price!,
      available: this.currentBook?.available!,
      year: this.currentBook?.year!,
    });
  })
 }
  
 


  initForm(): void {
    this.editbookForm = this.fb.group({
      bookname: ['', [Validators.required, Validators.minLength(3)]],
      author: ['', [Validators.required]],
      image: [null, [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      available:['', [Validators.required, Validators.min(0)]],
      year: ['', [Validators.required]],
    });
  }
  async handleImage(event: Event) {
    let inputImg = event.target as HTMLInputElement;
    if(inputImg.files && inputImg.files.length > 0){
      this.bookImg = await toBase64(inputImg.files[0]) as string
    }
   }

  editSubmit(): void {
    
    if (this.editbookForm.valid) {

      // You can handle the form submission logic here
      const formData: Book = this.editbookForm.value;
      console.log(formData, this.bookImg,'hiii')
      this.bookService.updateBook(formData,this.bookid,this.bookImg).subscribe((data)=>{
        if(data){
         this.router.navigate(['admin'])
        }
      })
    } else {
      // Mark form controls as touched to display validation errors
      this.editbookForm.markAllAsTouched();
    }
  }
}
