import { Component } from '@angular/core';
import { login } from '../models/datatype';
import { AccountService } from '../services/account/account.service';

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

  userdata: any = {};
  roledata: any = {};
  
  register() {
    
    this.userdata.role = this.selectedRole;

    const data = {
      userdata : this.userdata,
      roledata : this.roledata
    }

    this.accountservice.registerApi(data);

  }

  login(data: login) {
    
    this.accountservice.loginApi(data);

  }


}
