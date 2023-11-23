import { Component } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { OnInit } from '@angular/core';
import { CartService } from '../../services/cart/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  loginData: any = {};
  isLoggedIn = false;

  cartItems: any = [];

  constructor(private accountservice : AccountService, private cartservice : CartService) { }

  ngOnInit(): void {

    this.cartItems = this.cartservice.getCartItems();
    
    this.accountservice.loginData$.subscribe((data) => {
      this.loginData = data;
    })

    this.accountservice.isUserLoggedIn$.subscribe((data) => {
      this.isLoggedIn = data;
    })

  }

  logout(){
    
    this.accountservice.logoutApi();

  }

}
