import { AccountService } from './../../../services/account/account.service';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../services/book/book.service';
import { OrderService } from '../../../services/order/order.service';

@Component({
  selector: 'app-mybooks',
  templateUrl: './mybooks.component.html',
  styleUrl: './mybooks.component.css'
})
export class MybooksComponent implements OnInit{

  updateOrder: boolean = false;
  token: any = "";

  selectedOrderData: any = {};
  myBooksData : any = [];
  orderDetails : any = [];
  loginData: any = {};

  constructor(private accountservice : AccountService, private bookserice : BookService, private orderservice : OrderService) { }

  ngOnInit(): void {

    this.accountservice.tokenData$.subscribe((data) => {
      this.token = data;
    })

    this.bookserice.getSellerBooksApi(this.token).subscribe((response) => {
      const jsondata: any = response.body;
      this.myBooksData = jsondata.data.data.books;
      console.warn(this.myBooksData);
    })

    this.orderservice.getOrdersApi(this.token).subscribe((response) => {
      const jsondata: any = response.body;
      this.orderDetails = jsondata.data;
      console.warn(this.orderDetails);
    })

    this.accountservice.loginData$.subscribe((data) => {
      this.loginData = data;
    })

  }

  initiateEditOrder(book : any){
    this.updateOrder = true;
    this.selectedOrderData = book;
  }

  editOrder(data: any){
    this.orderservice.updateOrderApi(data, this.token);
    this.updateOrder = false;
    this.selectedOrderData = {};
  }

  deleteOrder(id : number){
    this.orderservice.deleteOrderApi(id, this.token);
    this.orderDetails = this.orderDetails.filter((order : any) => order.id !== id);
  }

  deleteBook(id : number){
    this.bookserice.deleteBookApi(id, this.token);
    this.myBooksData = this.myBooksData.filter((book : any) => book.id !== id);
  }

  getInvoice(id : number){
    this.orderservice.getInvoiceApi(id, this.token);
  }

}
