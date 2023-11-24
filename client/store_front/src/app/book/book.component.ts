import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { BookService } from '../services/book/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrl: './book.component.css',
})
export class BookComponent implements OnInit{
  bookData: any = {};
  searchQuery: any = "";

  constructor(private bookservice : BookService) {}

  ngOnInit(): void {
    this.bookservice.getAllBooksApi();
    this.bookservice.bookData$.subscribe((data) => {
      this.bookData = data;
    })
  }

  search(value: any){
    console.warn(value);
  }

}
