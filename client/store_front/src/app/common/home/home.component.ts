import { Component } from '@angular/core';
import { login } from '../../../interfaces/datatype';
import { AccountService } from '../../services/account/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  selectedRole = "Buyer";
  isRegistered = false

  userdata: any = {};
  roledata: any = {};

  bookdata = [
    {
      id : 1,
      title : "Marvel",
      author : "Stan Lee",
      price : 100,
      totalsold : 1,
      totalavailable : 10,
      genre : "Comic",
      cover : "https://upload.wikimedia.org/wikipedia/en/0/0e/Marvel_Logo.svg"  
    },
    {
      id : 2,
      title : "Hulk",
      author : "Stan Lee",
      price : 100,
      totalsold : 1,
      totalavailable : 10,
      genre : "Comic",
      cover : "https://upload.wikimedia.org/wikipedia/en/0/0e/Marvel_Logo.svg"
    },
    {
      id : 3,
      title : "Thor",
      author : "Stan Lee",
      price : 100,
      totalsold : 1,
      totalavailable : 10,
      genre : "Comic",
      cover : "https://upload.wikimedia.org/wikipedia/en/0/0e/Marvel_Logo.svg"
    },
    {
      id : 4,
      title : "Captain America",
      author : "Stan Lee",
      price : 100,
      totalsold : 1,
      totalavailable : 10,
      genre : "Comic",
      cover : "https://upload.wikimedia.org/wikipedia/en/0/0e/Marvel_Logo.svg"
    },
    {
      id : 5,
      title : "Iron Man",
      author : "Stan Lee",
      price : 100,
      totalsold : 1,
      totalavailable : 10,
      genre : "Comic",
      cover : "https://upload.wikimedia.org/wikipedia/en/0/0e/Marvel_Logo.svg"
    },
    {
      id : 6,
      title : "Black Panther",
      author : "Stan Lee",
      price : 100,
      totalsold : 1,
      totalavailable : 10,
      genre : "Comic",
      cover : "https://upload.wikimedia.org/wikipedia/en/0/0e/Marvel_Logo.svg"
    },
    {
      id : 7,
      title : "Spider Man",
      author : "Stan Lee",
      price : 100,
      totalsold : 1,
      totalavailable : 10,
      genre : "Comic",
      cover : "https://upload.wikimedia.org/wikipedia/en/0/0e/Marvel_Logo.svg"
    },
    {
      id : 8,
      title : "Ant Man",
      author : "Stan Lee",
      price : 100,
      totalsold : 1,
      totalavailable : 10,
      genre : "Comic",
      cover : "https://upload.wikimedia.org/wikipedia/en/0/0e/Marvel_Logo.svg"
    }
  ];

  constructor(private accountservice : AccountService) { } 

  register(){

    this.userdata.role = this.selectedRole;

    const data = {
      userdata : this.userdata,
      roledata : this.roledata
    }
    
    this.accountservice.registerAPI(data);

  }

  logIn(data : login){
    
    this.accountservice.loginAPI(data);

  }

}
