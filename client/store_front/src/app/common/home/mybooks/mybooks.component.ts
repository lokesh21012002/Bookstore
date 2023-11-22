import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book/book.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrl: './mybooks.component.css'
})
export class MybooksComponent implements OnInit{

  myBooksData : any = [];

  constructor(private bookserice : BookService) { }

  ngOnInit(): void {
    this.bookserice.getSellerBooksApi().subscribe((response) => {
      const jsondata: any = response.body
      this.myBooksData = jsondata.data.data.books;
      console.warn(this.myBooksData);
    })
  }

  deleteBook(id : number){
    this.bookserice.deleteBookApi(id);
    this.myBooksData = this.myBooksData.filter((book : any) => book.id !== id);
  }

}
