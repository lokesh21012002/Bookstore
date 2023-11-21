import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLoggedIn : boolean = false;
  userapidata : any = {};

  constructor(private accountService: AccountService) { }

  ngOnInit(){
    const token = localStorage.getItem("token");
    this.accountService.isLoggedIn$.subscribe((value) =>{
      this.isLoggedIn = value;
    });
    if(token)
    {
      this.userapidata = JSON.parse(localStorage.getItem("user") || "{}");
      console.warn(this.isLoggedIn);
      this.isLoggedIn = true;
    }
  }

  logOut(){
    this.accountService.logOutAPI();
  }

}
