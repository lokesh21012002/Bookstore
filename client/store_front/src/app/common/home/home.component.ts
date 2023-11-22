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

  isPurchasing: boolean = false;
  purchasingBookId: any = "";
  sellerId: any = "";

  loginData: any = {};
  purchasingData: any = {};

  bookData: any = [];
  purchasingBook: any = {};

  constructor(private accountservice : AccountService, private bookservice : BookService, private orderservice : OrderService) { }

  ngOnInit(): void {

    this.accountservice.loginData$.subscribe((data) => {
      this.loginData = data;
      console.warn(data);
      
    })

    this.bookservice.getAllBooksApi();

    this.bookservice.bookData$.subscribe((data) => {
      this.bookData = data;
    })
    
  }

  createOrder(data: any){
    data.book = this.purchasingBookId;
    data.seller = this.sellerId;
    this.orderservice.createOrderApi(data);
    this.isPurchasing = false;
    this.purchasingBookId = "";
    this.sellerId = "";
  }

  initPurchase(bookid: any, sellerid: any, purchasingBook: any){
    this.isPurchasing = true;
    this.purchasingBookId = bookid;
    this.sellerId = sellerid;
    this.purchasingBook = purchasingBook;
  }

}
