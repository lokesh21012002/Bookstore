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

  selectedOrderData: any = {};
  myBooksData : any = [];
  orderDetails : any = [];

  constructor(private bookserice : BookService, private orderservice : OrderService) { }

  ngOnInit(): void {
    this.bookserice.getSellerBooksApi().subscribe((response) => {
      const jsondata: any = response.body;
      this.myBooksData = jsondata.data.data.books;
      console.warn(this.myBooksData);
    })
    this.orderservice.getOrdersApi().subscribe((response) => {
      const jsondata: any = response.body;
      this.orderDetails = jsondata.data;
      console.warn(this.orderDetails);
    })
  }

  initiateEditOrder(book : any){
    this.updateOrder = true;
    this.selectedOrderData = book;
  }

  editOrder(data: any){
    this.orderservice.updateOrderApi(data);
    this.updateOrder = false;
    this.selectedOrderData = {};
  }

  deleteOrder(id : number){
    this.orderservice.deleteOrderApi();
    this.orderDetails = this.orderDetails.filter((order : any) => order.id !== id);
  }

  deleteBook(id : number){
    this.bookserice.deleteBookApi(id);
    this.myBooksData = this.myBooksData.filter((book : any) => book.id !== id);
  }

  getInvoice(id : number){
    this.orderservice.getInvoiceApi(id);
  }

}
