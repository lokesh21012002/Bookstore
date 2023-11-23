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
  }

  addToCart(item: any) {
    this.cartItems.push(item);
    if(!this.isLoggedIn)
      this.router.navigate(['Cart']);
    else
      this.router.navigate(['Home/Cart']);
  }

  getCartItems() {
    return this.cartItems;
  }

  removeFromCart(item: any) {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
    if(!this.isLoggedIn)
      this.router.navigate(['Book']);
  }

  clearCart() {
    this.cartItems = [];
  }

}
