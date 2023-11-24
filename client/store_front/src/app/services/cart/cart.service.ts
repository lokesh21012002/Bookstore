import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  isLoggedIn: boolean = false;
  cartItems: any = [];

  constructor(private router : Router, private accountservice : AccountService) { }

  ngOnInit(): void {
    this.accountservice.isUserLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    })
    let token = localStorage.getItem('token');

    if(token)
      this.isLoggedIn = true;

  }

  addToCart(item: any) {
    this.cartItems.push(item);
    
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

    if(!this.isLoggedIn)
      this.router.navigate(['Cart']);
    else
      this.router.navigate(['Home/Cart']);
  }

  getCartItems() {

    if(this.cartItems.length === 0)
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

    return this.cartItems;
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
    if(!this.isLoggedIn)
      this.router.navigate(['Book']);
    this.router.navigate(['Home']);
  }

  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
  }

}
