import { Component } from '@angular/core';
import { BookService } from '../../services/book/book.service';
import { bookCreation } from '../../models/datatype';

@Component({
  selector: 'app-bookform',
  templateUrl: './bookform.component.html',
  styleUrl: './bookform.component.css'
})
export class BookformComponent {

  files: any = {}

  constructor(private bookservice : BookService) {}

  createBook(data: bookCreation){
    data.cover = this.files;
    this.bookservice.createBookApi(data);
  }
  
  onFileSelected(e: any){
    this.files = e.target.files[0];
  }

}
