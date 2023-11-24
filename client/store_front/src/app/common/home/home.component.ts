import { BookService } from './../../services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  token: any = "";

  loginData: any = {};

  bookData: any = [];

  searchQuery: any = "";
  searchedBooks: any = [];

  constructor(private accountservice : AccountService, private bookservice : BookService) { }

  ngOnInit(): void {

    this.accountservice.tokenData$.subscribe((data) => {
      this.token = data;
    })

    this.accountservice.loginData$.subscribe((data) => {
      this.loginData = data;
    })

    this.bookservice.getAllBooksApi();

    this.bookservice.bookData$.subscribe((data) => {
      this.bookData = data;
    })
    
  }

  search(value: any){
    this.bookservice.getSearchBooksApi(value);
    this.bookservice.searchbookData$.subscribe((data) => {
      this.searchedBooks = data;
    })
  }

}
