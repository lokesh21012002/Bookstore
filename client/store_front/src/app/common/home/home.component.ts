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
