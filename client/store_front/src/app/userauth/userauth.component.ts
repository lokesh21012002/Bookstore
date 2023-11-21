import { Component } from '@angular/core';
import { AccountService } from '../services/account/account.service';
import { login } from '../../interfaces/datatype';

@Component({
  selector: 'app-userauth',
  templateUrl: './userauth.component.html',
  styleUrl: './userauth.component.css'
})
export class UserauthComponent {
  
  constructor(private accountservice : AccountService) { }
  
  selectedRole = "Buyer";
  isRegistered = false;
  isLoggedIn = false;

  userapidata: any = {}

  userdata: any = {};
  roledata: any = {};

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
