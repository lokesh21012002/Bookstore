import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService{

  isLoggedIn: boolean = false;
  cartItems: any = [];

  constructor(private router: Router, private toastr: ToastrService, private accountservice : AccountService) { }

  addToCart(item: any) {
    try {
      this.cartItems.push(item);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

      this.accountservice.isUserLoggedIn$.subscribe((data) => {
        this.isLoggedIn = data;
      })
      let token = localStorage.getItem('token');
  
      if(token)
        this.isLoggedIn = true;
      
      if (!this.isLoggedIn)
        this.router.navigate(['Cart']);
      else
        this.router.navigate(['Home/Cart']);
    } catch (error) {
      this.toastr.error('An unexpected error occurred while adding to cart.', 'Error');
      console.error(error);
    }
    finally {
      this.toastr.success('Book added to cart successfully.', 'Success');
    }
  }

  getCartItems() {
    try {
      if (this.cartItems.length === 0)
        this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      return this.cartItems;
    } catch (error) {
      this.toastr.error('An unexpected error occurred while fetching cart items.', 'Error');
      console.error(error);
      return [];
    }
  }

  removeFromCart(item: any) {
    try {
      const index = this.cartItems.indexOf(item);
      if (index > -1) {
        this.cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      }

      this.accountservice.isUserLoggedIn$.subscribe((data) => {
        this.isLoggedIn = data;
      })
      let token = localStorage.getItem('token');
  
      if(token)
        this.isLoggedIn = true;

      if (!this.isLoggedIn)
        this.router.navigate(['/Book']);
      else
        this.router.navigate(['Home']);
    } catch (error) {
      this.toastr.error('An unexpected error occurred while removing from cart.', 'Error');
      console.error(error);
    }
    finally {
      this.toastr.success('Book removed from cart successfully.', 'Success');
    }
  }

  clearCart() {
    try {
      this.cartItems = [];
      localStorage.removeItem('cartItems');
    } catch (error) {
      this.toastr.error('An unexpected error occurred while clearing the cart.', 'Error');
      console.error(error);
    }
  }

}
